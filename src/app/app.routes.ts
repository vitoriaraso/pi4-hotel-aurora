import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { HeroSection } from '../components/app/hero-section';
import { Rooms } from '../pages/rooms/rooms';
import { ConferenceRoom } from '../pages/conference-room/conference-room';
import { Spa } from '../pages/spa/spa';
import { Events } from '../pages/events/events';
import { Reservation } from '../pages/reservation/reservation';

export const routes: Routes = [
    {
        path: '',
        component: HeroSection,
        data: { showHeader: false }
    },
    {
        path: 'home',
        component: Home,
        data: { showHeader: true }
    },
    {
        path: 'app-rooms',
        component: Rooms,
        data: { showHeader: true }
    },
    {
        path: 'app-conference-room',
        component: ConferenceRoom,
        data: { showHeader: true }
    },
    {
        path: 'app-spa',
        component: Spa,
        data: { showHeader: true }
    },
    {
        path: 'app-events',
        component: Events,
        data: { showHeader: true }
    },
    {
        path: 'app-reservation',
        component: Reservation,
        data: { showHeader: true }
    }
];
