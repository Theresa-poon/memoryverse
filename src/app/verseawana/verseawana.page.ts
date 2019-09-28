import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular'; // import Alert Controller
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verseawana',
  templateUrl: './verseawana.page.html',
  styleUrls: ['./verseawana.page.scss'],
})
export class VerseawanaPage implements OnInit {

  information = null;
  trialInput: string;
  plainInput = ""
  noBreakInput = ""
  jointVerse = ""
  plainVerse = ""
  display = ""

  constructor(private localstorageService: LocalstorageService,
    private location: Location,
    private route: ActivatedRoute,
    public alertController: AlertController) { }

  ngOnInit() {
    this.information = this.localstorageService.currentVerse;
    console.log(this.information);
  }

  checkInput() {
    this.plainInput = this.trialInput.replace(/[，。、:;；,.．：" "！!？?「」“”（）()‘’─]/g,"")
    this.noBreakInput = this.plainInput.replace(/\n/g, "")
    console.log(this.noBreakInput)

    this.joinAll()
    this.plainVerse = 
      this.jointVerse.replace(/[，。、:;；,.．：" "！!？?「」“”（）()‘’─]/g,"") 
    console.log(this.plainVerse)

    if (this.noBreakInput == this.plainVerse) {
      this.presentAlert('恭喜 !', '答案正確 !')
        console.log("we are in verseawana.ts before setLocalon, doneVersesawana")
        console.log(this.localstorageService.doneVersesawana)
      this.localstorageService.setlocalOn(this.information.index);
      //console.log(this.firebaseService.currentIndex)
        console.log("we are in verseawana.ts after setLocalon, doneVersesawana")
        console.log(this.localstorageService.doneVersesawana)
      this.trialInput = ""
      this.location.back();
    } else {
      this.findDiff(this.noBreakInput, this.plainVerse)
      this.presentAlert('再試試吧 ! 加油 !', '提示: '+this.display)
      //this.localstorageService.setlocalOff(this.firebaseService.currentIndex);
    } 
  
  }

  //join all the text fields in the json file
  joinAll() {
    if(this.information.text2 != null) {
      this.jointVerse = this.information.text1 + this.information.text2
      if(this.information.text3 != null) {
        this.jointVerse = this.jointVerse + this.information.text3
        if(this.information.text4 != null) {
          this.jointVerse = this.jointVerse + this.information.text4
          if(this.information.text5 != null) {
            this.jointVerse = this.jointVerse + this.information.text5
            if(this.information.text6 != null) {
              this.jointVerse = this.jointVerse + this.information.text6
              if(this.information.text7 != null) {
                this.jointVerse = this.jointVerse + this.information.text7
                if(this.information.text8 != null) {
                  this.jointVerse = this.jointVerse + this.information.text8
                  if(this.information.text9 != null) {
                    this.jointVerse = this.jointVerse + this.information.text9
                  }
                }
              }
            }
          }
        }
      }
    } else {
      this.jointVerse = this.information.text1
    }
    //console.log(this.jointVerse)
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
