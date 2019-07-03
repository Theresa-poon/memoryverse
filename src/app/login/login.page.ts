import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userList = null;

  constructor(
    public alertController: AlertController, 
    private firebaseService: FirebaseService,
    public localstorageService: LocalstorageService, 
    public router:Router) { }

  dbData: string = "" // firebase database userID, username and password of selected user for login
  dbDataArray: Array<any>
  password: string = ""

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser() {
    this.firebaseService.getUser()
    .subscribe(result => {
      this.userList = result;
      console.log(this.userList)
    })
    //this.shuffle(this.itemsbattle)
  }

  loginCheck() {
    //console.log("loginCheck");
    //console.log(this.userList.length);
    this.dbDataArray = this.dbData.split(",")
    console.log(this.dbDataArray[0]);
    console.log(this.dbDataArray[1]);
    console.log(this.dbDataArray[2]);
    // check firebase password against user input password
    if (this.dbDataArray[2] == this.password) {
      console.log("correct password")
      localStorage.setItem("login9012", this.dbDataArray[0])
      localStorage.setItem("login9014", this.dbDataArray[1])
      localStorage.setItem("login9016", this.dbDataArray[2])
      this.localstorageService.lastUserID = this.dbDataArray[0]
      this.localstorageService.lastUsername = this.dbDataArray[1]
      this.localstorageService.lastPassword = this.dbDataArray[2]
      this.localstorageService.switch = 1
      this.presentAlert('登入成功 !', '你好 !')
      this.router.navigate(['/marathon']);
    }
    else {
      console.log("Incorrect password!!")
      this.presentAlert('密碼不正確啊 !', '請重新輸入 !')
    }
    //this.router.navigate(['/marathon']);
  }

  loginTrial() {
    this.presentAlert('你好 ! 歡迎試玩 !', '請選擇訪客用戶, 輸入密碼「000000」')
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ["OK"]
    })
    await alert.present()
  }

}
