import { GetRegisterUser, RegisterUser } from "../types/userTypes";

export interface IUserService {
    userRegistrationService(user: RegisterUser): Promise<GetRegisterUser>
}