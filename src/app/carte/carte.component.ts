import { Component, AfterViewInit, Input } from '@angular/core';
import { ShapeService } from '../shape.service';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


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

  private map;
  private states;
  private currMap = 0;
  private currProvider = "bouy";
  private stateLayer;
  private stateLayer5g;
  private has5g = false;

  constructor(
    private shapeService: ShapeService,
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
    let searchControl = GeoSearchControl({
      style: 'button',
      provider: provider, // required
      autoComplete: true, // optional: true|false  - default true
      autoCompleteDelay: 250, // optional: number      - default 250
    }).addTo(this.map);

    this.map.addControl(searchControl);

    tiles.addTo(this.map);
  }

  private initStatesLayer() {
    this.stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0,
        fillOpacity: 0.3,
        fillColor: '#e36565'
      })
    });
    this.map.addLayer(this.stateLayer);
    this.stateLayer5g.bringToFront();
  }
  private initStatesLayer5g(states) {
    let myRenderer = L.canvas({ padding: 0.5 });
    this.stateLayer5g = L.geoJSON(states, {
      style: (feature) => ({}),
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 2,
            color: "#f00",
            opacity: 1,
            interactive: false,
            renderer: myRenderer,
          }
        );
      }
    });
  }

  private removeLayerToMap(){
    this.map.removeLayer(this.stateLayer);
  }

  addLayerToMap(){
    this.removeLayerToMap();
    let allSapefiles = this.shapeService.getStateShapes();

    for (const [key, value] of Object.entries(allSapefiles)) {
      if(key == this.currProvider ){
        value[this.currMap].subscribe(states => {
          this.states = states;
          this.initStatesLayer();
        });
      }
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

  setCurrMobileData(currMap){
    this.currMap = currMap;
    this.addLayerToMap();
  }
  setCurrProvider(provider){
    this.currProvider = provider;
    this.addLayerToMap();
  }

  ngAfterViewInit() {
    this.initMap();
    this.shapeService.getStateShapes().bouy[0].subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
    this.shapeService.get5gLayer().subscribe(states => {
      this.initStatesLayer5g(states);
    });
  }

  // public dropMarker(address: string) {
  //   this.http.get("https://geocoder.api.here.com/6.2/geocode.json", {
  //       params: {
  //           app_id: this.appId,
  //           app_code: this.appCode,
  //           searchtext: address
  //       }
  //   }).subscribe(result => {
  //       let location = result.Response.View[0].Result[0].Location.DisplayPosition;
  //       let marker = new L.Marker([location.Latitude, location.Longitude]);
  //       marker.addTo(this.map);
  //   });
  // }

}
