import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentVerse: any;
  currentIndex = 0;

  constructor(private afs: AngularFirestore) { }

  getVerses(){
    return this.afs.collection('verses').snapshotChanges()
  }

  getVersesChild(){
    return this.afs.collection('verseschild').snapshotChanges()
  }

  getVersesTeen(){
    return this.afs.collection('versesteen').snapshotChanges()
  }

}

