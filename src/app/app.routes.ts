import { Routes } from '@angular/router';
import { HeroSection } from '../components/app/hero-section';
import { HomeComponent } from '../pages/home/home.component/home.component';

import { AuditoriumComponent } from '../pages/espacos-alugaveis/auditorium.component/auditorium.component';
import { ConferenceRoomComponent } from '../pages/espacos-alugaveis/conference-room.component/conference-room.component';
import { RoomsComponent } from '../pages/espacos-alugaveis/rooms.component/rooms.component';
import { SalaoEventosComponent } from '../pages/espacos-alugaveis/salao-eventos.component/salao-eventos.component';
import { SaunaComponent } from '../pages/espacos-alugaveis/sauna.component/sauna.component';
import { SpaComponent } from '../pages/espacos-alugaveis/spa.component/spa.component';

import { FacilitiesComponent } from '../pages/espacos-comuns/facilities.component/facilities.component';

import { Signup } from '../pages/signup/signup';
import { CreateAccount } from '../pages/create-account/choose-registration.component/choose-registration.component';
import { CreateAccountPjComponent } from '../pages/create-account/create-account-pj.component/create-account-pj.component';
import { CreateAccountPfComponent } from '../pages/create-account/create-account-pf.component/create-account-pf.component';

import { ChooseLoginComponent } from '../pages/login/choose-login.component/choose-login.component';
import { LoginPfComponent} from '../pages/login/loginPf.component/loginPf.component';
import { LoginPjComponent} from '../pages/login/loginPj.component/loginPj.component';
import { LoginAdminFuncComponent} from '../pages/login/loginAdminFunc.component/loginAdminFunc.component';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';

import { AccountComponent} from '../pages/account/account.component/account.component';
import { PersonalInfoComponent } from '../pages/account/personal-info.component/personal-info.component';
import { MyReservationsComponent } from '../pages/account/my-reservations.component/my-reservations.component';

export const routes: Routes = [
  ///////  ///////  ///////  ///////  ///////    HERO SECTION
    {
        path: '',
        component: HeroSection,
        data: { showHeader: false, showFooter: false }
    },
  ///////  ///////  ///////  ///////  ///////    HOME
    {
        path: 'home',
        component: HomeComponent
    },
  ///////  ///////  ///////  ///////  ///////    ESPAÇOS ALUGÁVEIS
    {
        path: 'app-auditorium',
        component: AuditoriumComponent
    },
    {
        path: 'app-conference-room',
        component: ConferenceRoomComponent
    },
    {
        path: 'app-rooms',
        component: RoomsComponent
    },
    {
        path: 'app-salao-eventos',
        component: SalaoEventosComponent
    },
    {
        path: 'app-sauna',
        component: SaunaComponent
    },
    {
        path: 'app-spa',
        component: SpaComponent
    },
  ///////  ///////  ///////  ///////  ///////    ESPAÇOS COMUNS (FACILITIES)
    {
        path: 'app-facilities',
        component: FacilitiesComponent
    },
  ///////  ///////  ///////  ///////  ///////    CADASTRO
    {
        path: 'account/signup',
        component: Signup,
        data: { showFooter: false }
    },
    {
        path: 'account/register',
        component: CreateAccount,
        data: { showFooter: false }
    },
    {
        path: 'account/register/pj',
        component: CreateAccountPjComponent,
        data: { showFooter: false }
    },
    {
        path: 'account/register/pf',
        component: CreateAccountPfComponent,
        data: { showFooter: false }
    },
  ///////  ///////  ///////  ///////  ///////    LOGIN
  {
        path: 'auth/login',
        component: ChooseLoginComponent,
        data: { showFooter: false }
    },
  {
        path: 'auth/login/pf',
        component: LoginPfComponent,
        data: { showFooter: false }
    },
  {
        path: 'auth/login/pj',
        component: LoginPjComponent,
        data: { showFooter: false }
    },
  {
        path: 'auth/login/admin',
        component: LoginAdminFuncComponent,
        data: { showFooter: false }
    },
    {
        path: 'forgot/password',
        component: ForgotPassword,
        data: { showFooter: false }
    },
  ///////  ///////  ///////  ///////  ///////    PÁGINA DO USUÁRIO
    {
        path: 'account',
        component: AccountComponent,
        children: [
            { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
            {
              path: 'personal-info',
              component: PersonalInfoComponent,
              data: { showFooter: false }
            },
            {
              path: 'my-reservations',
              component: MyReservationsComponent,
              data: { showFooter: false }
            },
          ],
    },
];
