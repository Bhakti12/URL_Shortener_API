import passport from "passport";
import userSchema from "../models/userSchema";
import { RegisterUser } from "../types/userTypes";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IUserService } from "../interfaces/IUserService";

@injectable()
export class AuthController {
  private _userService: IUserService;
  constructor(
    @inject(types.IUserService) userService: IUserService
  ) {
    this._userService = userService;
  }
  AuthCallback = async (
    accessToken: any,
    refreshToken: any,
    profile: passport.Profile,
    done: passport.DoneCallback,
    request?: any
  ) => {
    try {
      console.log("profile", profile);
      const id = profile.id;
      const email = profile.emails?.[0]?.value ?? "";
      const firstname = profile.name?.givenName ?? "";
      const lastname = profile.name?.familyName ?? "";
      const lastLoginAt = new Date();
      const AddUser: RegisterUser = {
        firstName: firstname,
        lastName: lastname,
        sId: id,
        emailId: email,
        password: "",
        lastLoginAt: lastLoginAt
      };
      console.log("checking !!!" + email);
      const userCheck = await userSchema.findOne({
        emailId: AddUser.emailId,
      });
      console.log("checking userCheck!!!" + userCheck);
      if (!userCheck) {
        const NewUser = await this._userService.userRegistrationService(
          AddUser
        );
        console.log("NewUser:- ", NewUser);
        done(null, NewUser);
      }
    } catch (err) {
      console.log(err);
      throw new Error("error in auth class" + err);
    }
  };
}