import { Component } from '@angular/core';

import { DatabaseService } from '../../shared/services/database.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  public hue: string;
  public color: string;

  constructor(
    private db: DatabaseService
  ) { }

  doSaveColor() {
    // this.db.update();
  }
}
