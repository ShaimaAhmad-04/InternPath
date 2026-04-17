import { Routes } from '@angular/router';
import { Homepage } from './Components/homepage/homepage';
import { RecruiterDashboard } from './Components/recruiter-dashboard/recruiter-dashboard';
import { InternshipListComponent } from './Components/internship-list/internship-list';
import { InternshipDetailComponent } from './Components/internship-detail/internship-detail';
import { LoginComponent } from './Components/login/login';
import { Signup} from './Components/signup/signup';
import { StudentDashboard } from './Components/student-dashboard/student-dashboard';
import { StudentSettings } from './Components/student-settings/student-settings';
import { ProfileSetup } from './Components/profile-setup/profile-setup';

export const routes: Routes = [
  { path: 'homepage', component: Homepage },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'recruiter-dashboard', component: RecruiterDashboard },
  { path: 'internships', component: InternshipListComponent },
  { path: 'internships/:id', component: InternshipDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: Signup},
  { path: 'student-dashboard', component: StudentDashboard },
  { path: 'student-settings', component: StudentSettings },
  { path: 'profile-setup', component: ProfileSetup },
];