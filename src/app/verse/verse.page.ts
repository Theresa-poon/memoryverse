import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; // import Alert Controller
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.page.html',
  styleUrls: ['./verse.page.scss'],
})
export class VersePage implements OnInit {

  information = null;
  trialInput: string;
  plainInput = ""
  noBreakInput = ""
  plainVerse = ""
  display = ""

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController, 
    private firebaseService: FirebaseService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.information = this.firebaseService.currentVerse;
    //console.log(this.information);
  }

  checkInput() {
    //console.log(this.trialInput)
    this.plainInput = this.trialInput.replace(/[，。、:;；,." "！!？?]/g,"")
    this.noBreakInput = this.plainInput.replace(/\n/g, "")
    //console.log(this.plainInput)
    console.log(this.localstorageService.currentPage)
    if (this.localstorageService.currentPage == "teen") {
      this.plainVerse = 
      this.information.payload.doc.data().sentence1.replace(/[，。、:;；,." "！!？?]/g,"") + 
      this.information.payload.doc.data().sentence2.replace(/[，。、:;；,." "！!？?]/g,"") +
      this.information.payload.doc.data().sentence3.replace(/[，。、:;；,." "！!？?]/g,"") +
      this.information.payload.doc.data().sentence4.replace(/[，。、:;；,." "！!？?]/g,"")
    } else {
      this.plainVerse = 
      this.information.payload.doc.data().sentence1.replace(/[，。、:;；,." "！!？?]/g,"") + 
      this.information.payload.doc.data().sentence2.replace(/[，。、:;；,." "！!？?]/g,"") +
      this.information.payload.doc.data().sentence3.replace(/[，。、:;；,." "！!？?]/g,"")
    }
    console.log(this.plainVerse)
    console.log(this.noBreakInput)
    if (this.noBreakInput == this.plainVerse) {
      this.presentAlert('恭喜 !', '答案正確 !')
        console.log("we are in verse.ts before setLocalon, doneVersesteen")
        console.log(this.localstorageService.doneVersesteen)
      this.localstorageService.setlocalOn(this.firebaseService.currentIndex);
      console.log(this.firebaseService.currentIndex)
        console.log("we are in verse.ts after setLocalon, doneVersesteen")
        console.log(this.localstorageService.doneVersesteen)
      this.trialInput = ""
      this.location.back();
      //this.router.navigate(['/menu']);
    } else {
      this.findDiff(this.noBreakInput, this.plainVerse)
      this.presentAlert('再試試吧 ! 加油 !', '提示: '+this.display)
      //this.presentAlert('再試試吧 !', '加油 !')
      this.localstorageService.setlocalOff(this.firebaseService.currentIndex);
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

  findDiff(input, verse) {
    var i
    this.display = ""
    for (i = 0; i < verse.length+1; i++) { 
      if (verse[i] == input[i]) {
        this.display = this.display.concat(verse[i]);
        console.log(this.display)
      } else {
        if (input[i] == null) {
          console.log("inputi = null")
          this.display = this.display.concat(" + ",verse[i],"...")
          console.log(this.display+i)
        } else {
          if (verse[i] == null) {
            console.log("versei = null")
            this.display = this.display.concat(" << 經文到此已完結！")
            console.log(this.display+i)
          } else {
            //this.display = this.display.concat(input[i]," (",input[i]," >> ",verse[i],") ...")
            //console.log(this.display+i)
            if (i != 0) {
              this.display = this.display.concat(" >>「",verse[i],"」")
              console.log(this.display+i)
              //console.log(this.test)
              //console.log(input[i+1])
            } else {
              this.display = this.display.concat(verse[i],"...")
            }
          }
        }
        break
      }
    }
  }

}
