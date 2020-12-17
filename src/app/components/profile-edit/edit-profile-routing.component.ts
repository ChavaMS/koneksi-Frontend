import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Componentes
import { JobsEditComponent } from './jobs-edit/jobs-edit.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { MainEditComponent } from './main-edit/main-edit.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';


const editProfileRoutes: Routes = [
    {
        path: 'edit-profile',
        component: MainEditComponent,
        children: [
            { path: '', redirectTo: 'user-edit', pathMatch: 'full' },
            { path: 'user-edit', component: UserEditComponent },
            { path: 'location-edit', component: LocationEditComponent },
            { path: 'jobs-edit', component: JobsEditComponent },
            { path: 'products-edit', component: ProductEditComponent },
            { path: 'service-edit', component: ServiceEditComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(editProfileRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EditProfileRoutingModule { }