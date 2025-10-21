import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { HeroSection } from '../components/app/hero-section';
import { Rooms } from '../pages/rooms/rooms';
import { ConferenceRoomComponent } from '../pages/conference-room.component/conference-room.component';
import { Spa } from '../pages/spa/spa';
import { Events } from '../pages/events/events';
import { Reservation } from '../pages/reservation/reservation';
import { Signup } from '../pages/signup/signup';
import { LoginComponent } from '../pages/login/login';
import { CreateAccount } from '../pages/choose-registration.component/choose-registration.component';
import { AccountComponent } from '../pages/account.component/account.component';
import { CreateAccountPJ } from '../pages/create-account-pj.component/create-account-pj';
import { CreateAccountPfComponent } from '../pages/create-account-pf.component/create-account-pf.component';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { AccountCreatedComponent } from '../pages/account-created.component/account-created.component';

export const routes: Routes = [
    {
        path: '',
        component: HeroSection,
        data: { showHeader: false, showFooter: false }
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'app-rooms',
        component: Rooms
    },
    {
        path: 'app-conference-room.component',
        component: ConferenceRoomComponent
    },
    {
        path: 'app-spa',
        component: Spa
    },
    {
        path: 'app-events',
        component: Events
    },
    {
        path: 'app-reservation',
        component: Reservation
    },
    {
        path: 'account/signup',
        component: Signup,
        data: { showFooter: false }
    },
    {
        path: 'auth/login',
        component: LoginComponent,
        data: { showFooter: false }
    },
    {
        path: 'account/register',
        component: CreateAccount,
        data: { showFooter: false }
    },
    {
        path: 'account',
        component: AccountComponent,
        data: { showFooter: false }
    },
    {
        path: 'account/register/pj',
        component: CreateAccountPJ,
        data: { showFooter: false }
    },
    {
        path: 'account/register/pf',
        component: CreateAccountPfComponent,
        data: { showFooter: false }
    },
    {
        path: 'forgot/password',
        component: ForgotPassword,
        data: { showFooter: false }
    },
    {
        path: 'account/created',
        component: AccountCreatedComponent,
        data: { showFooter: false }
    }
];
