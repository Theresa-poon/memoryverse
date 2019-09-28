import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; // import Alert Controller
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-versebattle',
  templateUrl: './versebattle.page.html',
  styleUrls: ['./versebattle.page.scss'],
})
export class VersebattlePage implements OnInit {

  information = null;
  trialInput: string;
  plainInput = ""
  noBreakInput = ""
  plainVerse = ""

  constructor( 
    private route: ActivatedRoute,
    public alertController: AlertController, 
    private firebaseService: FirebaseService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.information = this.firebaseService.currentVerse;
  }

  checkInput() {
    this.plainInput = this.trialInput.replace(/[，。、:;；,." "！!？?─]/g,"")
    this.noBreakInput = this.plainInput.replace(/\n/g, "")
    
    this.plainVerse = 
      this.information.payload.doc.data().sentence1.replace(/[，。、:;；,." "！!？?─]/g,"") + 
      this.information.payload.doc.data().sentence2.replace(/[，。、:;；,." "！!？?─]/g,"") +
      this.information.payload.doc.data().sentence3.replace(/[，。、:;；,." "！!？?─]/g,"")
    
    console.log(this.plainVerse)
    console.log(this.noBreakInput)
    if (this.noBreakInput == this.plainVerse) {
      this.localstorageService.setBattleBoard(this.firebaseService.currentIndex);
      if (this.checkWin() == 1) {
        this.localstorageService.whoWins = 1
        this.presentAlert('恭喜 對戰者1 !', '你已獲勝 !')
      } else {
        if (this.checkWin() == 2) {
          this.localstorageService.whoWins = 2
          this.presentAlert('恭喜 對戰者2 !', '你已獲勝 !')
        } else {
          if (this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2]  
              * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] 
              * this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] === 0) {
            this.presentAlert('做得好 !', '答案正確 !')
          } else {
            this.localstorageService.whoWins = 3
            this.presentAlert('雙方平手 !', '對戰結束 !')
          }
        }
      }
      //this.presentAlert('做得好 !', '答案正確 !')
      //this.localstorageService.setBattleBoard(this.firebaseService.currentIndex);
      this.trialInput = ""
      this.location.back();
      //this.router.navigate(['/menu']);
    } else {
      this.presentAlert('哎呀 !', '答案不正確 !')
      //this.localstorageService.setlocalOff(this.firebaseService.currentIndex);
      this.location.back();
    } 

    this.localstorageService.roundCount = this.localstorageService.roundCount + 1
    //console.log(this.localstorageService.roundCount)

  }

  async presentAlert(title: string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["OK"]
    })
    await alert.present()
  }

  checkWin() {
    switch(this.firebaseService.currentIndex) { 
      case 0: { 
        console.log("First verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2] == 1 
            || this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[8] == 1
            || this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[6] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2] == 8
            || this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[8] == 8
            || this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[6] == 8) {
            return 2
          } else {
          return 0
          }
        }
        break; 
      } 
      case 1: { 
        console.log("Second verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2] == 1 
            || this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[7] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2] == 8 
            || this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[7] == 8) {
            return 2
          } else {
            return 0
          }
        }
         break; 
      } 
      case 2: {
         console.log("Third verse is chosen and answered correctly"); 
         if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2] == 1 
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[6] == 1
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[5] * this.localstorageService.battleBoard[8] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[2] == 8
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[6] == 8
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[5] * this.localstorageService.battleBoard[8] == 8) {
            return 2
          } else {
            return 0
          }
        }
         break;    
      } 
      case 3: { 
        console.log("Fourth verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[6] == 1 
            || this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[6] == 8 
            || this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] == 8) {
            return 2
          } else {
            return 0
          }
        }
         break; 
      }  
      case 4: { 
        console.log("Fifth verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] == 1 
          || this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[7] == 1
          || this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[8] == 1
          || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[6] == 1) {
        return 1
      } else {
        if(this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] == 8
          || this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[7] == 8
          || this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[8] == 8
          || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[6] == 8) {
          return 2
        } else {
        return 0
        }
      }
        break; 
     } 
     case 5: { 
        console.log("Sixth verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[5] * this.localstorageService.battleBoard[8] == 1 
            || this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[5] * this.localstorageService.battleBoard[8] == 8 
            || this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[5] == 8) {
            return 2
          } else {
            return 0
          }
        }
        break; 
     } 
     case 6: {
        console.log("7th verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[6] == 1 
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[6] == 1
            || this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[3] * this.localstorageService.battleBoard[6] == 8
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[6] == 8
            || this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] == 8) {
            return 2
          } else {
            return 0
          }
        }
        break;    
     } 
     case 7: { 
      console.log("8th verse is chosen and answered correctly"); 
      if(this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] == 1 
          || this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[7] == 1) {
        return 1
      } else {
        if(this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] == 8 
          || this.localstorageService.battleBoard[1] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[7] == 8) {
          return 2
        } else {
            return 0
        }
      } 
      break; 
     }
      default: { 
        console.log("9th verse is chosen and answered correctly"); 
        if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[8] == 1 
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[5] * this.localstorageService.battleBoard[8] == 1
            || this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] == 1) {
          return 1
        } else {
          if(this.localstorageService.battleBoard[0] * this.localstorageService.battleBoard[4] * this.localstorageService.battleBoard[8] == 8
            || this.localstorageService.battleBoard[2] * this.localstorageService.battleBoard[5] * this.localstorageService.battleBoard[8] == 8
            || this.localstorageService.battleBoard[6] * this.localstorageService.battleBoard[7] * this.localstorageService.battleBoard[8] == 8) {
            return 2
          } else {
            return 0
          }
        }
        break;              
      } 
   }
  }


}
