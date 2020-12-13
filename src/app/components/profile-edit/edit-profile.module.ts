//Modulos
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MomentModule } from 'angular2-moment'

//Modulos extras
import { GeneralModule } from '../../modules/app.general.module';

//Rutas
import { EditProfileRoutingModule } from './edit-profile-routing.component';

//Servicios
import { UserServices } from '../../services/user.service';

//Componentes
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { JobsEditComponent } from './jobs-edit/jobs-edit.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MainEditComponent } from './main-edit/main-edit.component';


//import { UserGuard } from '../../services/user.guard';

@NgModule({
    declarations: [
        ProductEditComponent,
        ServiceEditComponent,
        JobsEditComponent,
        LocationEditComponent,
        UserEditComponent,
        MainEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        EditProfileRoutingModule,
        GeneralModule,
        ReactiveFormsModule
    ],
    exports: [
        MainEditComponent
    ],
    providers: [
        UserServices,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class EditProfileModule { }