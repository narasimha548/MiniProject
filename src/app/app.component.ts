import { Component } from '@angular/core';
import { $ } from 'protractor';
import { Songs } from './song';
import { SongsService } from './song.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  song:Songs;
  songTitle:string;
  songDuration:string;
  selectedGenre:string = "";
todos:any[];

myHide : any;
 
fieldName1 = 'songTitle';
fieldValue1 = 'duration';
fieldName2 = 'genre';
complete:any[] = [];
genre : object[];

constructor(private serive:SongsService){

 this.myHide=true;

    this.todos=[
      {
        title:'slow',
        done:false,

      },
      {
        title:'romance',
        done:false,

      },
      {
        title:'remixed',
        done:false,

      }
    ];
  
  }

  onSave(){
    this.myHide=false;

    const songTitle = this.songTitle;
    const songDuration = this.songDuration;
    let mix:string="";
    let leng:number=0;
    
  for(let i in this.todos){
    leng = leng +1;
    const NAMES = {};
    NAMES[this.fieldName1] = songTitle;
    NAMES[this.fieldValue1] = songDuration;
    let tod:Tod=Object.assign(new Tod(),this.todos[i]);
    if(tod.done == true){
      if(mix == "")
        mix = tod.title;
      else
        mix = mix +"|"+ tod.title;
      
    }
      NAMES[this.fieldName2] = mix;
      if(this.todos.length == leng){
        this.complete.push(NAMES);
        //this.song.id = 1;
        this.song=new Songs(null,NAMES[this.fieldName1],NAMES[this.fieldValue1],NAMES[this.fieldName2]);
        // this.fieldName1 = NAMES[this.fieldName1];
        // this.fieldValue1 = NAMES[this.fieldValue1];
        // this.fieldName2 = NAMES[this.fieldName2];
        console.log(this.song);
  //// this.id = Number(this.id);
        this.serive.addSong(this.song);
      }
        
      
    console.log(this.complete);
     
  }
//console.log(this.complete);
   
  
 

    //debugger;
  }

  OnDelete(id:number){
    debugger
    id=1;
    this.serive.deleteSong(id);

  }
 
  
}
class Tod{
  title:string;
  done:boolean;
}

