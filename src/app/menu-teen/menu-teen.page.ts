import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-teen',
  templateUrl: './menu-teen.page.html',
  styleUrls: ['./menu-teen.page.scss'],
})
export class MenuTeenPage implements OnInit {

  itemsteen: Array<any>;

  constructor(private afs: AngularFirestore,
    public firebaseService: FirebaseService, 
    public localstorageService: LocalstorageService, 
    private router: Router) { }

  ngOnInit() {
    this.getDataTeen();
    this.localstorageService.getLocalTeen();
  }

  getDataTeen() {
    this.firebaseService.getVersesTeen()
    .subscribe(result => {
      this.itemsteen = result;
    })
  }

  GoToVersePractice(item, i, page) {
    this.firebaseService.currentVerse = item;
    this.firebaseService.currentIndex = i;
    this.localstorageService.currentPage = page;
    this.router.navigate(['/verse']);
  }

}
