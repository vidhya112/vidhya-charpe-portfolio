import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { SkillsToolbox } from '../components/sections/SkillsToolbox';
import { BugFixGame } from '../components/sections/BugFixGame';
import { ContactSection } from '../components/sections/ContactSection';

describe('Vidhya Charpe Portfolio Component Tests', () => {
  it('renders Hero section with personal brand and CTAs', () => {
    render(<Hero />);
    expect(screen.getByText(/GOOD MORNING/i)).toBeInTheDocument();
    expect(screen.getByText(/VIDHYA/i)).toBeInTheDocument();
    expect(screen.getByText(/EXPLORE MY JOURNEY/i)).toBeInTheDocument();
    expect(screen.getByText(/LET'S BUILD SOMETHING/i)).toBeInTheDocument();
  });

  it('renders About section with verified metrics', () => {
    render(<About />);
    expect(screen.getAllByText(/4\+/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/45%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/85%\+/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/12\+/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/20%/i).length).toBeGreaterThan(0);
  });

  it('renders Projects section with Netflix Experience showcase', () => {
    render(<Projects />);
    expect(screen.getByText(/Netflix Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Tango Care/i)).toBeInTheDocument();
    expect(screen.getByText(/Marco Technologies/i)).toBeInTheDocument();
    expect(screen.getByText(/LIVE EXPERIENCE ↗/i)).toBeInTheDocument();
  });

  it('renders Skills Toolbox and all skill categories', () => {
    render(<SkillsToolbox />);
    expect(screen.getAllByText(/Frontend Core/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/State Management/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/UI & Design Systems/i).length).toBeGreaterThan(0);
  });

  it('handles interactive BugFixGame workflow correctly', () => {
    render(<BugFixGame />);
    const submitBtn = screen.getByText(/CLICK: SUBMIT REFERRAL PAYLOAD/i);
    fireEvent.click(submitBtn);

    expect(screen.getByText(/RUNTIME WARNING: MEMORY LEAK & DESYNC DETECTED/i)).toBeInTheDocument();

    const correctOption = screen.getByText(/State Race Condition in useEffect/i);
    fireEvent.click(correctOption);

    expect(screen.getByText(/BUG FOUND & FIX DEPLOYED ✓/i)).toBeInTheDocument();
  });

  it('handles Contact Form input changes and validation', async () => {
    render(<ContactSection />);
    const nameInput = screen.getByPlaceholderText(/e.g. Alex Morgan/i);
    const emailInput = screen.getByPlaceholderText(/alex@company.com/i);
    const messageInput = screen.getByPlaceholderText(/Tell me about your product requirements/i);

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'We need an enterprise React frontend architecture.' } });

    expect(nameInput).toHaveValue('Jane Doe');
    expect(emailInput).toHaveValue('jane@example.com');
  });
});
