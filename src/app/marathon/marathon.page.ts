import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app'; //??
import { FirebaseService, SearchType } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service'; // May NOT be necessary
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { AlertController } from '@ionic/angular'; // import Alert Controller

@Component({
  selector: 'app-marathon',
  templateUrl: './marathon.page.html',
  styleUrls: ['./marathon.page.scss'],
})
export class MarathonPage implements OnInit {

  itemsUserL: Array<any>;
  itemsUserR: Array<any>;
  type: SearchType = SearchType.orderbyLevel; // indicates type of ranking order
  tempPassword
  tempID

  constructor(
    public alertController: AlertController, 
    private afs: AngularFirestore,
    private db: AngularFirestore,
    public firebaseService: FirebaseService, 
    //public alertController: AlertController, 
    public localstorageService: LocalstorageService, // May NOT be necessary
    private router: Router) { }

  ngOnInit() {
    this.getTable();
    this.localstorageService.getLoginStatus(); //get internal storage login username, id, password
    this.checkLoginStatus(); //check if internal storage password is correct
  }

  getTable() {
    if (this.type == "level") {
      this.firebaseService.getRankingL()
      .subscribe(result => {
        this.itemsUserL = result;
      })
    } else {
      this.firebaseService.getRankingP()
      .subscribe(result => {
        this.itemsUserR = result;
      })
    } 
  }

  checkLoginStatus() {
    console.log("in checkLoginStatus")
    if (this.localstorageService.lastUserID != "") {
      this.firebaseService.checkPassword()
    } else {
      this.localstorageService.switch = 0
    }
    //console.log(this.localstorageService.switch)
  }

  login() {
    //this.firebaseService.allUsers = this.itemsUser;
    this.router.navigate(['/login']);
  }

  logout() {
    this.presentConfirm()
  }

  searchChanged() {
    console.log("in searchChanged", this.type)
    this.getTable();
  }

  async presentConfirm() {
    const alert = await this.alertController.create({
      //title: 'Confirm purchase',
      message: '確定登出 ?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '確定',
          handler: () => {
            console.log('Logout clicked');
            localStorage.setItem("login9012", "")
            localStorage.setItem("login9014", "")
            localStorage.setItem("login9016", "")
            this.localstorageService.lastUserID = ""
            this.localstorageService.lastUsername = ""
            this.localstorageService.lastPassword = ""
            this.localstorageService.switch = 0
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert(title: string) {
    const alert = await this.alertController.create({
      header: title,
      buttons: ["OK"]
    })
    await alert.present()
  }

  startGame() {
    if (this.localstorageService.switch == 0) {
      this.presentAlert("請先登入帳戶!")
    } else {
      //this.presentAlert("Let's start!")
      this.firebaseService.recheckPassword()
    }
  }

  rules() {
    this.router.navigate(['/rules']);
  }

  

}
