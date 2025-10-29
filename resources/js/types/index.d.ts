export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface THomeBannerSectionGames {
    id: number,
    name: string,
    slug: string,
    trailer: string,
}

export interface TGameThumbnail {
    id: number,
    name: string,
    slug: string,
    release_window: string|undefined,
    release_date: string,
    early_access: boolean|number,
    steam_discount?: number,
    gog_discount?: number,
}

export interface GameData {
    id: number,
    name: string,
    slug: string,
    developer: string,
    publisher: string,
    release_window: string|undefined,
    release_date: string,
    description: string,
    demo: boolean|number,
    early_access: boolean|number,
    kickstarter_page: string|undefined,
    kickstarter_status: string|undefined,
    trailer: string,
    twitter: string|undefined,
    facebook: string|undefined,
    instagram: string|undefined,
    tiktok: string|undefined,
    youtube: string|undefined,
    discord: string|undefined,
    homepage: string|undefined,
    steam: string|undefined,
    epic: string|undefined,
    gog: string|undefined,
    playstation: string|undefined,
    xbox: string|undefined,
    nintendo: string|undefined,
    steam_discount?: number,
    gog_discount?: number,
    thumbnail_url?: string,
}

export interface SendReport {
    game_name: string,
    report: string,
}

export interface Report {
    id: number,
    game_name: string,
    report: string,
    status: string,
}

export interface Discounts {
    steam_discount: number,
    gog_discount: number,
}

export interface TAd {

    id:number,
    timestamps:string,
    name:string,
    media:string,
    mediaFile:File|undefined,
    size:"728x90px|320x100px|160x600px",
    status:"active|inactive",
    priority:"normal|high|very high",
    link:string,
    clickedAmount:number,
}