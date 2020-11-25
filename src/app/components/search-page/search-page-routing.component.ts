import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MainComponent } from './main/main.component';

//import { UserGuard } from '../../services/user.guard';

const searchPageRoutes: Routes = [
    {
        path: 'search-page',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'jobs-result', pathMatch: 'full' }
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