import { CreateShortUrl, GetShortUrl } from "../types/urlTypes";

export interface IUrlService{
    createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl>
}