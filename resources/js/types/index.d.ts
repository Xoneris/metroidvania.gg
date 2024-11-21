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


export interface GameData {
    id: number,
    name: string,
    slug: string,
    developer: string,
    publisher: string,
    release_window: string|null,
    release_date: string,
    description: string,
    demo: boolean|number,
    early_access: boolean|number,
    kickstarter_page: string|null,
    kickstarter_status: string|null,
    trailer: string,
    twitter: string|null,
    facebook: string|null,
    instagram: string|null,
    tiktok: string|null,
    youtube: string|null,
    discord: string|null,
    homepage: string|null,
    steam: string|null,
    epic: string|null,
    gog: string|null,
    playstation: string|null,
    xbox: string|null,
    nintendo: string|null,
}