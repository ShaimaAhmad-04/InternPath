import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Internship } from '../../interfaces/iInternship';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private internships: Internship[] = [
    {
      id: 1, companyId: 1,
      title: 'Full Stack Developer Intern',
      description: 'Join our team to work on cutting-edge web applications using React and Node.js. You will collaborate with experienced developers and gain hands-on experience in modern web development.',
      postDate: new Date('2026-01-15'),
      submissionDeadline: new Date('2026-03-15'),
      duration: '3 months', location: 'Hybrid', isPaid: true, status: true
    },
    {
      id: 2, companyId: 2,
      title: 'UI/UX Design Intern',
      description: 'Design user interfaces for mobile and web applications. Work with our design team to create beautiful and intuitive user experiences.',
      postDate: new Date('2026-01-20'),
      submissionDeadline: new Date('2026-03-20'),
      duration: '2 months', location: 'In-site', isPaid: true, status: true
    },
    {
      id: 3, companyId: 1,
      title: 'DevOps Intern',
      description: 'Learn about cloud infrastructure, CI/CD pipelines, and modern DevOps practices. Experience with AWS preferred.',
      postDate: new Date('2026-01-20'),
      submissionDeadline: new Date('2026-03-25'),
      duration: '4 months', location: 'Remote', isPaid: true, status: true
    },
    {
      id: 4, companyId: 3,
      title: 'Data Science Intern',
      description: 'Work with large datasets and build machine learning models to drive meaningful business insights.',
      postDate: new Date('2026-01-20'),
      submissionDeadline: new Date('2026-04-01'),
      duration: '3 months', location: 'Remote', isPaid: false, status: true
    }
  ];

  private companyNames: Record<number, string> = {
    1: 'TechCorp Solutions',
    2: 'Innovate Jordan',
    3: 'StartUp Hub'
  };

  private internshipSkills: Record<number, string[]> = {
    1: ['React', 'Node.js', 'JavaScript', 'SQL'],
    2: ['UI/UX Design', 'React'],
    3: ['AWS', 'Docker', 'Git'],
    4: ['Python', 'ML', 'SQL']
  };

  private search$ = new BehaviorSubject<string>('');
  private location$ = new BehaviorSubject<string>('All Locations');
  private type$ = new BehaviorSubject<string>('All Types');

  setSearch(val: string) { this.search$.next(val); }
  setLocation(val: string) { this.location$.next(val); }
  setType(val: string) { this.type$.next(val); }

  getCompanyName(companyId: number): string {
    return this.companyNames[companyId] ?? 'Unknown Company';
  }

  getSkills(internshipId: number): string[] {
    return this.internshipSkills[internshipId] ?? [];
  }

  getById(id: number): Internship | undefined {
    return this.internships.find(i => i.id === id);
  }

  getFiltered(): Observable<Internship[]> {
    return combineLatest([this.search$, this.location$, this.type$]).pipe(
      map(([search, location, type]) =>
        this.internships.filter(i => {
          if (!i.status) return false;
          const name = this.getCompanyName(i.companyId);
          const matchSearch = !search ||
            i.title.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase());
          const matchLocation = location === 'All Locations' || i.location === location;
          const matchType = type === 'All Types' ||
            (type === 'Paid' && i.isPaid) ||
            (type === 'Unpaid' && !i.isPaid);
          return matchSearch && matchLocation && matchType;
        })
      )
    );
  }
}