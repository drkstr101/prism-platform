
export type PlainUser = {
  id: string;
  username: string;
  displayName?: string;
  email: string;
}

export class User {
  constructor(
    /**
     * unique id of the user.
     */
    readonly id: string,

    /**
     * machine user name.
     */
    readonly username: string,

    /**
     * email of the user.
     */
    readonly email: string,

    /**
     * display name of the user.
     */
    readonly displayName?: string,
  ) {}

  /**
   * serialize a User into
   * a serializable object.
   */
  toObject() {
    return {
      username: this.username,
      displayName: this.displayName,
      email: this.email,
      id: this.id,
    };
  }

  /**
   * create a User object from a 
   * plain object.
   */
  static from(plainUser: PlainUser) {
    return new User(
      plainUser.id,
      plainUser.username,
      plainUser.email,
      plainUser.displayName
    );
  }
}
