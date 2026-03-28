import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-setup.html',
  styleUrls: ['./profile-setup.css']
})
export class ProfileSetup {

  currentStep: 1 | 2 = 1;

  // STEP 1
  uploadedFileName = '';
  uploadSuccess = false;
  extractedSkills: string[] = [];
  newSkill = '';

  // STEP 2
  major = '';
  university = 'Princess Sumaya University for Technology';
  gpa = '';
  graduationYear = '';
  experience = '';
  linkedin = '';
  github = '';
  certifications = '';

  universities = [
    'Princess Sumaya University for Technology',
    'University of Jordan',
    'Jordan University of Science and Technology',
    'German Jordanian University',
    'American University of Madaba',
    'Other'
  ];

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadedFileName = file.name;
      // CONNECT TO BACKEND: SEND CV FILE TO AI EXTRACTION API
      // CONNECT TO BACKEND: RECEIVE EXTRACTED SKILLS FROM API RESPONSE
      // SIMULATING EXTRACTION FOR NOW
      setTimeout(() => {
        this.uploadSuccess = true;
        this.extractedSkills = ['SQL', 'MongoDB', 'AWS', 'Docker', 'Machine Learning', 'UI/UX Design'];
      }, 1000);
    }
  }

  removeSkill(skill: string): void {
    this.extractedSkills = this.extractedSkills.filter(s => s !== skill);
  }

  addSkill(): void {
    if (this.newSkill.trim() && !this.extractedSkills.includes(this.newSkill.trim())) {
      this.extractedSkills.push(this.newSkill.trim());
      this.newSkill = '';
    }
  }

  goToStep2(): void {
    this.currentStep = 2;
  }

  goBack(): void {
    this.currentStep = 1;
  }

  completeProfile(): void {
    if (!this.major || !this.university || !this.gpa || !this.graduationYear) {
      alert('Please fill in required fields.');
      return;
    }
    // CONNECT TO BACKEND: SEND COMPLETE PROFILE DATA TO API
    // CONNECT TO BACKEND: SAVE SKILLS, EDUCATION, LINKS TO STUDENT PROFILE
    this.router.navigate(['/student-dashboard']);
  }
}