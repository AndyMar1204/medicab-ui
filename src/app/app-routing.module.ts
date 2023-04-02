import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChooseAccountPage } from './choose-account/choose-account.page';
import { ErrComponent } from './err/err.component';
import { LoginPage } from './login/login.page';
import { AccountService } from './services/account.service';
import { HardGuardService } from './services/hard-guard.service';
import { NoUserService } from './services/no-user.service';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AccountService,HardGuardService]
  },
  {
    path: 'inscription',component :SignupPage, canActivate:[AccountService,NoUserService]
  },
  {
    path:'connexion', component:LoginPage, canActivate:[AccountService,NoUserService]
  },
  {
    path:'chooseAccount', component:ChooseAccountPage,canActivate:[NoUserService]
  },





  {path:'**', component:ErrComponent, canActivate:[NoUserService]},
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'choose-account',
    loadChildren: () => import('./choose-account/choose-account.module').then( m => m.ChooseAccountPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
