import { internship_location } from '../ENUMs/internship-location';

export interface Internship {
  id: number;
  companyId: number;
  title: string;
  description?: string;
  postDate: Date;
  submissionDeadline: Date;
  duration?: string;
  location: internship_location;
  active: boolean;
  isPaid: boolean;
}