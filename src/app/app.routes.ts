import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { HeroSection } from '../components/app/hero-section';
import { Rooms } from '../pages/rooms/rooms';
import { ConferenceRoom } from '../pages/conference-room/conference-room';
import { Spa } from '../pages/spa/spa';
import { Events } from '../pages/events/events';
import { Reservation } from '../pages/reservation/reservation';
import { Signup } from '../pages/signup/signup';
import { LoginComponent } from '../pages/login.component/login.component';

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
    }
];
