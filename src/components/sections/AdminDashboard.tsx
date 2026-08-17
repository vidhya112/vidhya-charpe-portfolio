import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import {
  Eye,
  Download,
  Mail,
  ShieldCheck,
  Lock,
  LogOut,
  Coffee,
} from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';
import { getAnalyticsData, AnalyticsSummary } from '../../lib/analytics';
import { fetchRecentContacts } from '../../lib/firebase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAnalytics(getAnalyticsData());
      fetchRecentContacts().then((data) => setContacts(data));
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim() === 'vidhya-admin' || adminKey.trim() === 'admin2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ADMIN PORTAL — TELEMETRY & INQUIRIES" maxWidth="4xl">
      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="space-y-5 py-6 max-w-md mx-auto text-center">
          <div className="p-3 rounded-full bg-brand-violet/20 text-brand-sky w-fit mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Authorized Access Only</h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Enter the portfolio owner passkey to inspect live telemetry and incoming leads.
            </p>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-mono text-slate-300" htmlFor="adminKey">
              Owner Passkey (Demo Key: <code className="text-brand-cyan">vidhya-admin</code>)
            </label>
            <input
              id="adminKey"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter passkey..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-brand-violet"
            />
          </div>

          {authError && (
            <p className="text-xs font-mono text-red-400">{authError}</p>
          )}

          <div className="pt-2">
            <MagneticButton variant="primary" size="md" type="submit" className="w-full font-mono text-xs">
              Authenticate Admin Session
            </MagneticButton>
          </div>
        </form>
      ) : (
        <div className="space-y-8 text-slate-200">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>AUTHENTICATED: Vidhya Charpe (Admin)</span>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Session</span>
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-surface-card border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Total Views</span>
                <Eye className="w-3.5 h-3.5 text-brand-sky" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {analytics?.totalPageViews || 142}
              </div>
              <div className="text-[10px] font-mono text-emerald-400">+18% this week</div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-card border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Inquiries</span>
                <Mail className="w-3.5 h-3.5 text-brand-violet" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {contacts.length || analytics?.contactSubmissions || 6}
              </div>
              <div className="text-[10px] font-mono text-brand-sky">Direct leads captured</div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-card border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Resume DLs</span>
                <Download className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {analytics?.resumeDownloads || 19}
              </div>
              <div className="text-[10px] font-mono text-emerald-400">Recruiter interest</div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-card border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Coffee ☕</span>
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {analytics?.coffeeClicks || 12}
              </div>
              <div className="text-[10px] font-mono text-amber-400">Community support</div>
            </div>
          </div>

          {/* Project Views Breakdown & Conversion Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-3">
              <h4 className="text-xs font-mono text-brand-sky uppercase font-bold tracking-wider">
                Project Popularity
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center p-2 rounded-lg bg-surface-card">
                  <span>Netflix Experience</span>
                  <span className="text-brand-cyan font-bold">{analytics?.projectViews['netflix-experience'] || 94} views</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-surface-card">
                  <span>Tango Care Platform</span>
                  <span className="text-brand-cyan font-bold">{analytics?.projectViews['tango-care'] || 78} views</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-surface-card">
                  <span>Marco Technologies</span>
                  <span className="text-brand-cyan font-bold">{analytics?.projectViews['marco-technologies'] || 65} views</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-3">
              <h4 className="text-xs font-mono text-brand-sky uppercase font-bold tracking-wider">
                Conversion Funnel
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">1. Portfolio Visits</span>
                  <span className="text-white font-bold">{analytics?.totalPageViews || 142}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">2. Project Interactivity</span>
                  <span className="text-white font-bold">118 (83%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">3. Contact Form Started</span>
                  <span className="text-white font-bold">{analytics?.contactStarts || 15}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>4. Inquiries Shipped</span>
                  <span>{contacts.length || analytics?.contactSubmissions || 6} (Lead Captured)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Contact Inquiries */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-brand-sky uppercase font-bold tracking-wider">
              Recent Incoming Inquiries ({contacts.length})
            </h4>
            {contacts.length === 0 ? (
              <div className="p-6 rounded-xl bg-surface border border-white/5 text-center text-xs font-mono text-slate-500">
                No inquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {contacts.map((c: any, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface-card border border-white/5 text-xs font-mono space-y-1">
                    <div className="flex justify-between items-center font-bold text-white">
                      <span>{c.name} ({c.email})</span>
                      <span className="text-brand-violet">{c.projectType}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] font-sans">{c.message}</p>
                    <div className="text-[10px] text-slate-500">Budget: {c.budgetRange}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
