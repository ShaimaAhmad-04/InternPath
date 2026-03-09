import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Internship } from '../../interfaces/iInternship';
import { InternshipService } from '../internship-list/internship';

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

  get skills(): string[] {
    return this.internshipService.getSkills(this.internship.id);
  }

  get visibleSkills(): string[] {
    return this.skills.slice(0, 3);
  }

  get extraCount(): number {
    return Math.max(0, this.skills.length - 3);
  }

  get locationIcon(): string {
    const icons: Record<string, string> = {
      'Hybrid': '🏢', 'In-site': '📋', 'Remote': '🏠'
    };
    return icons[this.internship.location] ?? '📍';
  }

  goToDetail(): void {
    this.router.navigate(['/internships', this.internship.id]);
  }
}