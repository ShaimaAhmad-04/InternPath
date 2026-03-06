import { ApplicationInitStatus, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Internship } from '../../interfaces/iInternship';
import { DatePipe, CommonModule } from '@angular/common';
import { Application } from '../../interfaces/iapplication';
import { SkillExperience } from '../../ENUMs/skillLevel'
import { skill } from '../../interfaces/iskill';
import { Student } from '../../interfaces/istudent';
import { Status } from '../../ENUMs/applicationStatus';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'recruiter-dashboard',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css',
})
export class RecruiterDashboard {

  @ViewChild('applcationModal') applcationModal!: ElementRef; 

  paginationConfig = { itemsPerPage: 7, currentPage: 1 };
  breadcrumpSectionName: string = "overview";
  applicants : any ;
  // skils
  skills: skill[] = [
    { skill_id: 1, skill_name: "Angular" },
    { skill_id: 2, skill_name: "SQL" },
    { skill_id: 3, skill_name: "C#" },
    { skill_id: 4, skill_name: "Flutter" }
  ];

  //  students
  students: Student[] = [
    {
      id: 1,
      first_name: "Ahmad Khaled",
      email: "ahmad.khaled@example.com",
      password: "",
      role: "student",
      major: "Computer Science",
      university: "University of Jordan",
      experience: "Internship at TechSoft",
      gpa: 88,
      graduationYear: 2026,
      linkedInUrl: "https://linkedin.com/in/ahmadkhaled",
      gitHubUrl: "https://github.com/ahmadkhaled",
      certifications: ["Angular Basics", "SQL Fundamentals"],
      cvUrl: "https://example.com/cv/ahmad.pdf",
      studentSkills: [
        { skill_id: 1, studentId: 1, experience: SkillExperience.Expert },
        { skill_id: 2, studentId: 1, experience: SkillExperience.Intermediate },
        { skill_id: 3, studentId: 1, experience: SkillExperience.Beginner, }
      ]
    },
    {
      id: 2,
      first_name: "Sara Mahmoud",
      email: "sara.mahmoud@example.com",
      password: "",
      role: "student",
      major: "Software Engineering",
      university: "Princess Sumaya University",
      experience: null,
      gpa: 92,
      graduationYear: 2025,
      linkedInUrl: "https://linkedin.com/in/saramahmoud",
      gitHubUrl: null,
      certifications: ["C# Programming"],
      cvUrl: null,
      studentSkills: [
        { skill_id: 1, studentId: 2, experience: SkillExperience.Intermediate },
        { skill_id: 4, studentId: 2, experience: SkillExperience.Expert }
      ]
    }
  ];

  //  internships
  internships: Internship[] = [
    {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },
      {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },  {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },  {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },  {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },  {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },  {
      id: 1,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: "Remote",
      isPaid: true,
      status: true
    },
    {
      id: 2,
      companyId: 2,
      title: "Backend Intern",
      description: "C# and SQL projects",
      postDate: new Date("2026-01-10"),
      submissionDeadline: new Date("2026-03-10"),
      duration: "6 months",
      location: "In-site",
      isPaid: false,
      status: true
    }
  ];

  //  applications
  applications: Application[] = [
    { id: 1, studentId: 1, internshipId: 1, status: Status.Pending },
    { id: 2, studentId: 1, internshipId: 2, status: Status.Accepted },
    { id: 3, studentId: 2, internshipId: 1, status: Status.Rejected }
  ];


  setSection(sectionName: string): void {
    this.breadcrumpSectionName = sectionName
  }

  // Get internship title
  getInternshipName(internshipId: number): string {
    return this.internships.find(i => i.id === internshipId)?.title ?? 'Unknown';
  }

  // Get students for a specific internship
  getApplicants(internshipId: number): Student[] {
    const studentIds = this.applications
      .filter(app => app.internshipId === internshipId)
      .map(app => app.studentId);

    this.applicants  = this.students.filter(student => studentIds.includes(student.id));

    return this.applicants
  }

  // Get the status of a specific student for a specific internship
  getApplicationStatusForStudent(studentId: number, internshipId: number): string {
    const application = this.applications.find(
      app => app.studentId === studentId && app.internshipId === internshipId
    );
    return application ? Status[application.status] : Status[0];
  }
  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber
  }

  studentInfo(applicantId:number){
   let student = this.applications.find(student => student.id == applicantId)
  }

  openModal(){
    this.applcationModal.nativeElement.Show()
  }
}
