import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { NetworkService } from './network.service'; //???? Do I need this? 3 Apr trial
import { Network } from '@ionic-native/network/ngx'; //???? Do I need this? 3 Apr trial

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import firebaseConfig from './firebase'; // import Firebase
import { AngularFireModule } from '@angular/fire'; // import Firebase
import { AngularFirestoreModule } from '@angular/fire/firestore'; //import firestore
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicStorageModule } from '@ionic/storage';


const config = {
  apiKey: "AIzaSyBwZrJj5Eqp9TtFachASp90k1rq2wVqh0A",
  authDomain: "memoryverse-a9264.firebaseapp.com",
  databaseURL: "https://memoryverse-a9264.firebaseio.com",
  projectId: "memoryverse-a9264",
  storageBucket: "memoryverse-a9264.appspot.com",
  messagingSenderId: "1034189354709"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    //AngularFireModule.initializeApp(firebaseConfig), // new
    AngularFireModule.initializeApp(config), // new
    AngularFirestoreModule,  // new
    IonicStorageModule.forRoot(), //new
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,  // ???? Do I need this? 3 Apr trial
    //NetworkService, // ???? Do I need this? 3 Apr trial
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
