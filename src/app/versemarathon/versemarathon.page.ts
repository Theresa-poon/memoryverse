import { Component, OnInit, Testability } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { AlertController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { TestingCompiler } from '@angular/core/testing/src/test_compiler';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-versemarathon',
  templateUrl: './versemarathon.page.html',
  styleUrls: ['./versemarathon.page.scss'],
})
export class VersemarathonPage implements OnInit {

  itemsUserData // firebase document information of logged-in user
  itemsVerseData // whole firebase collection of verses
  itemsMemberOne: string = "" // firebase member field of logged-in user
  itemsMemberTwo: string = "" // a replicate of member field of logged-in user
  //memberOneArray: Array<any>
  //memberTwoArray: Array<any>
  memberName: Array<any> // extracted names from member field of logged-in user
  memberLevel: Array<any> // extrated levels fro member field of logged-in user
  vsData: string = "" // verse ion-select return value
  vsDataArray: Array<any> // verse ion-select return value transformed into array
  mmData // member ion-select return value
  //vsDataX: string = ""
  switchVM // indicator for whether verse/member levels are consistent
  trialInput: string; // user input for verse
  plainInput = "" // remove all punctuations from user verse input
  noBreakInput = "" // remove empty spaces from user verser input
  plainVerse = "" // remove punctuations from firebase verse
  display = "" // display hint of error if user has incorrect input

  constructor(
    public alertController: AlertController, 
    private afs: AngularFirestore,
    private db: AngularFirestore,
    public firebaseService: FirebaseService,
    public localstorageService: LocalstorageService,) { }

  ngOnInit() {
    this.getData();
  }

  // get user profile, verse and member information
  getData() {
    this.firebaseService.getUserData()
    .subscribe(val => {
      this.itemsUserData = val;
      this.itemsMemberOne = this.itemsUserData.members;
      this.itemsMemberTwo = this.itemsUserData.members;
      this.memberName = this.itemsMemberOne.split(",")
      this.memberLevel = this.itemsMemberTwo.split(",")
      //this.memberName = this.memberOneArray
      //this.memberLevel = this.memberTwoArray
      console.log("in getData")
      this.extractName(this.memberName)
      this.extractLevel(this.memberLevel)
      console.log(this.memberName)
      console.log(this.memberLevel)
      //console.log(this.memberName)
      //console.log(this.memberLevel)
    })
    this.firebaseService.getVerseData()
    .subscribe(result => {
      this.itemsVerseData = result;
    })
    //this.firebaseService.getMemberData()
  }

  // extract member levels from members field
  extractLevel(arrayL) {
    var i, j, len
    len = arrayL.length
    console.log(arrayL)
    console.log("in extract Level: length is "+len)
    i = 0;
    j = 0;
    //k = 0;
    for (i = 0; i < len;) {
      console.log(len)
      console.log(i)
      console.log(j)
      this.memberLevel.splice(j, 1);
      console.log("Levels"+this.memberLevel)
      i = i + 2
      j = j + 1
    }
    // reset member level if changed through database changes (instead of user selection)
    if (this.mmData != null) {
      console.log("in reset member level")
      if (this.mmData.substr(3,1)==",") {
        var k = this.mmData.substr(2,1) // the kth member = current member
      } else {
        var k = this.mmData.substr(2,2)
      }
      console.log("kth member:"+k)
      var mmDataShort = this.mmData.slice(1)
      console.log("less the first char = "+mmDataShort)
      console.log("add this: "+this.memberLevel[k])
      var mmDataNew = this.memberLevel[k]+mmDataShort
      console.log("the result is :"+mmDataNew)
      this.mmData = mmDataNew
      // reset switch read by checkInput() when user presses "檢視輸入"
      if (this.vsDataArray != null) {
        if (parseInt(this.vsDataArray[0]) > parseInt(this.mmData.substr(0,1))+1) {
          this.switchVM = "0"
        } else {
          this.switchVM = "1"
        }
      }
    }
  }

  // extract member names from members field
  extractName(arrayN) {
    var x, y, leng
    leng = arrayN.length
    x = 0;
    y = 0;
    //k = 0;
    for (x = 0; x < leng;) {
      console.log(leng)
      console.log(x)
      console.log(y)
      this.memberName.splice(y+1, 1);
      console.log("Names"+this.memberName)
      x = x + 2
      y = y + 1
    }
  }

  // show hint for verse
  showHint() {
    if (this.vsData != "") {
      //console.log("is it empty?"+this.vsData)
      //this.presentAlert("提示: ","「"+this.vsDataArray[2].substr(0,7)+"......」")
      this.presentAlert("提示: ","「"+this.vsDataArray[2]+this.vsDataArray[3]+this.vsDataArray[4]+this.vsDataArray[5]+this.vsDataArray[6]+"」")
    }
  }

  //check if selected verse level is available for the selected member
  checkVerse() {
    this.vsDataArray = this.vsData.split(",")
    if (this.mmData != null) {
      this.compareVM("V")
    } else {
      //this.presentAlert("Verse level"+this.vsDataArray[0]," Member level: not selected")
    }
    //this.mmData = ""
  }

  //check if selected member is qualified to participate in the selected verse level
  checkMember() {
    //if (this.mmData != " ") {
      if (this.vsDataArray != null) {
        this.compareVM("M")
      } else {
        //this.presentAlert("Verse level: not selected"," Member level:"+parseInt(this.mmData.substr(0,1)))
      }
    //}
  }

  // compare selected verse level vs selected member level
  compareVM(VorM) {
    if (parseInt(this.vsDataArray[0]) > parseInt(this.mmData.substr(0,1))+1) {
      //this.presentAlert("Verse level:"+this.vsDataArray[0]," Member level:"+parseInt(this.mmData.substr(0,1)))
      if (VorM == "V") {
        var temp = parseInt(this.mmData.substr(0,1))+1
        this.presentAlert("請選擇級別"+temp+"或以下之經文!", "或更改隊員級別!")
      } else {
        var temp = parseInt(this.vsDataArray[0])-1
        this.presentAlert("請選擇級別"+temp+"或以上之隊員!", "或更改經文級別!")
      }
      this.switchVM = "0"
    } else {
      //this.presentAlert("Verse level <= Member level + 1", "Okay!")
      this.switchVM = "1"
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

  // performs validation when user presses button for "檢視輸入"
  checkInput() {
    if (this.switchVM == "1") {
      //this.presentAlert("經文級別與隊員級別符合!", "Okay!")
      this.compareVerse()
    } else {
      this.presentAlert("經文級別與隊員級別不符!", "請修改選項!")
    }
  }

  compareVerse() {
    this.plainInput = this.trialInput.replace(/[，。、:;；,." "！!？?]/g,"")
    this.noBreakInput = this.plainInput.replace(/\n/g, "")
    
    this.plainVerse = 
      this.vsDataArray[2].replace(/[，。、:;；,." "！!？?]/g,"") +
      this.vsDataArray[3].replace(/[，。、:;；,." "！!？?]/g,"") +
      this.vsDataArray[4].replace(/[，。、:;；,." "！!？?]/g,"") +
      this.vsDataArray[5].replace(/[，。、:;；,." "！!？?]/g,"") +
      this.vsDataArray[6].replace(/[，。、:;；,." "！!？?]/g,"") 

    console.log(this.plainVerse)
    console.log(this.noBreakInput)
    if (this.noBreakInput == this.plainVerse) {
      this.presentAlert('恭喜 !', '答案正確 !')
      this.increaseScore()
      //this.localstorageService.setlocalOn(this.firebaseService.currentIndex);
      this.trialInput = ""
      //this.location.back();
      //this.router.navigate(['/menu']);
    } else {
      this.findDiff(this.noBreakInput, this.plainVerse)
      this.presentAlert('再試試吧 ! 加油 !', '提示: '+this.display)
      //this.presentAlert('再試試吧 !', '加油 !')
      //this.localstorageService.setlocalOff(this.firebaseService.currentIndex);
    } 
  }

  // Find the first error if user inputted incorrect verse
  findDiff(input, verse) {
    var i
    this.display = ""
    for (i = 0; i < verse.length+1; i++) { 
      if (verse[i] == input[i]) {
        this.display = this.display.concat(verse[i]);
        console.log(this.display)
      } else {
        if (input[i] == null) {
          this.display = this.display.concat(" + ",verse[i],"...")
          console.log(this.display)
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

  // increases firebase score if user has correct input
  increaseScore() {
    
    console.log("in test")
      //this.afs.collection('user').doc('C8o7ZTtZCX0Tpbd9qAZ0').update({ score: this.firebase.firestore.FieldValue.increment(100) })
      //this.afs.collection('user').doc('C8o7ZTtZCX0Tpbd9qAZ0').update({ score: firestore.FieldValue.increment(100) })
    var tempID = this.localstorageService.lastUserID
    var tempmmData = this.mmData  // ion-select member information "level, xth member, name"
    var tempvs = this.vsDataArray[0] // verse level

    // Create a reference to the SF doc.
    //const sfDocRef = this.db.firestore.collection("user").doc("C8o7ZTtZCX0Tpbd9qAZ0");
    const sfDocRef = this.db.firestore.collection("user").doc(`${tempID}`);
  
    return this.db.firestore.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(sfDocRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
              throw "Document does not exist!";
          }
  
          // Add 100 to firebase user score for correct input verse
          var newScore = sfDoc.data().score + 100;
          transaction.update(sfDocRef, { score: newScore }); 

          // extract firebase existing member levels (and names) "name1,level1,name2,level2..."
          var oldDataM = sfDoc.data().members.split(",")
          console.log("extract copy of doc.member oldDataM: ")
          console.log(oldDataM)
          
          // Update firebase member level
          if (tempmmData.substr(3,1)==",") {
            var k = tempmmData.substr(2,1) // the kth member = current member
          } else {
            var k = tempmmData.substr(2,2)
          }
            var m = 2*(+k+1) - 1 // array index of current member's level in array "oldDataM"
          console.log("kth member="+k+" array index of kth member's level m="+m)
          console.log("oldDataM[m]="+oldDataM[m])
          console.log("vsDataArray[0]="+tempvs)
          //this.presentAlert("waiting", "second time")
          // update if firebase member level < verse level
          if (oldDataM[m] < tempvs) {
            oldDataM[m] = tempvs
            console.log("after change"+oldDataM)
            var newDataS = oldDataM.toString()
            console.log("oldDataM[m]="+oldDataM[m])
            console.log("newDataS="+newDataS)
              //console.log("tempmmData = "+tempmmData)
              //var mmDataShort = tempmmData.slice(1)
              //console.log("less the first char = "+mmDataShort)
              //console.log("add this: "+tempvs)
              //var mmDataNew = tempvs+mmDataShort
              //console.log("the result is :"+mmDataNew)
            //this.presentAlert("waiting", "second time")
            transaction.update(sfDocRef, { members: newDataS }); 
            
          } 

          // update firebase user level
          console.log("sfDoc.data().level:" + sfDoc.data().level)
          console.log("tempvs ="+tempvs)
          // see if firebase user level is less than verse level
          if (sfDoc.data().level < tempvs) {
            var z = 1
            var leng = oldDataM.length
            var min = oldDataM[1]
            // find the minimum firebase member level for this user
            if (leng > 2) {
              for (z = 1; z < leng - 2;) {
                if (oldDataM[z+2] < min) {
                  min = oldDataM[z+2]
                }
                console.log("z ="+z+" min="+min)
                z = z + 2
              }
            } 
            console.log("after do loop: min="+min)
            // update if firebase minimum member level is less than user level
            if (min > sfDoc.data().level) {
              console.log("before update: min="+min)
              //this.presentAlert("waiting", "third time")
              transaction.update(sfDocRef, { level: min });
            }
          }

      });
    }).then(function() {
      console.log("Transaction successfully committed!");
      //this.presentAlert('恭喜 !', '答案正確 !')
    }).catch(function(error) {
      console.log("Transaction failed: ", error);
    });


  }

}
