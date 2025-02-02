import { CreateShortUrl, GetShortUrl, RedirectUrlType } from "../types/urlTypes";

export interface IUrlService{
    createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl>,
    handleRedirect(data: RedirectUrlType): Promise<string>
}