import { Username } from 'src/app/models/username';
export class User{
    constructor(
        public _id: string,
        public Username: Username[],
        public Password: string,
        public Email: string
    ){
    
    }
    
}