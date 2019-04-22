import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  //bibleVerse
  //bibleVerses

  items: Array<any>;

  constructor(private afs: AngularFirestore,
    public firebaseService: FirebaseService, 
    public localstorageService: LocalstorageService, 
    private router: Router) 
    {
    //const verse = afs.doc('verses/one1')
    //this.bibleVerse = verse.valueChanges()
    //this.bibleVerses = this.getVerses()
   }

  //async getVerses() {
  //  const snapshot = await this.afs.collection('verses').get()
  //  return snapshot
    //return snapshot.forEach(doc => doc.docChanges())
  //}

  ngOnInit() {
    this.getData();
    this.localstorageService.getLocal();
  }

  getData() {
    this.firebaseService.getVerses()
    .subscribe(result => {
      this.items = result;
    })
  }

  GoToVersePractice(item, i, page) {
    this.firebaseService.currentVerse = item;
    this.firebaseService.currentIndex = i;
    this.localstorageService.currentPage = page;
    this.router.navigate(['/verse']);
  }

}
