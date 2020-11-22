export class User {
    constructor(
        public _id: String,
        public name: String,
        public surname: String,
        public email: String,
        public password: String,
        public image: String,
        public cover_page: String,
        public type: String,
        public lat: String,
        public lon: String,
        public country: String,
        public state: String,
        public city: String,
        public last_time_connected: Date,
        public created_at: Date
    ) { }
}