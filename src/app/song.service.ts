import { Injectable } from '@angular/core';
import {Songs} from './song'
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SongsService {
songs:Songs[];
url:string;
httpOption:object;
  constructor( private http:HttpClient) { 
    this.songs=[];
    this.url="http://localhost:3000/test";
    this.httpOption={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }



  fetchSongs():Observable<any>{
   return this.http.get<Songs[]>(this.url)
.pipe(
  tap((songs:Songs[]):Observable<any>=>{
    this.songs=songs;
    return of({})
  }),
  catchError((err:any):Observable<any>=>{
    console.log(err);
    return of([])
  }
  
  )
)
  }


  
  addSong(song:Songs):Observable<any>{
   console.log(song.title);
    return this.http.post<Songs>(this.url,{
    title:song.title,
    duration:song.duration,
    genre:song.genre
   
    },this.httpOption)
    .pipe(
      tap((song:Songs):Observable<any>=>{
        this.songs.push(new Songs(song.id,song.title,song.duration,song.genre));
        return of({})
      }),
      catchError((err:any):Observable<any>=>{
        console.log(err);
        return of([])
      }
      
      )
    )
  }





  deleteSong(id:number){
    const url='http://localhost:3000/delete'
    this.http.delete(`${url}/${id}`)
    .pipe(  catchError((err:any):Observable<any>=>{
      console.log(err);
      return of([])
    }
    
    )).subscribe((obj)=>{
    this.songs=this.songs.filter(s=>s.id!=id);
    })
  }
 
}

