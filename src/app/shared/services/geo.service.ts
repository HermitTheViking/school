import Projection from 'ol/proj/Projection';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { ScaleLine, defaults as defaultControls, MousePosition } from 'ol/control';
import { PinchZoom, defaults as defaultInteractions } from 'ol/interaction';
import { Extent } from 'ol/extent';
import { View, Map } from 'ol';
import { addProjection } from 'ol/proj';
import { fromLonLat } from 'ol/proj';

import { Injectable } from '@angular/core';
import { createStringXY } from 'ol/coordinate';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  readonly map: Map;
  readonly tileLayer: TileLayer;
  readonly sources: { readonly tileWms: TileWMS; };
  readonly projection: Projection;
  readonly extent: Extent = [-1877994.66, 3932281.56, 836715.13, 9440581.95];

  constructor() {
    this.projection = new Projection({
      code: 'EPSG:25832',
      // The extent is used to determine zoom level 0. Recommended values for a
      // projection's validity extent can be found at https://epsg.io/.
      extent: this.extent,
      units: 'm',
      worldExtent: [-16.1, 32.88, 40.18, 84.17]
    });
    addProjection(this.projection);

    this.sources = {
      tileWms: new TileWMS({
        url: 'https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort/1.0.0/wms?',
        crossOrigin: 'anonymous',
        params: {
          REQUEST: 'GetMap',
          username: 'XBCOUXCEVR',
          password: 'aUCx-jh2mwZNj59',
          LAYERS: 'topo_skaermkort',
          FORMAT: 'image/png',
          TRANSPARENT: 'TRUE',
        },
      })
    };

    this.tileLayer = new TileLayer({
      extent: this.extent,
      source: this.sources.tileWms
    });

    this.map = new Map({
      interactions: defaultInteractions().extend([
        new PinchZoom(),
      ]),

      controls: defaultControls().extend([
        new MousePosition({
          coordinateFormat: createStringXY(4),
          projection: 'EPSG:25832',
          className: 'custom-mouse-position',
          target: document.getElementById('mouse-position'),
          undefinedHTML: '&nbsp;',
        }),
        new ScaleLine({
          units: 'metric',
        })
      ]),

      layers: [
        this.tileLayer,
      ],

      view: new View({
        projection: 'EPSG:25832',
        center: [574616.32, 6224333.34],
        extent: this.extent,
        zoom: 6,
      })
    });
  }

  setView(long: number, lat: number) {
    this.map.getView().setCenter(fromLonLat([long, lat]));
  }

  updateSize(target = 'map') {
    this.map.setTarget(document.getElementById(target));
    this.tileLayer.setSource(this.sources.tileWms);
    this.map.updateSize();
  }

  setSource(source: 'tileWms') {
    this.tileLayer.setSource(this.sources[source]);
  }
}
