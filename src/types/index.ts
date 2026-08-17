export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  role: string;
  timeline: string;
  highlights: string[];
  challenges?: string[];
  decisions?: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'Enterprise' | 'Exploration' | 'Healthcare' | 'Open Source';
  imagePlaceholderText: string;
  accentColor: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
    description?: string;
  }[];
}

export interface TimelineMilestone {
  year: string;
  period?: string;
  title: string;
  organization?: string;
  role?: string;
  location?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: 'education' | 'career';
}

export interface DailyScheduleStep {
  time: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  iconName: string;
  codeSnippet?: string;
  techTags: string[];
}

export interface WorkflowStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deepDive: string;
  practices: string[];
  iconName: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  honeypot?: string;
}

export interface AnalyticsEventPayload {
  eventName: string;
  category?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
  timestamp?: number;
}
