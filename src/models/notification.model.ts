export interface UserSubscription {
    endpoint: string;
    expirationTime: Date;
    keys: Key;
}

export interface Key {
    auth: string;
    p256dh: string

}