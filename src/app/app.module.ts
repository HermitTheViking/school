import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AuthPageModule } from './auths/auth.module';
import { TabsPageModule } from './tabs/tabs.module';
import { ColorPickerModule } from './components/color-picker/color-picker.module';

import { AuthService } from './shared/services/auth.service';
import { TokenStorageService } from './shared/services/token-storage.service';
import { authInterceptorProviders } from './shared/interceptors/auth';
import { GeoService } from './shared/services/geo.service';
import { DatabaseService } from './shared/services/database.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    AuthPageModule,
    TabsPageModule,
    ColorPickerModule
  ],
  providers: [
    AuthService,
    TokenStorageService,
    GeoService,
    DatabaseService,
    authInterceptorProviders,
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
