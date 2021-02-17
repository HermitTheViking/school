import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/shared/services/geo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, AfterViewInit {

  geolocation: Geolocation;

  constructor(
    public geo: GeoService
    ) { }

  ngOnInit() {
    this.geolocation = navigator.geolocation;
  }

  ngAfterViewInit() {
    this.geo.updateSize();
  }

  locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geo.setView(10, [position.coords.longitude, position.coords.latitude]);
      });
    }
  }
}
