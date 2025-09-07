import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { HeroSection } from '../components/app/hero-section';
import { MainLayout } from '../layouts/main-layout/main-layout';

export const routes: Routes = [
    { 
        path: '',
        component: HeroSection,
    },
    { 
        path: '',
        component: MainLayout,
        children: [
            { 
                path: 'home',
                component: Home
            }
        ]
    }
];
