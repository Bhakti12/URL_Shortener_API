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