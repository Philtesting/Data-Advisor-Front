import { Component, AfterViewInit, Input } from '@angular/core';
import { ShapeService } from '../shape.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as myGlobals from '../globals';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements AfterViewInit {

  @Input("appId")
  public appId: string;

  @Input("appCode")
  public appCode: string;
  public loading = true;

  private map;
  private states;
  private currMap;
  private currProvider = "BOUY";
  private stateLayer2g;
  private stateLayer3g;
  private stateLayer4g;
  private stateLayer5g;
  private stateLayerFibre;
  private has2g = false;
  private has3g = false;
  private has4g = false;
  private has5g = false;
  private hasFibre = false;
  public host = myGlobals.API_HOST;


  constructor(
    private shapeService: ShapeService,
    private http: HttpClient,
  ) { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 46.9000, 2.2137 ],
      zoom: 5.5
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4.5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    let provider = new OpenStreetMapProvider();

    let myCustomMarker = {
      icon: new L.Icon.Default(),
      draggable: false,
    }

    let searchControl = GeoSearchControl({
      style: 'button',
      provider: provider,
      autoComplete: true,
      autoCompleteDelay: 250,
      marker: myCustomMarker,
    }).addTo(this.map);
    
    this.map.addControl(searchControl);

    tiles.addTo(this.map);
  }

  private initStatesLayer2g(states) {
    this.stateLayer2g = L.geoJSON(states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0,
        fillOpacity: 0.4,
        fillColor: '#e36565'
      })
    });
    if(this.has2g){
      this.map.addLayer(this.stateLayer2g);
    }
  }

  private initStatesLayer3g(states) {
    this.stateLayer3g = L.geoJSON(states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0,
        fillOpacity: 0.4,
        fillColor: '#e38464'
      })
    });
    if(this.has3g){
      this.map.addLayer(this.stateLayer3g);
    }
  }

  private initStatesLayer4g(states) {
    this.stateLayer4g = L.geoJSON(states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0,
        fillOpacity: 0.4,
        fillColor: '#e3a364'
      })
    });
    if(this.has4g){
      this.map.addLayer(this.stateLayer4g);
    }
  }

  private initStatesLayer5g(states) {
    let myRenderer = L.canvas({});
    this.stateLayer5g = L.geoJSON(states, {
      style: (feature) => ({fillOpacity : 1}),
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 5,
            color: "black",
            weight: 1,
            fill: true,
            fillColor: "darkred",
            stroke : true,
            opacity: 1,
            interactive: false,
            renderer: myRenderer,
          }
        );
      }
    });
  }

  private initStatesLayerFibre(states) {
    let myRenderer = L.canvas({});
    this.stateLayerFibre = L.geoJSON(states, {
      style: (feature) => ({fillOpacity : 1}),
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 5,
            color: "black",
            weight: 1,
            fill: true,
            fillColor: "darkblue",
            stroke : true,
            opacity: 1,
            interactive: false,
            renderer: myRenderer,
          }
        );
      }
    });
  }

  toggleProvider(provider){
    this.loading = true;
    this.currProvider = provider;
    this.http.get<any>(this.host+'/api/carte/'+this.currProvider+"_2G").subscribe(data => {
      if(this.has2g){
        this.map.removeLayer(this.stateLayer2g);
      }
      this.initStatesLayer2g(data);
    })
    this.http.get<any>(this.host+'/api/carte/'+this.currProvider+"_3G").subscribe(data => {
      if(this.has3g){
        this.map.removeLayer(this.stateLayer3g);
      }
      this.initStatesLayer3g(data);
    })
    this.http.get<any>(this.host+'/api/carte/'+this.currProvider+"_4G").subscribe(data => {
      if(this.has4g){
        this.map.removeLayer(this.stateLayer4g);
      }
      this.initStatesLayer4g(data);
      this.loading = false;
    })
  }

  toggle2gLayer(){
    if(this.has2g){
      this.map.removeLayer(this.stateLayer2g);
      this.has2g = false;
    }
    else{
      this.map.addLayer(this.stateLayer2g);
      this.has2g = true;
    }
  }

  toggle3gLayer(){
    if(this.has3g){
      this.map.removeLayer(this.stateLayer3g);
      this.has3g = false;
    }
    else{
      this.map.addLayer(this.stateLayer3g);
      this.has3g = true;
    }
  }

  toggle4gLayer(){
    if(this.has4g){
      this.map.removeLayer(this.stateLayer4g);
      this.has4g = false;
    }
    else{
      this.map.addLayer(this.stateLayer4g);
      this.has4g = true;
    }
  }

  toggle5gLayer(){
    if(this.has5g){
      this.map.removeLayer(this.stateLayer5g);
      this.has5g = false;
    }
    else{
      this.map.addLayer(this.stateLayer5g);
      this.has5g = true;
    }
  }

  toggleFibreLayer(){
    if(this.hasFibre){
      this.map.removeLayer(this.stateLayerFibre);
      this.hasFibre = false;
    }
    else{
      this.map.addLayer(this.stateLayerFibre);
      this.hasFibre = true;
    }
  }

  ngAfterViewInit() {
    this.initMap();
    this.http.get<any>(this.host+'/api/carte/5G').subscribe(states => {
      this.initStatesLayer5g(states);
    });
    this.http.get<any>(this.host+'/api/carte/Fibre').subscribe(data => {
      this.initStatesLayerFibre(data);
    })
    this.http.get<any>(this.host+'/api/carte/'+this.currProvider+"_2G").subscribe(data => {
      this.initStatesLayer2g(data);
    })
    this.http.get<any>(this.host+'/api/carte/'+this.currProvider+"_3G").subscribe(data => {
      this.initStatesLayer3g(data);
    })
    this.http.get<any>(this.host+'/api/carte/'+this.currProvider+"_4G").subscribe(data => {
      this.initStatesLayer4g(data);
      this.loading = false;
    })
  }

}
