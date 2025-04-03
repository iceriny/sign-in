export interface User {
    id: string;
    name: string;
    lastSignInTime: string | null;
}

export interface SignInRecord {
    id: string;
    userId: string;
    userName: string;
    time: string;
}

export interface SignInGroup {
    id: string;
    startTime: string;
    records: SignInRecord[];
}
