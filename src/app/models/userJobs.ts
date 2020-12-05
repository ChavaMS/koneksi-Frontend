export class UserJobs {
    constructor(
        public _id: string,
        public user: string,
        public jobId: string,
        public description: string,
        public schedule: string,
        public tags: string
    ) { }
}