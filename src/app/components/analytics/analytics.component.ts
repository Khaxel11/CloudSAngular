import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Username } from 'src/app/models/username';
import { User } from 'src/app/models/user';
import { Device } from 'src/app/models/device';
import { Analytics } from 'src/app/models/analytics';
import { temperatureChange } from 'src/app/models/temperatureChange';
import { stateChange } from 'src/app/models/stateChange';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [UserService]
})
export class AnalyticsComponent implements OnInit {
 /** */
 public radarChartLabels = ['1', '2', '3','4'];
  public radarChartData = [
    {data: [5,10,2,9], label: 'Axel'},
    {data: [9,2,1.3], label: 'Missael'},
    {data: [10,12,5,2], label: 'Pablo'},
    {data: [3,7,5,9], label: 'Emma'},
    
  ];
  // public radarChartData = [
  //   {data: [0, 1, 0, 0], label: 'Ayer'},
  //   {data: [1, 0, 1, 0], label: 'Hoy'}
  // ];
  public radarChartType = 'radar';
  public analisis : Analytics;
  public idUser: String | null;
  public dev: Device[];
  public dat= new Date();
  public clickedIndex : number = 0;
  public today : Number = this.dat.getDate();
  public month : Number = this.dat.getMonth()+1;
  public temperatureArray : [0];
  public stateArray : [0];
  public arrayState : stateChange[];
  public arrayDev : Device[];
  public tempShowSelect : Number = 9;
  public stateShowSelect : Number = 9;
  public arrayTemp : temperatureChange[];
  public dateA : Date = new Date();
  public dateB : String = "2022/" + this.month+"/"+this.today;;
  public stateChange = {
    time : "",
    by : "",
    state : 9,
    rol : 9
  }
 public temperatureChange = {
    time : "",
    by : "",
    temperature : 0,
    rol : 9
}

public changes = {
    temperatureChange : this.temperatureChange,
    stateChange : this.stateChange
}

public days = {
    day : 0,
    changes : this.changes
    
}

public months = {
    month:0,
    days : this.days
}

public years = {
    year : "",
    months : this.months
}

public changeLog = {
    years : this.years
    
}


public devices = {
    idDevice : "",
    changeLog : this.changeLog
}
  chartData = [
    {
      data: [0],
      label: 'Device'
    }
  ];
  chartLabels = [
    0
  ];
  chartOptions = {
    responsive: true
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private _userService : UserService,
  ) { 
    this.arrayTemp = [];
    this.analisis = new Analytics("",this.devices);
    this.idUser = "";
    this.arrayDev = [];
    this.dev = [];
    this.temperatureArray = [0]
    this.stateArray = [0];
    this.arrayState = [];
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem('idUser');
    //this.getAnalyticsTemperature(this.idUser, , this.month,this.today);
    this.getDevices(this.idUser as String);
    
    this.dateA  = new Date("2022-" + this.month+"-"+this.today);
    //console.log(this.dateA);
    this.dateB = "2022-" + this.month+"-"+this.today;
    console.log(this.dateB);
   
  }
  public chartClicked(e: any): void {
    if (e.event.type == "click") {
      
      this.clickedIndex = e.active[0]?.index;
      //this.temperatureChange.by = String(this.arrayTemp[this.clickedIndex].by);
      //console.log(this.temperatureChange.by);
      
    }
}
  getAnalyticsTemperature(id : String | null, device : Number, month : Number, day : Number){
    this.tempShowSelect = 1;
    this.stateShowSelect = 0;
    this.chartLabels = [];
    this.stateArray = [0];
    this.temperatureArray = [0];
    this.chartData = [
      {
        data: [0],
        label: 'Temperatura', 
      }
    ];
    console.log(this.tempShowSelect);
    this.temperatureArray = [0];
    this._userService.getAnalyticsTemperature(id, device, month, day).subscribe(
      response =>{
        this.temperatureChange = response;
        for (var index in response){
          this.arrayTemp[Number(index)] = response[Number(index)];
          this.temperatureArray[Number(index)] = response[Number(index)].temperature;

          for(var i = 0 ; i < this.temperatureArray.length ; i++){
            this.chartLabels[i] = this.temperatureArray[i];
          }
          this.chartData = [
            {
              data: this.temperatureArray,
              label: 'Temperatura', 
            }
            
            
          ];
        }
        
      },
      error => {
        console.log(<any>error);
      }
    )
    this.chartLabels = this.temperatureArray;
    
  }
 //----------------------------------------------------------------------------------
  getAnalyticsStates(id : String | null, device : Number, month : Number, day : Number){
    /*
     
    this.temperatureArray = [0];
    */ 
    this.tempShowSelect = 0;
    this.stateShowSelect = 1;
    //console.log(this.tempShowSelect);
    this.chartLabels = [];
    this.stateArray = [0];
    this.stateArray = [0];
    //console.log(this.tempShowSelect);
    this.stateArray = [0];
    this.chartData = [
      {
        data: [0],
        label: 'Estados', 
      }
    ];
    this._userService.getAnalyticsStates(id, device, month, day).subscribe(
      response =>{
        this.stateChange = response;
        //console.log(this.temperatureChange);
        for (var index in response){
          this.arrayState[Number(index)] = response[Number(index)];
          this.stateArray[Number(index)] = response[Number(index)].state;
          //console.log(this.stateArray[Number(index)]);
          //console.log(this.temperatureArray[Number(index)]);
          for(var i = 0 ; i < this.stateArray.length ; i++){
            this.chartLabels[i] = this.stateArray[i];
          }
          //this.chartLabels = this.temperatureArray.length as Number;
          this.chartData = [
            {
              data: this.stateArray,
              label: 'Estados', 
            }
          ];
        }
        
      },
      error => {
        console.log(<any>error);
      }
    )
    this.chartLabels = this.stateArray;
    
  }
 
  getDevices(id : String){
    this._userService.getDevices(id).subscribe(
      response =>{
        if(response){
          this.dev = response;
          this.arrayDev = this.dev;
          //console.log(this.dev);
          for (var index in response){
            this.arrayDev[Number(index)] = response[Number(index)];
            //console.log(this.arrayDev[Number(index)]);
            
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onChangeDate (id : String | null, device : Number){
    //console.log(this.dateA.getDay()+ "  " + this.dateA.getMonth());
    console.log(this.dateB);
    this.dateA = new Date(this.dateB+"");
    console.log("SO" + this.tempShowSelect);
    var day = Number(this.dateA.getDate())+1;
    var month = this.dateA.getMonth()+1;
    console.log(device);
    console.log(day);
    this.today = day;
    //this.tempShowSelect = 5;
    this.getAnalyticsTemperature(this.idUser, device, month, this.today);
    this.getAnalyticsStates(this.idUser, device, month, this.today);
    //this.getAnalyticsStates(id, device, this.dateA.getMonth);
    //this.getAnalyticsTemperature();
  }

}
