import express, { NextFunction } from "express";
import passport from "passport";
import AuthController from "../controller/authStrategyController";
import { iocContainer as container } from "../config/container";
import { IUserService } from "../interfaces/IUserService";
import { types } from "../config/types";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import { handlefun } from "../helper/handleFunction";
const userService = container.get<IUserService>(types.IUserService);
const authController = new AuthController(userService);
const gAuthRouter = express.Router();
gAuthRouter.use(cookieParser());
gAuthRouter.use(bodyParser.urlencoded({ extended: false }));
gAuthRouter.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "keyboard cat",
    name: "sid",
  })
);
gAuthRouter.use(passport.initialize());
gAuthRouter.use(passport.session());
gAuthRouter.get(
  "/gbutton",
  (req: express.Request, res: express.Response, next: NextFunction) => {
    res.send("<button><a href='/gauth'>Google</a></button>"),
      next(),
      void authController.AuthUser(true);
  }
);

gAuthRouter.get(
  "/gauth",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

gAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: handlefun(true, true),
    failureRedirect: handlefun(false, true),
  })
);

export default gAuthRouter;