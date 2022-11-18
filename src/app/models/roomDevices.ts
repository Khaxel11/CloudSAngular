import { Programability } from 'src/app/models/programability';
export class RoomDevices{
    constructor(
        
        public id: String,
        public state : Number,
        public temperature: number,
        public scale: string,
        public lastChange : String,
        public Programability : Programability
    ){
    
    }
    
}