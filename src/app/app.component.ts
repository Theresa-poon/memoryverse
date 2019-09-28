import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: '關 於 頌 經 樂',
      url: '/about',
      icon: 'information-circle-outline'
    },
    {
      title: '初 信 篇',
      url: '/menu',
      icon: 'book'
    },
    {
      title: '兒 童 主 日 學',
      url: '/menu-child-a',
      icon: 'paw'
    },
    {
      title: '少 年 主 日 學',
      url: '/menu-teen',
      icon: 'bonfire'
    },
    {
      title: 'AWANA',
      url: '/awana',
      icon: 'contacts'
    },
    {
      title: '自 選 金 句 庫',
      url: '/self',
      icon: 'color-wand'
    },
    {
      title: '金 句 對 戰 區',
      url: '/battle',
      icon: 'grid'
    },
    {
      title: '會 員 區',
      url: '/marathon',
      icon: 'rocket'
    },
    {
      title: '設 置',
      url: '/reset',
      icon: 'settings'
    }
  ];
  constructor(
    private platform: Platform,
    public events: Events,
    public network: Network,
    public networkService: NetworkService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.networkService.initializeNetworkEvents();

      console.log("initializing")

      // Offline event
      this.events.subscribe('network:offline', () => {
        alert('請檢查網絡狀況');  
        console.log("no network");
       });

      //this.events.subscribe('network:offline', () => {
      // alert('network:offline ==> '+this.network.type);  
      // console.log("no network");
      //});

      // Online event
      //this.events.subscribe('network:online', () => {
      // alert('network:online ==> '+this.network.type);   
      // console.log("there is network");     
      //});

    });
  }
}
