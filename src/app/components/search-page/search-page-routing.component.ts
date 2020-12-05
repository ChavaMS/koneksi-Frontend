import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MainComponent } from './main/main.component';
import { JobsResultComponent } from './jobs-result/jobs-result.component';
import { ProductsResultComponent } from './products-result/products-result.component';
import { ServicesResultComponent } from './services-result/services-result.component';

//import { UserGuard } from '../../services/user.guard';

const searchPageRoutes: Routes = [
    {
        path: 'search-page',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'jobs-result', pathMatch: 'full' },
            { path: 'jobs-result', component: JobsResultComponent},
            { path: 'products-result', component: ProductsResultComponent},
            { path: 'services-result', component: ServicesResultComponent}
        ]
    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(searchPageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SearchPageRoutingModule { }