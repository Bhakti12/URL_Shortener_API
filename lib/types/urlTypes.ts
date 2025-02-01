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