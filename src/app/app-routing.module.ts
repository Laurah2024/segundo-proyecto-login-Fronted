import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NewsComponent } from './components/pages/news/news.component';
import { OurteamComponent } from './components/pages/ourteam/ourteam.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { authRedirectGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news', component: NewsComponent, canActivate: [authGuard] },
  { path: 'ourteam', component: OurteamComponent },
  { path: 'register', component: RegisterComponent, canActivate: [authRedirectGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authRedirectGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { } 