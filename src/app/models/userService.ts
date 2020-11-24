export class UserService {
    constructor(
        public _id: string,
        public user: string,
        public images: [string],
        public schedule: string,
        public description: string,
    ) { }
}