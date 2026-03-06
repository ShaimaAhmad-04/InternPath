import { RouterLink, Routes } from '@angular/router';
import { Homepage } from './Components/homepage/homepage';
import { RecruiterDashboard } from './Components/recruiter-dashboard/recruiter-dashboard';

export const routes: Routes = [
    {path:'homepage', component : Homepage},
    {path:"", redirectTo:"homepage",pathMatch: "full"},
    {path:"recruiter-dashboard", component:RecruiterDashboard}
];
