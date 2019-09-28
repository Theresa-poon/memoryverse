import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; // import Alert Controller
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verseself',
  templateUrl: './verseself.page.html',
  styleUrls: ['./verseself.page.scss'],
})
export class VerseselfPage implements OnInit {

  information = null;
  trialInput: string;
  plainInput = ""
  noBreakInput = ""
  plainVerse = ""
  noBreakVerse = ""
  display = ""

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController, 
    private storageService: StorageService,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
    this.information = this.storageService.selectedVerse;
  }

  checkInput() {
    //console.log(this.trialInput)
    this.plainInput = this.trialInput.replace(/[，。、:;；,.．：" "！!？?「」“”（）()‘’─]/g,"")
    this.noBreakInput = this.plainInput.replace(/\n/g, "")
    //console.log(this.plainInput)
    
    this.noBreakVerse = this.information.value.replace(/\n/g, "")
    this.plainVerse = this.noBreakVerse.replace(/[，。、:;；,.．：" "！!？?「」“”（）()‘’─]/g,"")
    
    console.log(this.plainVerse)
    console.log(this.noBreakInput)
    if (this.noBreakInput == this.plainVerse) {
      this.presentAlert('恭喜 !', '答案正確 !')
      console.log("we are in verse.ts before setLocalon, doneVersesteen")
      //this.storageService.getItems()
      console.log(this.information.modified)
      this.information.modified = this.information.modified + 1
      console.log(this.information.modified)
      this.storageService.updateItem(this.information);
      this.trialInput = ""
      this.location.back();
      //this.router.navigate(['/menu']);
    } else {
      this.findDiff(this.noBreakInput, this.plainVerse)
      this.presentAlert('再試試吧 ! 加油 !', '提示: '+this.display)
      //this.presentAlert('再試試吧 !', '加油 !')
      //this.localstorageService.setlocalOff(this.firebaseService.currentIndex);
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
