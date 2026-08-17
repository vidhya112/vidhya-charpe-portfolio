import { logAnalyticsEvent } from './firebase';

export interface AnalyticsSummary {
  totalPageViews: number;
  projectViews: Record<string, number>;
  resumeDownloads: number;
  githubClicks: number;
  linkedinClicks: number;
  coffeeClicks: number;
  contactStarts: number;
  contactSubmissions: number;
}

const LOCAL_ANALYTICS_KEY = 'vidhya_portfolio_analytics';

function getLocalAnalytics(): AnalyticsSummary {
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    totalPageViews: 142,
    projectViews: {
      'netflix-experience': 94,
      'tango-care': 78,
      'marco-technologies': 65,
    },
    resumeDownloads: 19,
    githubClicks: 34,
    linkedinClicks: 28,
    coffeeClicks: 12,
    contactStarts: 15,
    contactSubmissions: 6,
  };
}

function updateLocalAnalytics(updater: (current: AnalyticsSummary) => void) {
  try {
    const current = getLocalAnalytics();
    updater(current);
    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }
}

export function trackPageView(pageName: string = 'home') {
  try {
    logAnalyticsEvent('page_view', { page_name: pageName });
    updateLocalAnalytics((data) => {
      data.totalPageViews += 1;
    });
  } catch {
    // Analytics failures must never break the user experience
  }
}

export function trackProjectView(projectId: string, projectTitle: string) {
  try {
    logAnalyticsEvent('project_view', { project_id: projectId, project_title: projectTitle });
    updateLocalAnalytics((data) => {
      data.projectViews[projectId] = (data.projectViews[projectId] || 0) + 1;
    });
  } catch {
    // Silent catch
  }
}

export function trackProjectDemoClick(projectId: string, url: string) {
  try {
    logAnalyticsEvent('project_live_demo_click', { project_id: projectId, url });
  } catch {
    // Silent catch
  }
}

export function trackExternalLink(type: 'github' | 'linkedin' | 'email' | 'netflix_demo', destination: string) {
  try {
    logAnalyticsEvent('external_link_click', { link_type: type, destination });
    updateLocalAnalytics((data) => {
      if (type === 'github') data.githubClicks += 1;
      if (type === 'linkedin') data.linkedinClicks += 1;
    });
  } catch {
    // Silent catch
  }
}

export function trackResumeDownload() {
  try {
    logAnalyticsEvent('resume_download', { format: 'pdf' });
    updateLocalAnalytics((data) => {
      data.resumeDownloads += 1;
    });
  } catch {
    // Silent catch
  }
}

export function trackResumeView() {
  try {
    logAnalyticsEvent('resume_view', { source: 'portfolio_modal' });
  } catch {
    // Silent catch
  }
}

export function trackContactStarted() {
  try {
    logAnalyticsEvent('contact_form_started', { timestamp: Date.now() });
    updateLocalAnalytics((data) => {
      data.contactStarts += 1;
    });
  } catch {
    // Silent catch
  }
}

export function trackContactSubmitted(projectType: string) {
  try {
    logAnalyticsEvent('contact_form_submitted', { project_type: projectType });
    updateLocalAnalytics((data) => {
      data.contactSubmissions += 1;
    });
  } catch {
    // Silent catch
  }
}

export function trackCoffeeClick() {
  try {
    logAnalyticsEvent('buy_me_a_coffee_click', { timestamp: Date.now() });
    updateLocalAnalytics((data) => {
      data.coffeeClicks += 1;
    });
  } catch {
    // Silent catch
  }
}

export function trackSkillsInteraction(skillCategory: string) {
  try {
    logAnalyticsEvent('skills_interaction', { category: skillCategory });
  } catch {
    // Silent catch
  }
}

export function trackJourneyInteraction(milestoneYear: string) {
  try {
    logAnalyticsEvent('journey_interaction', { milestone: milestoneYear });
  } catch {
    // Silent catch
  }
}

export function trackCommandPaletteOpened() {
  try {
    logAnalyticsEvent('command_palette_opened', { timestamp: Date.now() });
  } catch {
    // Silent catch
  }
}

export function getAnalyticsData(): AnalyticsSummary {
  return getLocalAnalytics();
}
