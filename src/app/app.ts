import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { Reveal } from './Directives/reveal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, Reveal, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('InternPath');

  isLoggedIn = false;
  userName = 'Sama';
  userInitial = 'S';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const loggedInRoutes = [
          '/student-dashboard',
          '/student-settings',
          '/profile-setup',
          '/internships',
          '/recruiter-dashboard'
        ];
        this.isLoggedIn = loggedInRoutes.some(route =>
          event.urlAfterRedirects.startsWith(route)
        );
      }
    });
  }
}