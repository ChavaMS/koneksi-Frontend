export class UserProducts {
    constructor(
        public _id: string,
        public name: string,
        public user: string,
        public original_name: string,
        public image: string,
        public price: Number,
        public description: string,
        public tags: [string]
    ) { }
}