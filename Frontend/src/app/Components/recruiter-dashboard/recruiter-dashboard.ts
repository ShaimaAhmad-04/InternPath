import { ApplicationInitStatus, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Internship } from '../../interfaces/iInternship';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { Application } from '../../interfaces/iapplication';
import { SkillExperience } from '../../ENUMs/skillLevel'
import { skill } from '../../interfaces/iskill';
import { Student } from '../../interfaces/istudent';
import { Status } from '../../ENUMs/applicationStatus';
import { NgxPaginationModule } from 'ngx-pagination';
import { internship_location } from '../../ENUMs/internship-location';
import { InternshipSkill } from '../../interfaces/internshipSkill';


@Component({
  selector: 'recruiter-dashboard',
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule, DatePipe, FormsModule],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css',
})
export class RecruiterDashboard {
  constructor() { }

  @ViewChild('postInternshipModal') postInternshipModal!: ElementRef;
  @ViewChild('skills-input') skillsinput!: ElementRef;
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;


  paginationConfig = { itemsPerPage: 7, currentPage: 1 };
  breadcrumpSectionName: string = "overview";
  applicants: any;
  applicationModalStudent: Student | undefined;
  applicationModalApplication: Application | undefined
  applicationStatus = Status
  locationOptions = Object.entries(internship_location);
  searchSkills: skill[] = [];
  pendingSkills: InternshipSkill[] = [];
  searchQuery: string = '';
  skillsTouched: boolean = false;
  isEditing: boolean = false;
  editingId: number | null = null;


  internship_form = new FormGroup({
    title: new FormControl('', Validators.required),
    companyId: new FormControl(10000, Validators.required),
    description: new FormControl('', Validators.required),
    postDate: new FormControl(new Date(), Validators.required),
    submissionDeadline: new FormControl('', Validators.required),
    duration: new FormControl(),
    location: new FormControl(internship_location.on_site, Validators.required),
    active: new FormControl(0, Validators.required),
    isPaid: new FormControl(0, Validators.required),

  })

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
      phone: "0778899553",
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
      phone: "0778899553",
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
      location: internship_location.hyprid,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 1, level: SkillExperience.Beginner },
        { skillId: 2, level: SkillExperience.Intermediate },
        { skillId: 3, level: SkillExperience.Beginner }
      ]
    },
    {
      id: 2,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: internship_location.hyprid,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 1, level: SkillExperience.Intermediate },
        { skillId: 4, level: SkillExperience.Beginner }
      ]
    },
    {
      id: 3,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: internship_location.on_site,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 2, level: SkillExperience.Beginner },
        { skillId: 5, level: SkillExperience.Intermediate },
        { skillId: 6, level: SkillExperience.Beginner }
      ]
    },
    {
      id: 4,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: internship_location.on_site,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 1, level: SkillExperience.Beginner },
        { skillId: 3, level: SkillExperience.Expert }
      ]
    },
    {
      id: 5,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: internship_location.on_site,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 2, level: SkillExperience.Intermediate },
        { skillId: 4, level: SkillExperience.Beginner },
        { skillId: 7, level: SkillExperience.Beginner }
      ]
    },
    {
      id: 6,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: internship_location.remote,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 1, level: SkillExperience.Expert },
        { skillId: 5, level: SkillExperience.Intermediate }
      ]
    },
    {
      id: 7,
      companyId: 1,
      title: "Frontend Intern",
      description: "Work on Angular projects",
      postDate: new Date("2026-01-01"),
      submissionDeadline: new Date("2026-03-01"),
      duration: "3 months",
      location: internship_location.remote,
      isPaid: true,
      active: true,
      skills: [
        { skillId: 3, level: SkillExperience.Beginner },
        { skillId: 6, level: SkillExperience.Intermediate },
        { skillId: 8, level: SkillExperience.Beginner }
      ]
    },
    {
      id: 8,
      companyId: 2,
      title: "Backend Intern",
      description: "C# and SQL projects",
      postDate: new Date("2026-01-10"),
      submissionDeadline: new Date("2026-03-10"),
      duration: "6 months",
      location: internship_location.remote,
      isPaid: false,
      active: true,
      skills: [
        { skillId: 9, level: SkillExperience.Intermediate },
        { skillId: 10, level: SkillExperience.Beginner },
        { skillId: 7, level: SkillExperience.Expert }
      ]
    }
  ];

  //  applications
  applications: Application[] = [
    { id: 1, studentId: 1, internshipId: 1, status: Status.Pending, matchScore: 90 },
    { id: 2, studentId: 1, internshipId: 2, status: Status.Accepted, matchScore: 80 },
    { id: 3, studentId: 2, internshipId: 1, status: Status.Rejected, matchScore: 30 }
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

    this.applicants = this.students.filter(student => studentIds.includes(student.id));

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

  studentInfo(applicantId: number, application: any) {
    this.applicationModalApplication = application
    const foundStudent = this.applications.find(s => s.id === applicantId);
    this.applicationModalStudent = this.students.find(x => x.id == foundStudent?.id)
  }

  openModal() {
    this.postInternshipModal.nativeElement.Show()
  }
  countPending(applicationId: number): number {
    return this.applications.filter(x => x.internshipId == applicationId && x.status == 0).length ?? 0;
  }

  countAccepted(applicationId: number): number {
    return this.applications.filter(x => x.internshipId == applicationId && x.status == 1).length ?? 0;
  }
  totalApplicants() {
    return this.applications.length ?? 0
  }
  totalPending() {
    return this.applications.filter(x => x.status == 0).length ?? 0
  }
  totalAccepted() {
    return this.applications.filter(x => x.status == 1).length ?? 0
  }
  activeInternships() {
    return this.internships.filter(x => x.active == true).length ?? 0
  }
  searchSkill(query: string) {
    this.searchQuery = query
    this.searchSkills = this.skills.filter(x => x.skill_name.toLowerCase().includes(query.toLowerCase()))
    return this.searchSkills;
  }
  selectSkill(skill: skill) {
    //avoid duplicates
    if (this.pendingSkills?.find(s => s.skillId === skill.skill_id)) return;

    this.pendingSkills.push({
      skillId: skill.skill_id,
      level: SkillExperience.Beginner
    });
    this.searchSkills = [];       // close dropdown
    this.searchQuery = '';        // clear query
    this.skillsinput.nativeElement.value = '';
  }
  addCustomSkill(newSkill: string) {
    if (!newSkill.trim()) return;

    const new_skill: skill = {
      skill_id: this.skills.length + 1,
      skill_name: newSkill.trim()
    };

    this.skills.push(new_skill);
    this.selectSkill(new_skill);

    // extra safety clear
    this.searchQuery = '';
    this.searchSkills = [];
    this.skillsinput.nativeElement.value = '';
  }

  removeSkill(id: number) {
    this.pendingSkills = this.pendingSkills.filter(s => s.skillId !== id);
  }

  getSkillName(id: number): string {
    return this.skills.find(s => s.skill_id === id)?.skill_name ?? 'Unknown';
  }

  clearModal() {
    this.internship_form.reset();
    this.skillsTouched = false;
    this.pendingSkills = [];
    this.searchQuery = '';
    this.searchSkills = [];
    this.isEditing = false;
    this.editingId = null;
    this.postInternshipModal.nativeElement.close;
    this.submitBtn.nativeElement.click()
  }
  postInternship() {
    if (this.internship_form.invalid) return;
    if (this.pendingSkills.length === 0) {
      this.skillsTouched = true;
      return;
    }

    if (this.isEditing && this.editingId !== null) {
      // UPDATE existing internship
      const index = this.internships.findIndex(x => x.id === this.editingId);
      if (index !== -1) {
        this.internships[index] = {
          ...this.internships[index],                          // keep original fields like postDate, id
          title: this.internship_form.value.title!,
          description: this.internship_form.value.description!,
          submissionDeadline: new Date(this.internship_form.value.submissionDeadline!),
          duration: this.internship_form.value.duration!,
          location: this.internship_form.value.location!,
          isPaid: this.internship_form.value.isPaid === 1,
          skills: [...this.pendingSkills]
        };
      }
    } else {
      // CREATE new internship
      const newInternship: Internship = {
        id: this.internships.length + 1,
        companyId: this.internship_form.value.companyId!,
        title: this.internship_form.value.title!,
        description: this.internship_form.value.description!,
        postDate: new Date(),
        submissionDeadline: new Date(this.internship_form.value.submissionDeadline!),
        duration: this.internship_form.value.duration!,
        location: this.internship_form.value.location!,
        active: true,
        isPaid: this.internship_form.value.isPaid === 1,
        skills: [...this.pendingSkills]
      };
      this.internships.push(newInternship);
    }

    this.clearModal();
  }

  editInternship(internship: Internship) {
    this.internship_form.patchValue({
      title: internship.title,
      description: internship.description,
      submissionDeadline: internship.submissionDeadline.toISOString().split('T')[0],
      duration: internship.duration,
      location: internship.location,
      isPaid: internship.isPaid ? 1 : 0,
      companyId: internship.companyId,
      postDate: internship.postDate
    });

    this.pendingSkills = [...internship.skills];
  }
  deleteInternship(internship_id: number) {
    this.internships = this.internships.filter(x => x.id !== internship_id);
  }
}

