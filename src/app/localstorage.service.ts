import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAwana } from './awana';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export enum SearchType {
  all = '',
  TT2Zero = 'TT2Zero',
  TT2One = 'TT2One',
  TT2Two = 'TT2Two',
  TT2Three = 'TT2Three',
  TT2Four = 'TT2Four',
  TT2Five = 'TT2Five',
  TT2Six = 'TT2Six',
  TT2Seven = 'TT2Seven',
  TT2Eight = 'TT2Eight'
}

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  doneVerses: Array<any> // array storing which verses have been successfully memorised
  doneversesString
  doneVerseschild: Array<any>
  doneverseschildString
  doneVersesteen: Array<any>
  doneversesteenString
  doneVersesawana: Array<any>
  doneversesawanaString
  currentPage
  battleBoard: Array<any>
  roundCount
  whoWins
  lastUsername // current logged in username
  lastPassword // current logged in username
  lastUserID  // current logged in userID
  switch // indicator whether user is logged in
  private _url: string ="/assets/data/awana.json"; // json storing awana verses 
  currentVerse: any; // storing awana selected verse

  constructor(private http: HttpClient) { }

  getLocal() {
    if(localStorage.getItem("doneVerses3078")===null) 
    {
      localStorage.setItem("doneVerses3078", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
    }
    this.doneVerses = localStorage.getItem("doneVerses3078").split(",")
    console.log(this.doneVerses)
    this.currentPage="menu"
  }

  getLocalChild() {
    if(localStorage.getItem("doneVerses3178")===null) 
    {
      localStorage.setItem("doneVerses3178", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
    }
    this.doneVerseschild = localStorage.getItem("doneVerses3178").split(",")
    console.log(this.doneVerseschild)
    this.currentPage="child"
  }

  getLocalTeen() {
    if(localStorage.getItem("doneVerses3478")===null) 
    {
      localStorage.setItem("doneVerses3478", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
    }
    this.doneVersesteen = localStorage.getItem("doneVerses3478").split(",")
    console.log(this.doneVersesteen)
    this.currentPage="teen"
  }

  getLocalAwana(length) {
    if(localStorage.getItem("doneVerses3778")===null) 
    {
      var temp = "0"
      var x 
      for (x = 1; x < length; x++) {
        temp = temp + ",0"
      }
      console.log("temp = "+temp)
      //localStorage.setItem("doneVerses3778", "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")
      localStorage.setItem("doneVerses3778", temp)
    }
    this.doneVersesawana = localStorage.getItem("doneVerses3778").split(",")
    console.log(this.doneVersesawana)
    this.currentPage="awana"
  }

  getBattle() {
    console.log("I am in getBattle")
    //if(localStorage.getItem("doneVerses4111")===null) 
    //{
    //  localStorage.setItem("doneVerses4111", "0,0,0,0,0,0,0,0,0")
    //}
    //this.battleBoard = localStorage.getItem("doneVerses4111").split(",")
    this.battleBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    console.log(this.battleBoard)
    this.roundCount = 1
    this.whoWins = 0
  }

  setlocalOn(index) {
    console.log(this.currentPage)
    //this.doneVerses[index] = 1
    if(this.currentPage == "menu") {
      this.doneVerses[index] = Math.min(parseInt(this.doneVerses[index]) + 1, 3)
      this.doneversesString = this.doneVerses.toString()
      localStorage.setItem("doneVerses3078", this.doneversesString)
    }
    if(this.currentPage == "child") {
      this.doneVerseschild[index] = Math.min(parseInt(this.doneVerseschild[index]) + 1, 3)
      this.doneverseschildString = this.doneVerseschild.toString()
      localStorage.setItem("doneVerses3178", this.doneverseschildString)
    }
    if(this.currentPage == "teen") {
      console.log("In setLocalOn currentPage is teen before add 1")
      var x = this.doneVersesteen[index]
      var z = parseInt(this.doneVersesteen[index]) + 1
      console.log(x)
      console.log(z)
      console.log(index)
      //console.log(this.doneversesteenString)
      this.doneVersesteen[index] = Math.min(parseInt(this.doneVersesteen[index]) + 1, 3)
      this.doneversesteenString = this.doneVersesteen.toString()
      localStorage.setItem("doneVerses3478", this.doneversesteenString)
      console.log("In setLocalOn currentPage is teen after add 1")
      var y = this.doneVersesteen[index]
      console.log(y)
      //console.log(this.doneversesteenString)
    }
    if(this.currentPage == "awana") {
      this.doneVersesawana[index-1] = Math.min(parseInt(this.doneVersesawana[index-1]) + 1, 6)
      this.doneversesawanaString = this.doneVersesawana.toString()
      localStorage.setItem("doneVerses3778", this.doneversesawanaString)
      console.log(this.doneversesawanaString)
    }
  }

  setlocalOff(index) {
    //this.doneVerses[index] = 0
    if(this.currentPage == "menu") {
      this.doneVerses[index] = Math.max(this.doneVerses[index] - 1, 0)
      this.doneversesString = this.doneVerses.toString()
      //console.log(this.doneversesString)
      //console.log(this.currentPage)
      localStorage.setItem("doneVerses3078", this.doneversesString)
    }
    if(this.currentPage == "child") {
      this.doneVerseschild[index] = Math.max(this.doneVerseschild[index] - 1, 0)
      this.doneverseschildString = this.doneVerseschild.toString()
      localStorage.setItem("doneVerses3178", this.doneverseschildString)
    }
    if(this.currentPage == "teen") {
      this.doneVersesteen[index] = Math.max(this.doneVersesteen[index] - 1, 0)
      this.doneversesteenString = this.doneVersesteen.toString()
      localStorage.setItem("doneVerses3478", this.doneversesteenString)
    }
  }

  setBattleBoard(index) {
    console.log(this.battleBoard)
    if(this.roundCount % 2 === 1) {
      this.battleBoard[index] = Math.max(1, 0)
    } else {
      this.battleBoard[index] = Math.max(2, 0)
    }
      
    
    console.log(this.battleBoard)
  }

  getLoginStatus() {
    if(localStorage.getItem("login9012")===null) {
      this.lastUserID = ""
      this.lastUsername = ""
      this.lastPassword = ""
      //this.lastUserID = "C8o7ZTtZCX0Tpbd9qAZ0"
      //this.lastUsername = "金句博士"
      //this.lastPassword = "123456"
    } else {
      this.lastUserID = localStorage.getItem("login9012")
      this.lastUsername = localStorage.getItem("login9014")
      this.lastPassword = localStorage.getItem("login9016")
    }
  }

  searchData() {
    return this.http.get<IAwana[]>(this._url);
  }

}
