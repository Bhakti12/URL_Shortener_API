import { inject, injectable } from "inversify";
import { IUserService } from "../interfaces/IUserService";
import { RegisterUser, GetRegisterUser } from "../types/userTypes";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "../config/types";

@injectable()
export default class userService implements IUserService{

    private _userRepository: IUserRepository;
    constructor(
      @inject(types.IUserRepository) userRepo: IUserRepository
    ) {
      this._userRepository = userRepo;
    }

    async userRegistrationService(user: RegisterUser): Promise<GetRegisterUser> {
        try{
            const registerUser = await this._userRepository.userRegistrationRepo(user);
            return registerUser; 
        }catch(serviceErr){
            throw new Error(`[Service][userRegistrationService] user registration failed due to ${serviceErr}`);
        }
    }   
}