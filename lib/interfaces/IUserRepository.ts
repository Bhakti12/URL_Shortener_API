import { GetRegisterUser, RegisterUser } from "../types/userTypes";

export interface IUserRepository {
    userRegistrationRepo(user: RegisterUser): Promise<GetRegisterUser>
}