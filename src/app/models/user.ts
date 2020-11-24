export class User {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public cover_page: string,
        public type: string,
        public lat: string,
        public lon: string,
        public country: string,
        public state: string,
        public city: string,
        public last_time_connected: Date,
        public created_at: Date
    ) { }
}