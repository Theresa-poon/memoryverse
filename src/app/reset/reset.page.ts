import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  changeMenu = false
  changeChild = false
  changeTeen = false

  constructor(
    public localstorageService: LocalstorageService, 
    public alertController: AlertController) { }

  ngOnInit() {
  }

  reset() {
    console.log(this.changeMenu)
    console.log(this.changeChild)
    console.log(this.changeTeen)
    if(this.changeMenu) {
      localStorage.setItem("doneVerses3078", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
      this.localstorageService.doneVerses = localStorage.getItem("doneVerses3078").split(",")
      this.presentAlert('完成 !','已重置初信篇 !')
      this.changeMenu = false
    }
    if(this.changeChild) {
      localStorage.setItem("doneVerses3178", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
      this.localstorageService.doneVerseschild = localStorage.getItem("doneVerses3178").split(",")
      this.presentAlert('完成 !','已重置兒童篇 !')
      this.changeChild = false
    }
    if(this.changeTeen) {
      localStorage.setItem("doneVerses3478", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
      this.localstorageService.doneVersesteen = localStorage.getItem("doneVerses3478").split(",")
      this.presentAlert('完成 !','已重置少年篇 !')
      this.changeTeen = false
    }
  }

  async presentAlert(title: string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["OK"]
    })
    await alert.present()
  }

}
