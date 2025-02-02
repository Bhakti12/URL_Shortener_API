import { AnalyticsUrl, CreateShortUrl, GetShortUrl, RedirectUrlType } from "../types/urlTypes";

export interface IUrlRepository{
    createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl>,
    findUrlByAlias(alias: string | undefined): Promise<any>,
    logRedirectEvent(data: RedirectUrlType): Promise<AnalyticsUrl>
}