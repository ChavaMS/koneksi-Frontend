export class UserJobs {
    constructor(
        public _id: string,
        public user: string,
        public jobs: string,
        public description: string,
        public schedule: string,
        public tags: [string]
    ) { }
}