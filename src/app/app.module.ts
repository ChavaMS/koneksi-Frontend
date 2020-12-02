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
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserServiceComponent } from './components/user-service/user-service.component';
import { MainInfoComponent } from './components/profile/main-info/main-info.component';
import { LocationComponent } from './components/profile/location/location.component';
import { ActivityComponent } from './components/profile/activity/activity.component';
import { CommentsComponent } from './components/profile/comments/comments.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserJobsComponent } from './components/user-jobs/user-jobs.component';
import { RegisterElectionComponent } from './components/register/register-election/register-election.component';
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { RegisterUserJobsComponent } from './components/register/register-user-jobs/register-user-jobs.component';
import { RegisterJobsComponent } from './components/register/register-jobs/register-jobs.component';
import { RegisterUserProductsComponent } from './components/register/register-user-products/register-user-products.component';
import { RegisterUserServiceComponent } from './components/register/register-user-service/register-user-service.component';

//MAPS
import { AgmCoreModule } from '@agm/core';


//Servicios
import { UserServices } from './services/user.service';
import { InteractionsService } from './services/interactions.service';
import { SearchService } from './services/search.service';
import { ComunicationService } from './services/comunication.service';
import { UserJobsServices } from './services/user.jobs.service';
import { RegisterNumberProductsComponent } from './components/register/register-number-products/register-number-products.component';
import { UserProductsService } from './services/user.products.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProductsComponent,
    UserServiceComponent,
    UserJobsComponent,
    MainInfoComponent,
    LocationComponent,
    ActivityComponent,
    CommentsComponent,
    ContactComponent,
    RegisterElectionComponent,
    RegisterUserComponent,
    RegisterUserJobsComponent,
    RegisterJobsComponent,
    RegisterUserProductsComponent,
    RegisterUserServiceComponent,
    RegisterNumberProductsComponent
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
    InteractionsService,
    SearchService,
    ComunicationService,
    UserJobsServices,
    UserProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
