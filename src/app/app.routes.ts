import { Routes } from '@angular/router';
import { HeroSection } from '../components/app/hero-section';
//import { HomeComponent } from '../pages/home/home.component/home.component';

import { ConferenceRoomComponent } from '../pages/espacos-alugaveis/conference-room.component/conference-room.component';
import { RoomsComponent } from '../pages/espacos-alugaveis/rooms.component/rooms.component';
import { ReserveComponent } from '../pages/espacos-alugaveis/reserve.component/reserve.component';

import { FacilitiesComponent } from '../pages/espacos-comuns/facilities.component/facilities.component';
import { DependenciesComponent } from '../pages/espacos-comuns/dependencies.component/dependencies.component';

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
import { DashboardClientesComponent } from '../pages/admin/clientes/dashboard-clientes.component/dashboard-clientes.component';
import { DashboardConfiguracoesComponent } from '../pages/admin/dashboard-configuracoes.component/dashboard-configuracoes.component';

import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';
import {ClienteDetailComponent} from '../pages/admin/clientes/cliente-detail/cliente-detail.component';
import {
  DashboardFuncionariosComponent
} from '../pages/admin/funcionarios/dashboard-funcionarios.component/dashboard-funcionarios.component';
import {
  CreateFuncionarioComponent
} from '../pages/admin/funcionarios/create-funcionario.component/create-funcionario.component';
import {
  FuncionariosDetailComponent
} from '../pages/admin/funcionarios/funcionarios-detail/funcionarios-detail.component';
import {
  DashboardReservasComponent
} from '../pages/admin/reservas/dashboard-reservas.component/dashboard-reservas.component';
import {
  DashboardEspacosComponent
} from '../pages/admin/espacos-comuns/dashboard-espacos.component/dashboard-espacos.component';
import {CreateEspacoComponent} from '../pages/admin/espacos-comuns/create-espaco.component/create-espaco.component';
import {EspacoDetailComponent} from '../pages/admin/espacos-comuns/espaco-detail.component/espaco-detail.component';
import {
  DashboardInstalacoesComponent
} from '../pages/admin/instalacoes/dashboard-instalacoes.component/dashboard-instalacoes.component';
import {
  CreateInstalacaoComponent
} from '../pages/admin/instalacoes/create-instalacao.component/create-instalacao.component';
import {
  InstalacaoDetailComponent
} from '../pages/admin/instalacoes/instalacao-detail.component/instalacao-detail.component';
import {CreateHotelComponent} from '../pages/admin/hoteis/create-hotel.component/create-hotel.component';
import {HotelDetailComponent} from '../pages/admin/hoteis/hotel-detail.component/hotel-detail.component';
import {DashboardHoteisComponent} from '../pages/admin/hoteis/dashboard-hoteis.component/dashboard-hoteis.component';
import {CreateReservaComponent} from '../pages/admin/reservas/create-reserva.component/create-reserva.component';
import {
  CustomerReservationComponent
} from '../pages/reserve/customer-reservation.component/customer-reservation.component';

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
    // data: { showHeader: false, showFooter: false },
  },
  ///////  ///////  ///////  ///////  ///////    HOME
  //{
  //  path: 'home',
  //  component: HomeComponent,
  //},
  ///////  ///////  ///////  ///////  ///////    ESPAÇOS ALUGÁVEIS
  //{
  //  path: 'app-auditorium',
  //  component: AuditoriumComponent,
  //},
  {
    path: 'conference-rooms',
    component: ConferenceRoomComponent,
  },
  {
    path: 'accommodations',
    component: RoomsComponent,
  },
  //{
  //  path: 'app-salao-eventos',
  //  component: SalaoEventosComponent,
  //},

  {
    path: 'reserve',
    component: CustomerReservationComponent,
  },
  ///////  ///////  ///////  ///////  ///////    ESPAÇOS COMUNS (FACILITIES)
  //{
  //  path: 'app-facilities',  //não utilizado e substituído pelo path app-lazer
  //  component: FacilitiesComponent,
  //},
  {
    path: 'dependencies',
    component: DependenciesComponent,
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
  ///////  ///////  ///////  ///////  ///////    DASHBOARD DO ADMIN
  {
    path: 'admin',
    component: AdminComponent,
    data: { showFooter: false, showHeader: false },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/clientes',
        component: DashboardClientesComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/clientes/:id',
        component: ClienteDetailComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/funcionarios',
        component: DashboardFuncionariosComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/funcionarios/novo',
        component: CreateFuncionarioComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/funcionarios/:id',
        component: FuncionariosDetailComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/reservas',
        component: DashboardReservasComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/reservas/novo',
        component: CreateReservaComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/espacos-comuns',
        component: DashboardEspacosComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/espacos-comuns/novo',
        component: CreateEspacoComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/espacos-comuns/:id',
        component: EspacoDetailComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/instalacoes-alugaveis',
        component: DashboardInstalacoesComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/instalacoes-alugaveis/novo', // 'novo' vem ANTES de ':id'
        component: CreateInstalacaoComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/instalacoes-alugaveis/:id',
        component: InstalacaoDetailComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/hoteis',
        component: DashboardHoteisComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/hoteis/novo', // 'novo' vem ANTES de ':id'
        component: CreateHotelComponent,
        data: { showFooter: false, showHeader: false },
      },
      {
        path: 'dashboard/hoteis/:id',
        component: HotelDetailComponent,
        data: { showFooter: false, showHeader: false },
      },
      // {
      //   path: 'dashboard/configuracoes',
      //   component: DashboardConfiguracoesComponent,
      //   data: { showFooter: false, showHeader: false },
      // },
    ],
  },
];
