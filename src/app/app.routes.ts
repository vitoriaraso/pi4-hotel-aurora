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
import { LoginPfComponent } from '../pages/login/loginPf.component/loginPf.component';
import { LoginPjComponent } from '../pages/login/loginPj.component/loginPj.component';
import { loginAdminComponent } from '../pages/login/login-admin/login-admin';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';

import { AccountComponent } from '../pages/account/account.component/account.component';
import { PersonalInfoComponent } from '../pages/account/personal-info.component/personal-info.component';
import { MyReservationsComponent } from '../pages/account/my-reservations.component/my-reservations.component';
import { AdminComponent } from '../pages/admin/admin.component/admin.component';
import { DashboardComponent } from '../pages/admin/dashboard.component/dashboard.component';
import { DashboardClientesComponent } from '../pages/admin/dashboard-clientes.component/dashboard-clientes.component';
import { DashboardFuncionariosComponent } from '../pages/admin/dashboard-funcionarios.component/dashboard-funcionarios.component';
import { DashboardReservasComponent } from '../pages/admin/dashboard-reservas.component/dashboard-reservas.component';
import { DashboardEspacoscomunsComponent } from '../pages/admin/dashboard-espacoscomuns.component/dashboard-espacoscomuns.component';
import { DashboardInstalacoesalugaveisComponent } from '../pages/admin/dashboard-instalacoesalugaveis.component/dashboard-instalacoesalugaveis.component';
import { DashboardHoteisComponent } from '../pages/admin/dashboard-hoteis.component/dashboard-hoteis.component';
import { DashboardConfiguracoesComponent } from '../pages/admin/dashboard-configuracoes.component/dashboard-configuracoes.component';

import { AuthCallbackComponent } from '../app/auth/auth-callback/auth-callback.component';

export const routes: Routes = [
  /////////////////////////////////////////// Login OAUTH
  //{ path: 'login', component: LoginAuthComponent },  // rota do login

  { path: 'auth-callback', component: AuthCallbackComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/auth-callback/auth-callback.component').then((m) => LoginPfComponent),
  },
  // fallback
  ///////  ///////  ///////  ///////  ///////    HERO SECTION
  {
    path: '',
    component: HeroSection,
    data: { showHeader: false, showFooter: false },
  },
  ///////  ///////  ///////  ///////  ///////    HOME
  {
    path: 'home',
    component: HomeComponent,
  },
  ///////  ///////  ///////  ///////  ///////    ESPAÇOS ALUGÁVEIS
  {
    path: 'app-auditorium',
    component: AuditoriumComponent,
  },
  {
    path: 'app-conference-room',
    component: ConferenceRoomComponent,
  },
  {
    path: 'app-rooms',
    component: RoomsComponent,
  },
  {
    path: 'app-salao-eventos',
    component: SalaoEventosComponent,
  },
  {
    path: 'app-sauna',
    component: SaunaComponent,
  },
  {
    path: 'app-spa',
    component: SpaComponent,
  },
  ///////  ///////  ///////  ///////  ///////    ESPAÇOS COMUNS (FACILITIES)
  {
    path: 'app-facilities',
    component: FacilitiesComponent,
  },
  ///////  ///////  ///////  ///////  ///////    CADASTRO
  {
    path: 'account/signup',
    component: Signup,
    data: { showFooter: false },
  },
  {
    path: 'account/register',
    component: CreateAccount,
    data: { showFooter: false },
  },
  {
    path: 'account/register/pj',
    component: CreateAccountPjComponent,
    data: { showFooter: false },
  },
  {
    path: 'account/register/pf',
    component: CreateAccountPfComponent,
    data: { showFooter: false },
  },
  ///////  ///////  ///////  ///////  ///////    LOGIN
  {
    path: 'auth/login',
    component: ChooseLoginComponent,
    data: { showFooter: false },
  },
  {
    path: 'auth/login/pf',
    component: LoginPfComponent,
    data: { showFooter: false },
  },
  {
    path: 'auth/login/pj',
    component: LoginPjComponent,
    data: { showFooter: false },
  },
  {
    path: 'auth/login/admin',
    component: loginAdminComponent,
    data: { showFooter: false },
  },
  {
    path: 'forgot/password',
    component: ForgotPassword,
    data: { showFooter: false },
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
        data: { showFooter: false },
      },
      {
        path: 'my-reservations',
        component: MyReservationsComponent,
        data: { showFooter: false },
      },
    ],
  },
  ///////  ///////  ///////  ///////  ///////    PÁGINA DO USUÁRIO
  {
    path: 'admin',
    component: AdminComponent,
    data: { showFooter: false, showHeader: false },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'admin/dashboard',
        component: DashboardComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/clientes',
        component: DashboardClientesComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/funcionarios',
        component: DashboardFuncionariosComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/reservas',
        component: DashboardReservasComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/espacos-comuns',
        component: DashboardEspacoscomunsComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/instalacoes-alugaveis',
        component: DashboardInstalacoesalugaveisComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/hoteis',
        component: DashboardHoteisComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'admin/dashboard/configuracoes',
        component: DashboardConfiguracoesComponent,
        data: { showFooter: false, showHeader: false },
      },
    ],
  },
];
