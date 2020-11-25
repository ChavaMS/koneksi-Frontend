import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//CUSTOM MODULE
import { SearchPageModule } from './components/search-page/search-page.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserServiceComponent } from './components/user-service/user-service.component';
import { MainInfoComponent } from './components/profile/main-info/main-info.component';
import { LocationComponent } from './components/profile/location/location.component';
import { ActivityComponent } from './components/profile/activity/activity.component';
import { CommentsComponent } from './components/profile/comments/comments.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserJobsComponent } from './components/user-jobs/user-jobs.component';


//Servicios
import { UserServices } from './services/user.service';
import { InteractionsService } from './services/interactions.service';

//MAPS
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserProductsComponent,
    UserServiceComponent,
    UserJobsComponent,
    MainInfoComponent,
    LocationComponent,
    ActivityComponent,
    CommentsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgRN1AR5CnGjgdcc3f93CzMho80a2yWog'
    }),
    SearchPageModule
  ],
  providers: [
    appRoutingProviders,
    UserServices,
    InteractionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
