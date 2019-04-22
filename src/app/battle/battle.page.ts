import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service'; // May NOT be necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit {

  itemsbattle: Array<any>;
  itemsrandom: Array<any>;
  //battleboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private afs: AngularFirestore,
    public firebaseService: FirebaseService, 
    public localstorageService: LocalstorageService, // May NOT be necessary
    private router: Router) { }

  ngOnInit() {
    this.getDataBattle();
    this.localstorageService.getBattle();
  }

  getDataBattle() {
    this.firebaseService.getVersesChild()
    .subscribe(result => {
      this.itemsbattle = result;
      this.shuffle(this.itemsbattle);
      console.log(this.itemsbattle)
    })
    //this.shuffle(this.itemsbattle)
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    console.log(a)
    return a;
  }

  GoToVerseBattle(item, i) {
    this.firebaseService.currentVerse = item;
    this.firebaseService.currentIndex = i;
    //this.localstorageService.currentPage = page;
    this.router.navigate(['/versebattle']);
  }

  //refresh() {
  //  this.localstorageService.getBattle();
  //}

  refresh() {
    this.getDataBattle();
    this.localstorageService.getBattle();
  }

}
