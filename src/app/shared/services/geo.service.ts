import Projection from 'ol/proj/Projection';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';
import { Extent } from 'ol/extent';
import { View, Map } from 'ol';
import { addProjection } from 'ol/proj';
import { fromLonLat } from 'ol/proj';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  readonly map: Map;
  readonly tileLayer: TileLayer;
  readonly sources: { readonly tileWms: TileWMS; };

  readonly extent: Extent = [434803.9477706752, 6032173.201328338, 926451.0394716205, 6421306.062660191];

  constructor() {
    const projection = new Projection({
      code: 'EPSG:25832',
      // The extent is used to determine zoom level 0. Recommended values for a
      // projection's validity extent can be found at https://epsg.io/.
      extent: [-1877994.66, 3932281.56, 836715.13, 9440581.95],
      units: 'm',
    });
    addProjection(projection);

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
        new ScaleLine({
          units: 'metric',
        })
      ]),

      layers: [
        this.tileLayer,
      ],

      view: new View({
        projection,
        center: [574616.32, 6224333.34],
        extent: this.extent,
        zoom: 6,
      })
    });
  }

  setView(zoom: number, center: [number, number]) {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center));
  }

  updateSize(target = 'map') {
    this.map.setTarget(target);
    this.map.updateSize();
  }

  setSource(source: 'tileWms') {
    this.tileLayer.setSource(this.sources[source]);
  }
}
