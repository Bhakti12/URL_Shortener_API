import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { inject, injectable } from "inversify";
import { iocContainer as Container } from "../config/container";
import { types } from "../config/types";
import { IUserService } from "../interfaces/IUserService";
import { AuthController } from "./authController";
import { config } from "../config/config";

const userService = Container.get<IUserService>(
    types.IUserService
);
const Controller = new AuthController(userService);

@injectable()
export default class AuthStrategyController {
    private _UserService: IUserService;

    constructor(
        @inject(types.IUserService) userService: IUserService
    ) {
        this._UserService = userService;
    }

    async AuthUser(isGoogle: Boolean): Promise<void> {
        try {
            passport.serializeUser((user: any, done) => {
                console.log("authuser serializeUser");
                done(null, user.id);
            });

            passport.deserializeUser(
                async (id: String, done: passport.DoneCallback) => {
                    console.log("authuser deserializeUser");
                    done(null, `${id}`);
                }
            );
            if (isGoogle === true) {
                passport.use(
                    new GoogleStrategy(
                        {
                            clientID: config.GOOGLE_CLIENT_ID,
                            clientSecret: config.GOOGLE_SECRET_KEY,
                            callbackURL: config.GOOGLE_REDIRECT_URL,
                            passReqToCallback: true,
                        },
                        async (
                            request: any,
                            accessToken: any,
                            refreshToken: any,
                            profile: passport.Profile,
                            done: passport.DoneCallback
                        ) => {
                            console.log("authuser use GoogleStrategy");
                            await Controller.AuthCallback(
                                accessToken,
                                refreshToken,
                                profile,
                                done,
                                request
                            );
                            return done(null, profile);
                        }
                    )
                );
            }
        } catch (err) {
            throw new Error("error in auth Strategy class" + err);
        }
    }
}