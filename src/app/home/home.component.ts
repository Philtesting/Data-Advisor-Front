import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public boxInternet = [] ;
  public mobiles = [] ;
  public host = myGlobals.API_HOST;
  public loadingBoxInternet = true;
  public loadingMobiles= true;

  constructor(
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.http.get<any>(this.host+'/api/3/box-internet').subscribe(data => {
        this.boxInternet = data;
        this.loadingBoxInternet = false;
    })
    this.http.get<any>(this.host+'/api/3/mobile').subscribe(data => {
        this.mobiles = data;
        this.loadingBoxInternet = false;
    })
  }

}
