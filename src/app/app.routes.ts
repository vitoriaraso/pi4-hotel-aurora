import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { HeroSection } from '../components/app/hero-section';

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
    }
];
