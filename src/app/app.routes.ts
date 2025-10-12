import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { HeroSection } from '../components/app/hero-section';
import { Rooms } from '../pages/rooms/rooms';
import { ConferenceRoom } from '../pages/conference-room/conference-room';
import { Spa } from '../pages/spa/spa';
import { Events } from '../pages/events/events';
import { Reservation } from '../pages/reservation/reservation';
import { Signup } from '../pages/signup/signup';
import { LoginComponent } from '../pages/login/login';
import { CreateAccount } from '../pages/choose-registration/choose-registration';
import { AccountComponent } from '../pages/account.component/account.component';
import { CreateAccountPJ } from '../pages/create-account-pj/create-account-pj';
import { CreateAccountPF } from '../pages/create-account-pf/create-account-pf';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { AccountCreated } from '../pages/account-created/account-created';

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
        path: 'app-conference-room',
        component: ConferenceRoom
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
        component: CreateAccountPF,
        data: { showFooter: false }
    },
    {
        path: 'forgot/password',
        component: ForgotPassword,
        data: { showFooter: false }
    },
    {
        path: 'account/created/successfully',
        component: AccountCreated,
        data: { showFooter: false }
    }
];
