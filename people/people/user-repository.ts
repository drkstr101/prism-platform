import bcrypt from 'bcryptjs';

export type UserModel = {
  id: string;
  username: string;
  passwordHash: string;
  displayName?: string;
  email: string;
};

export type CreateUserOptions = {
  username: string;
  displayName?: string;
  email: string;  
  password: string;
};

export class UserRepository {
  constructor() {}

  /**
   * in memory store for users.
   * for production use, use a data store.
   */
  private userMap = new Map<string, UserModel>();

  /**
   * create a new user in the store.
   */
  async createUser(options: CreateUserOptions): Promise<UserModel> {
    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(options.password, 10);
    const userModel: UserModel = {
      id,
      passwordHash,
      username: options.username,
      displayName: options.displayName,
      email: options.email
    };
    this.userMap.set(id, userModel);

    return userModel;
  }

  /**
   * list users in the store.
   */
  async listUsers(): Promise<UserModel[]> {
    const values = this.userMap.values();
    return [...values];
  }

  /**
   * get user by id from the store.
   */
  async getUserById(id: string): Promise<UserModel|undefined> {
    if (!this.userMap.has(id)) return undefined;
    return this.userMap.get(id);
  }

  /**
   * get user by email from the store.
   */
  async getUserByEmail(email: string) {
    const users = await this.listUsers();
    return users.find((user) => {
      return user.email === email;
    });
  }
}
