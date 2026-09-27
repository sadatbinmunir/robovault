export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  role: string;
  label?: string; // e.g. "Research supervisor", "Leader 1", "Leader 2", "Member 1", "Member 2", "Member 3"
  department: string;
  university: string;
  bio: string;
  quote?: string;
  major?: string;
  phone?: string;
  researchArea?: string;
  themeColor?: 'gold' | 'red-primary' | 'red-secondary' | 'green';
  avatarUrl?: string;
  skills: string[];
  pdfUrl?: string;
  reviewedPapers?: {
    title: string;
    authors?: string;
    year?: number;
    source?: string;
    url?: string;
  }[];
  links: {
    github?: string;
    linkedin?: string;
    researchgate?: string;
    portfolio?: string;
    email?: string;
    phone?: string;
  };
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document' | 'code';
  title: string;
  url: string;
  caption: string;
  thumbnail?: string;
}

export interface TimelineWeek {
  id: string;
  weekNumber: number;
  title: string;
  dateRange: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  summary: string;
  fullContent: string;
  tags: string[];
  mediaItems: MediaItem[];
  deliverables: { task: string; completed: boolean }[];
  keyLearnings?: string;
  nextWeekGoals?: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: 'Microcontroller' | 'Sensor' | 'Actuator' | 'Power' | 'Mechanical' | 'Communication';
  specs: string;
  quantity: number;
  status: 'Acquired' | 'Testing' | 'Integrated' | 'Pending';
  purpose: string;
  datasheetUrl?: string;
}

export interface LiteratureItem {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: string;
  keyFindings: string;
  relevanceToProject: string;
  doi?: string;
}

export interface MemberContribution {
  memberId: string;
  memberName: string;
  studentId?: string;
  role?: string;
  primarySubsystem?: string;
  subsystem?: string;
  responsibilities?: string[];
  weeklyCommitments?: string[];
  percentage: number;
  recentDeliverables?: string[];
  deliverables?: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
  officeHours?: string;
  labLocation?: string;
}

export interface SiteConfig {
  projectName: string;
  projectCode: string;
  classCourse: string;
  department: string;
  university: string;
  supervisor: {
    title: string;
    name: string;
    designation: string;
    department: string;
    note: string;
  };
  shortTagline: string;
  abstract: string;
  contact: ContactInfo;
}
