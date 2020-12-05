//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { MomentModule } from 'angular2-moment'

//Rutas
import { SearchPageRoutingModule } from './search-page-routing.component';

//Componentes
import { MainComponent } from './main/main.component';
import { JobsResultComponent } from './jobs-result/jobs-result.component';
import { ProductsResultComponent } from './products-result/products-result.component';
import { ServicesResultComponent } from './services-result/services-result.component';

//Servicios
import { UserServices } from '../../services/user.service';

//import { UserGuard } from '../../services/user.guard';

@NgModule({
    declarations: [
        MainComponent,
        JobsResultComponent,
        ProductsResultComponent,
        ServicesResultComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SearchPageRoutingModule
    ],
    exports: [
        MainComponent
    ],
    providers: [
        UserServices
    ]
})
export class SearchPageModule {}