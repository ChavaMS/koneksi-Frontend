export class Comments {
    constructor(
        public _id: string,
        public emitter: string,
        public receiver: string,
        public activity_id: string,
        public created_at: Date,
        public text: string
    ) { }
}