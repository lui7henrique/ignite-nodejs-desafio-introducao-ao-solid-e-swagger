import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    const currentDate = new Date();

    Object.assign(user, {
      name,
      email,
      created_at: currentDate,
      updated_at: currentDate,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((u) => u.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((u) => u.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex((user) => user === receivedUser);

    if (userIndex !== -1) {
      const user = this.users[userIndex];
      user.admin = true;

      return user;
    }

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
