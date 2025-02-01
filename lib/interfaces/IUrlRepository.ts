import { CreateShortUrl, GetShortUrl } from "../types/urlTypes";

export interface IUrlRepository{
    createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl>,
    findUrlByAlias(alias: string | undefined): Promise<any>
}