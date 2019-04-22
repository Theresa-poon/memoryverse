import { Injectable } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  previousStatus;

  constructor(public alertCtrl: AlertController, 
              public network: Network,
              public eventCtrl: Events) {

    console.log('Hello NetworkService');

    this.previousStatus = ConnectionStatusEnum.Online;
    
  }

    public initializeNetworkEvents(): void {

      console.log("in initializeNetworkEvent")

        this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
                console.log("no internet");
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
                console.log("there is internet")
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        });
    }

}
