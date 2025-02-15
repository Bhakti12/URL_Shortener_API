import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { GetRegisterUser, RegisterUser } from "../types/userTypes";
import bcrypt from "bcrypt";
import userSchema from "../models/userSchema";

@injectable()
export default class userRepository implements IUserRepository {
    constructor() { }

    async userRegistrationRepo(user: RegisterUser): Promise<GetRegisterUser> {
        try {
            const firstName = user.firstName;
            const lastName = user.lastName;
            const emailId = user.emailId;
            const password = user.password;
            const sId = user.sId;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password?.toString(), salt);
            const lastLoginAt = new Date();
            const response = await userSchema.create({ firstName, lastName, emailId, sId: sId, password: hashPassword, lastLoginAt: lastLoginAt });
            return response as GetRegisterUser;
        } catch (serviceErr) {
            throw new Error(`[Repo][userRegistrationRepository] user registration failed due to ${serviceErr}`);
        }
    }
}