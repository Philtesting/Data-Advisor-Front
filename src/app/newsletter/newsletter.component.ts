import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  public news = [] ;
  public host = myGlobals.API_HOST;
  public numResults = 0;
  public loading = true;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>(this.host+'/api/articles').subscribe(data => {
        this.news = data;
        this.loading = false;
        this.numResults = data.length;
    })
  }

  changeOrder(order){
    this.loading = true;
    this.http.get<any>(this.host+'/api/articles?order='+order).subscribe(data => {
      this.news = data;
      this.loading = false;
      this.numResults = data.length;  
    })
  }

}
