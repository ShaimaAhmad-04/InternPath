export interface Internship {
  id: number;
  companyId: number;
  title: string;
  description?: string;
  postDate: Date;
  submissionDeadline: Date;
  duration?: string;
  location: 'Remote' | 'In-site' | 'Hybrid';
  isPaid: boolean;
  status: boolean; // true = active
}