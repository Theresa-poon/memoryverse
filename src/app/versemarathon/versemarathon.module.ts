import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VersemarathonPage } from './versemarathon.page';

const routes: Routes = [
  {
    path: '',
    component: VersemarathonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VersemarathonPage]
})
export class VersemarathonPageModule {}
