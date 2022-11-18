
class stateChange {
    constructor(
        public time : String,
        public by : String,
        public state : Number,
        public rol : Number
        ){
    }
}


class temperatureChange {
    constructor(
        public time : String,
        public by : String,
        public temperature : Number,
        public rol : Number
        ){
    }
}
class changes {
    constructor(
        public temperatureChange : temperatureChange,
        public stateChange : stateChange
        ){
    }
}

class days {
    constructor(
        public day : Number,
        public changes : changes
        ){
    }
}


class months{
    constructor(
        public month:Number,
        public days : days
    ){
        
    }
}

class years{
    constructor(
        public year : String,
        public months : months
    ){
        
    }
}

class changeLog{
    constructor(
        public years : years
    ){
        
    }
}

class devices{
    constructor(
        public idDevice : String,
        public changeLog : changeLog
    ){

    }
}
export class Analytics{
    constructor(
        
        public idUser: String,
	    public devices : devices
    ){
    
    }
    
}