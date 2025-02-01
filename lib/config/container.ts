import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

import "reflect-metadata";
import { IUserRepository } from "../interfaces/IUserRepository";
import { types } from "./types";
import userRepository from "../repository/userRepo";
import { IUserService } from "../interfaces/IUserService";
import userService from "../service/userService";
import urlService from "../service/urlService";
import { IUrlService } from "../interfaces/IUrlService";
import { IUrlRepository } from "../interfaces/IUrlRepository";
import urlRepository from "../repository/urlRepo";

export const iocContainer = new Container();

iocContainer.load(buildProviderModule());

iocContainer.bind<IUserRepository>(types.IUserRepository).to(userRepository);
iocContainer.bind<IUserService>(types.IUserService).to(userService);
iocContainer.bind<IUrlRepository>(types.IUrlRepository).to(urlRepository);
iocContainer.bind<IUrlService>(types.IUrlService).to(urlService);