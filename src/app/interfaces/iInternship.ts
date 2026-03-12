import { InternshipSkill } from './internshipSkill'
export interface Internship {
  id: number;
  companyId: number;
  title: string;
  description?: string;
  postDate: Date;
  submissionDeadline: Date;
  duration?: string;
  location: number;
  active: boolean;
  isPaid: boolean;
  skills: InternshipSkill[];
}