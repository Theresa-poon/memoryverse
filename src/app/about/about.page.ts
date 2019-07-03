import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  itemsCredit: Array<any>;
  itemsCreditChild: Array<any>;
  itemsCreditTeen: Array<any>;

  constructor(
    public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getPhotoCredit();
  }

  getPhotoCredit() {
    this.firebaseService.getCredit()
      .subscribe(result => {
        this.itemsCredit = result;
    })
    this.firebaseService.getCreditChild()
    .subscribe(result => {
      this.itemsCreditChild = result;
    })
    this.firebaseService.getCreditTeen()
    .subscribe(result => {
      this.itemsCreditTeen = result;
    })
  }
  
}
