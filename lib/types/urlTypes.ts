export declare type CreateShortUrl = {
    longUrl: string;
    customAlias?: string;
    topic?: string;
    shortUrl?: string;
    userId?: string;
}

export declare type GetShortUrl = {
    shortUrl: string;
    createdAt: Date;
}

export declare type RedirectUrlType = {
    alias: string;
    userAgent?: string;
    ipAddress?: string;
}

export declare type AnalyticsUrl = {
    alias: string,
    timestamp: Date,
    ipAddress: string,
    userAgent: string,
    osName?: string,
    deviceType?: string,
    location?: {
        country: string,
        city: string,
    },
    userId?: string
}

export interface ClicksByDate {
    date: string;
    count: number;
}

export interface OsType {
    osName: string; // e.g., Windows, macOS, Linux, iOS, Android
    uniqueClicks: number;
    uniqueUsers: number;
}

interface DeviceType {
    deviceName: string; // e.g., mobile, desktop
    uniqueClicks: number;
    uniqueUsers: number;
}

interface UrlAnalytics {
    shortUrl: string;
    totalClicks: number;
    uniqueUsers: number;
}

export declare type AnalyticsByAliasData = {
    totalClicks: number;
    uniqueUsers: number;
    clicksByDate: ClicksByDate[];
    osType: OsType[];
    deviceType: DeviceType[];
}

export declare type AnalyticsByTopicData = {
    totalClicks: number;
    uniqueUsers: number;
    clicksByDate: ClicksByDate[];
    urls: UrlAnalytics[];
}