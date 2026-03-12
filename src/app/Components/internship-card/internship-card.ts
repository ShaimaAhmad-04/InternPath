import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Internship } from '../../interfaces/iInternship';
import { InternshipService } from '../internship-list/internship';
import { internship_location } from '../../ENUMs/internship-location';

@Component({
  selector: 'app-internship-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './internship-card.html',
  styleUrls: ['./internship-card.css']
})
export class InternshipCardComponent {
  @Input() internship!: Internship;

  constructor(
    private internshipService: InternshipService,
    private router: Router
  ) {}

  get companyName(): string {
    return this.internshipService.getCompanyName(this.internship.companyId);
  }

  get locationLabel(): string {
    return this.internshipService.getLocationLabel(this.internship.location);
  }

  get locationIcon(): string {
    const icons: Record<number, string> = {
      [internship_location.on_site]: '📋',
      [internship_location.remote]: '🏠',
      [internship_location.hyprid]: '🏢',
    };
    return icons[this.internship.location] ?? '📍';
  }

  get skills(): string[] {
    return this.internshipService.getSkills(this.internship.id);
  }

  get visibleSkills(): string[] {
    return this.skills.slice(0, 3);
  }

  get extraCount(): number {
    return Math.max(0, this.skills.length - 3);
  }

  goToDetail(): void {
    this.router.navigate(['/internships', this.internship.id]);
  }
}