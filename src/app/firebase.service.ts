import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LocalstorageService } from './localstorage.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

export enum SearchType {
  orderbyLevel = 'level',
  orderbyPoints = 'points'
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentVerse: any;
  currentIndex = 0;
  tempID
  tempUser
  
  //allUsers: any;

  constructor(
    public alertController: AlertController, 
    private afs: AngularFirestore, 
    private db: AngularFirestore,
    public localstorageService: LocalstorageService,
    private router: Router) { }

  getVerses(){
    return this.afs.collection('verses').snapshotChanges()
  }

  getVersesChild(){
    return this.afs.collection('verseschild').snapshotChanges()
  }

  getVersesTeen(){
    return this.afs.collection('versesteen').snapshotChanges()
  }

  getRankingL(){
    return this.afs.collection('user', ref => ref.orderBy('level', 'desc').orderBy('score', 'desc')).snapshotChanges()
  }

  getRankingP(){
    return this.afs.collection('user', ref => ref.orderBy('score', 'desc').orderBy('level', 'desc')).snapshotChanges()
  }

  getUser(){
    return this.afs.collection('user', ref => ref.orderBy('church')).snapshotChanges()
  }

  // get data for versemarathon page
  getUserData() {
    //this.tempUser = this.localstorageService.lastUserID
    return this.afs.doc(`user/${this.tempID}`).valueChanges()
  }

  getVerseData() {
    return this.afs.collection('versemarathon').snapshotChanges()
  }

  getMemberData() {

  }

  getCredit() {
    return this.afs.collection('verses').snapshotChanges() 
  }

  getCreditChild() {
    return this.afs.collection('verseschild').snapshotChanges() 
  }

  getCreditTeen() {
    return this.afs.collection('versesteen').snapshotChanges() 
  }

  checkPassword() {
    console.log("in checkPassword")
    //this.temp = this.afs.doc(`user/${this.postID}`)
    //this.tempID = "C8o7ZTtZCX0Tpbd9qAZ0"
    console.log(this.localstorageService.lastUserID)

    this.tempID = this.localstorageService.lastUserID
      
    var docRef = this.db.firestore.collection("user").doc(`${this.tempID}`);
    //var docRef = this.db.firestore.collection("user").doc("C8o7ZTtZCX0Tpbd9qAZ0");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("local storage password:", this.localstorageService.lastPassword)
            console.log("doc.data().password:", doc.data().password);
            console.log("local storage username:", this.localstorageService.lastUsername)
            console.log("doc.data().name:", doc.data().name);
            if (this.localstorageService.lastUsername == doc.data().name && this.localstorageService.lastPassword == doc.data().password) {
              console.log("local storage password correct")
              this.localstorageService.switch = 1
            } else {
              console.log("local storage password incorrect")
              this.localstorageService.switch = 0
              this.localstorageService.lastUsername = ""
              this.localstorageService.lastPassword = ""
              this.localstorageService.lastUserID = ""
            } 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.localstorageService.switch = 0
            this.localstorageService.lastUserID = ""
            this.localstorageService.lastUsername = ""
            this.localstorageService.lastPassword = ""
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        this.localstorageService.switch = 0
    });

  console.log(docRef.get())

  } 

  // recheck password when user presses "play game" button
  recheckPassword() {
    console.log("in recheckPassword")
    //this.temp = this.afs.doc(`user/${this.postID}`)
    //this.tempID = "C8o7ZTtZCX0Tpbd9qAZ0"
    console.log(this.localstorageService.lastUserID)

    this.tempID = this.localstorageService.lastUserID
      
    var docRef = this.db.firestore.collection("user").doc(`${this.tempID}`);
    //var docRef = this.db.firestore.collection("user").doc("C8o7ZTtZCX0Tpbd9qAZ0");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("local storage password:", this.localstorageService.lastPassword)
            console.log("doc.data().password:", doc.data().password);
            console.log("local storage username:", this.localstorageService.lastUsername)
            console.log("doc.data().name:", doc.data().name);
            if (this.localstorageService.lastUsername == doc.data().name && this.localstorageService.lastPassword == doc.data().password) {
              console.log("local storage password correct")
              this.localstorageService.switch = 1
              this.router.navigate(['/versemarathon'])
            } else {
              console.log("local storage password incorrect")
              this.localstorageService.switch = 0
              this.localstorageService.lastUsername = ""
              this.localstorageService.lastPassword = ""
              this.localstorageService.lastUserID = ""
              this.presentAlert("帳戶資料已更改!", "請重新登入!")
            } 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.localstorageService.switch = 0
            this.localstorageService.lastUserID = ""
            this.localstorageService.lastUsername = ""
            this.localstorageService.lastPassword = ""
            this.presentAlert("帳戶資料已更改!", "請重新登入!")
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        this.localstorageService.switch = 0
    });

  console.log(docRef.get())

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

