/*id : String,
            state : Number,
            temperature: Number,
            scale : String,*/ 
import { Programability } from 'src/app/models/programability';
export class Device{
    constructor(
        
        public id: String,
        public state : Number,
        public temperature: number,
        public scale: string,
        public Programability : Programability
    ){
    
    }
    
}