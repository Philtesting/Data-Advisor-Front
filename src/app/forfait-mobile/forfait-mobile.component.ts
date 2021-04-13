import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../globals';
import { HttpParams } from "@angular/common/http";


@Component({
  selector: 'app-forfait-mobile',
  templateUrl: './forfait-mobile.component.html',
  styleUrls: ['./forfait-mobile.component.css']
})
export class ForfaitMobileComponent implements OnInit {

  public host = myGlobals.API_HOST;
  public loading = true;
  public data = {
    data : null,
    count: 0
  };

  public title;
  public min = 0;
  public max = 100;
  public offerOnPage = 9;
  public currPage = 0;
  public dataMobile = [];

  private params = new HttpParams();

  constructor(
    private http: HttpClient
  ) { }

  changeOrder(order){
    this.addParam("orderBy", order);
    this.callApi();
  }

  changeType(type){
    if(type){
      this.addParam("type", type);
      this.callApi();
    }
    else{
      this.removeParam("type");
      this.callApi();
    }
  }

  changeOffset(target){
    let offset = target.value * this.offerOnPage;
    this.addParam("offset", offset);
    this.callApi();
    this.removeParam("offset");
    this.currPage = target.value;
  }

  searchTitle(){
    if(this.title){
      this.addParam("search", this.title);
      this.callApi();
    }
    else{
      this.removeParam("search");
      this.callApi();
    }
  }

  changeOperateur(operateur){
    if(operateur){
      this.addParam("operateur", operateur);
      this.callApi();
    }
    else{
      this.removeParam("operateur");
      this.callApi();
    }
  }

  changeData(data){
    if(data){
      this.addParam("data", data);
      this.callApi();
    }
    else{
      this.removeParam("data");
      this.callApi();
    }
  }

  changePrice(){
    this.addParam("max", this.max);
    this.addParam("min", this.min);
    this.callApi();
  }

  addParam(param, value){
    if(this.params.has(param)){
      this.params = this.params.set(param, value);
    }
    else{
      this.params = this.params.append(param, value);
    }
  }
  removeParam(param){
    if(this.params.has(param)){
      this.params = this.params.delete(param);
    }
  }

  callApi(){
    this.http.get<any>(this.host+'/api/mobile', {params: this.params}).subscribe(data => {
      this.data = data;
      this.loading = false;
    })
    this.currPage = 0;
  }

  ngOnInit(): void {
    this.params = this.params.append('orderBy', "ASC");
    this.callApi();
    this.http.get<any>(this.host+'/api/data/mobile').subscribe(data => {
      this.dataMobile = data;
    })
  }
  createRange(number){
    number = parseInt(number);
    var items: number[] = [];
    for(var i = 1; i <= number; i+=this.offerOnPage){
       items.push(i);
    }
    return items;
  }
}
