import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/shared/services/geo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {
  geolocation: Geolocation;

  constructor(
    public geoService: GeoService
    ) { }

  ngOnInit() {
    this.geolocation = navigator.geolocation;
  }

  ngAfterViewInit() {
    setTimeout(() => this.doUpdateSize(), 2000);
  }

  doUpdateSize() {
    this.geoService.updateSize();
  }

  locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoService.setView(position.coords.longitude, position.coords.latitude);
      });
    }
  }
}
