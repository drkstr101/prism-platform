import { SymphonyPlatformNode, SymphonyPlatformAspect } from '@bitdev/symphony.symphony-platform';
import bcrypt from 'bcryptjs';
import { User, userMock } from '@prism/people.entities.user';
import { UserRepository } from './user-repository.js';
import { createPeopleGqlSchema } from "./people.graphql.js";
import { PrismPlatformNode, PrismPlatformAspect } from '@prism/platform.prism-platform';

export class PeopleNode { 
  constructor(
    private prismPlatform: PrismPlatformNode,
    private userRepo: UserRepository
  ) {}
 
  /**
   * get a user object.
   */
  async getUser(username: string): Promise<User|undefined> {
    return userMock[username];
  }

  /**
   * list users.
   */
  async listUsers(): Promise<User[]> {
    const users = Object.values(userMock);
    return users;
  }

  /**
   * Signs up a new user.
   * @param username The username of the user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns The newly created user.
   */
  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.userRepo.createUser({
      username,
      password,
      email
    });
    
    return User.from(user);
  }

  /**
   * Logs in an existing user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns The logged-in user, or null if login fails.
   */
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return null;
    }

    return User.from(user);
  }

  /**
   * Resets the password for a given email.
   * @param email The email of the user.
   * @returns True if the password reset was successful, false otherwise.
   */
  async resetPassword(email: string): Promise<boolean> {
    const user = this.userRepo.getUserByEmail(email);

    if (!user) {
      return false;
    }

    // In a real application, you would generate a unique token, store it
    // in a database associated with the user, and send it to the user via email.
    // For this example, we simply return true.
    return true;
  }

  /**
   * Gets the currently logged-in user from the request object.
   * @param req The request object.
   * @returns The currently logged-in user, or null if no user is logged in.
   */
  async getCurrentUser(req: any): Promise<User | null> {
    // Implement your logic to get the user from the request object
    // For this example we use a mock user, replace it with actual logic
    const userId = req?.session?.userId;
    const user = await this.userRepo.getUserById(userId);

    if (!user || !user) return null;
    return User.from(user);
  }

  static dependencies = [SymphonyPlatformAspect, PrismPlatformAspect];
  
  static async provider([symphonyPlatform, prismPlatform]: [SymphonyPlatformNode, PrismPlatformNode]) {
    const userRepo = new UserRepository();
    const people = new PeopleNode(prismPlatform, userRepo);
    const gqlSchema = createPeopleGqlSchema(people);

    prismPlatform.registerBackendServer([
      {
        routes: [],
        gql: gqlSchema
      }
    ]);

    /**
     * implement a middleware to authinticate users
     * and attach the user to the request.
     */
    symphonyPlatform.registerMiddlewares([
      (req, _, next) => {
        const user = people.getCurrentUser(req);
        req.user = user;
        next();
      }
    ]);    

    return people;
  }
}

export default PeopleNode;
