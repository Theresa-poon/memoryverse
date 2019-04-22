import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-child-a',
  templateUrl: './menu-child-a.page.html',
  styleUrls: ['./menu-child-a.page.scss'],
})
export class MenuChildAPage implements OnInit {

  itemschild: Array<any>;

  constructor(private afs: AngularFirestore,
    public firebaseService: FirebaseService, 
    public localstorageService: LocalstorageService, 
    private router: Router) { }

  ngOnInit() {
    this.getDataChild();
    this.localstorageService.getLocalChild();
  }

  getDataChild() {
    this.firebaseService.getVersesChild()
    .subscribe(result => {
      this.itemschild = result;
    })
  }

  GoToVersePractice(item, i, page) {
    this.firebaseService.currentVerse = item;
    this.firebaseService.currentIndex = i;
    this.localstorageService.currentPage = page;
    this.router.navigate(['/verse']);
  }

}
