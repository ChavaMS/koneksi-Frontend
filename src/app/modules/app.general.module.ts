//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//MAPS
import { AgmCoreModule } from '@agm/core';

//Componentes
import { LocationComponent } from '../components/profile/location/location.component';



@NgModule({
    declarations: [
        LocationComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDgRN1AR5CnGjgdcc3f93CzMho80a2yWog'
        }),
    ],
    exports: [
        LocationComponent
    ],
    providers: [
    ]
})
export class GeneralModule { }