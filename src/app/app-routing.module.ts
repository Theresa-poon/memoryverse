import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'verse', loadChildren: './verse/verse.module#VersePageModule' },
  { path: 'menu-child-a', loadChildren: './menu-child-a/menu-child-a.module#MenuChildAPageModule' },
  { path: 'menu-teen', loadChildren: './menu-teen/menu-teen.module#MenuTeenPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'reset', loadChildren: './reset/reset.module#ResetPageModule' },
  { path: 'battle', loadChildren: './battle/battle.module#BattlePageModule' },
  { path: 'versebattle', loadChildren: './versebattle/versebattle.module#VersebattlePageModule' },
  { path: 'marathon', loadChildren: './marathon/marathon.module#MarathonPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'versemarathon', loadChildren: './versemarathon/versemarathon.module#VersemarathonPageModule' },
  { path: 'rules', loadChildren: './rules/rules.module#RulesPageModule' },
  { path: 'self', loadChildren: './self/self.module#SelfPageModule' },
  { path: 'verseself', loadChildren: './verseself/verseself.module#VerseselfPageModule' },
  { path: 'awana', loadChildren: './awana/awana.module#AwanaPageModule' },
  { path: 'verseawana', loadChildren: './verseawana/verseawana.module#VerseawanaPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
