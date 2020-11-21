import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserServiceComponent } from './components/user-service/user-service.component';
import { UserJobsComponent } from './components/user-jobs/user-jobs.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-products/:id', component: UserProductsComponent },
    { path: 'user-service/:id', component: UserServiceComponent },
    { path: 'user-jobs/:id', component: UserJobsComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);