import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }
  getStateShapes() {
    let bouy2G = this.http.get('/assets/data/cartes/BOUY_2G.json');
    let bouy3G = this.http.get('/assets/data/cartes/BOUY_3G.json');
    let bouy4G = this.http.get('/assets/data/cartes/BOUY_4G.json');
    let free3G = this.http.get('/assets/data/cartes/FREE_3G.json');
    let free4G = this.http.get('/assets/data/cartes/FREE_4G.json');
    let orange3G = this.http.get('/assets/data/cartes/ORANGE_3G.json');
    let orange4G = this.http.get('/assets/data/cartes/ORANGE_4G.json');


    return {
      "bouy" : [bouy2G, bouy3G, bouy4G],
      "free" : [free3G, free3G, free4G],
      "orange" : [orange3G, orange4G, orange4G]
    }
    ;
  }

  get5gLayer(){
    return this.http.get('/assets/data/cartes/5G.json');
  }
}
