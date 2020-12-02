import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserServiceComponent } from './components/user-service/user-service.component';
import { UserJobsComponent } from './components/user-jobs/user-jobs.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterElectionComponent } from './components/register/register-election/register-election.component';
import { RegisterJobsComponent } from './components/register/register-jobs/register-jobs.component';
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { RegisterUserJobsComponent } from './components/register/register-user-jobs/register-user-jobs.component';
import { RegisterUserProductsComponent } from './components/register/register-user-products/register-user-products.component';
import { RegisterUserServiceComponent } from './components/register/register-user-service/register-user-service.component';
import { RegisterNumberProductsComponent } from './components/register/register-number-products/register-number-products.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user-products/:id', component: UserProductsComponent },
    { path: 'user-service/:id', component: UserServiceComponent },
    { path: 'user-jobs/:id', component: UserJobsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register-election', component: RegisterElectionComponent },
    { path: 'register-jobs', component: RegisterJobsComponent },
    { path: 'register-user', component: RegisterUserComponent },
    { path: 'register-user-jobs', component: RegisterUserJobsComponent },
    { path: 'register-user-products/:number', component: RegisterUserProductsComponent },
    { path: 'register-user-service', component: RegisterUserServiceComponent },
    { path: 'register-number-products', component: RegisterNumberProductsComponent },
    { path: '**', component: LoginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);