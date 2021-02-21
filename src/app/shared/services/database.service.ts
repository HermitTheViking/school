import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Userdata } from '../../models/userdata';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  listRef: AngularFireList<any>;
  objectRef: AngularFireObject<any>;

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  create(model: Userdata) {
    return this.listRef.push({
      name: model.name,
      email: model.email,
      color: model.color
    });
  }

  get(db: string, id: string) {
    this.objectRef = this.afDatabase.object(`/${db}${id}`);
    return this.objectRef;
  }

  getList(db: string) {
    this.listRef = this.afDatabase.list(`/${db}`);
    return this.listRef;
  }

  update(id, model: Userdata) {
    return this.objectRef.update({
      name: model.name,
      email: model.email,
      color: model.color
    });
  }

  delete(db: string, id: string) {
    this.objectRef = this.afDatabase.object(`/${db}${id}`);
    this.objectRef.remove();
  }
}
