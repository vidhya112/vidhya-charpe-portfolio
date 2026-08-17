import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Core',
    iconName: 'Layout',
    description: 'Modern component-driven development with strict type safety and modern React patterns.',
    skills: [
      { name: 'React.js', highlight: true, description: '4+ years building enterprise single-page applications and custom hooks' },
      { name: 'TypeScript', highlight: true, description: 'Strict type safety, generic interfaces, and contract integrity' },
      { name: 'JavaScript (ES6+)', highlight: true, description: 'Deep mastery of asynchronous execution, closures, and the event loop' },
      { name: 'React Hooks', highlight: false, description: 'Custom hook architecture, state extraction, and life-cycle isolation' },
      { name: 'React Router', highlight: false, description: 'Client-side routing, protected auth routes, and lazy loaded sub-trees' },
      { name: 'HTML5 & CSS3', highlight: false, description: 'Semantic markup, modern layout models (Grid/Flexbox), and a11y' },
    ],
  },
  {
    id: 'state',
    title: 'State Management',
    iconName: 'Database',
    description: 'Predictable, performant state architectures preventing unnecessary re-renders.',
    skills: [
      { name: 'Redux', highlight: true, description: 'Predictable unidirectional data flow and middleware patterns' },
      { name: 'Redux Toolkit', highlight: true, description: 'Modern slices, createAsyncThunk, and normalized state stores' },
      { name: 'Context API', highlight: false, description: 'Scoped theme, auth, and feature context injection' },
    ],
  },
  {
    id: 'ui',
    title: 'UI & Design Systems',
    iconName: 'Palette',
    description: 'Pixel-perfect, accessible, responsive design systems and component libraries.',
    skills: [
      { name: 'Material UI (MUI)', highlight: true, description: 'Custom enterprise themes, component overrides, and sx styling' },
      { name: 'Tailwind CSS', highlight: true, description: 'Utility-first styling, custom design tokens, and fluid typography' },
      { name: 'Responsive UI', highlight: false, description: 'Mobile-first layouts, adaptive navigation, and container queries' },
      { name: 'Component Systems', highlight: false, description: 'Reusable, composable atomic component libraries' },
    ],
  },
  {
    id: 'architecture',
    title: 'API & Architecture',
    iconName: 'Network',
    description: 'Scalable frontend systems connecting gracefully to enterprise microservices.',
    skills: [
      { name: 'REST APIs', highlight: true, description: 'Robust HTTP integration, request caching, and error resilience' },
      { name: 'Frontend Architecture', highlight: true, description: 'Feature-first folder structures and scalable separation of concerns' },
      { name: 'Microservices Interop', highlight: false, description: 'Handling distributed backend service contracts and data hydration' },
      { name: 'Component-Driven Dev', highlight: false, description: 'Modular UI design isolated from business state layers' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing & Quality',
    iconName: 'ShieldCheck',
    description: 'Guaranteed regression protection and high test confidence.',
    skills: [
      { name: 'Jest', highlight: true, description: 'Automated unit and integration test runner for enterprise suites' },
      { name: 'React Testing Library', highlight: true, description: 'User-centric component assertions and accessible role querying' },
      { name: '85%+ Code Coverage', highlight: true, description: 'Proven standard maintained across production healthcare modules' },
    ],
  },
  {
    id: 'engineering',
    title: 'Performance & Engineering',
    iconName: 'Cpu',
    description: 'Techniques that turned complex interfaces into sub-second, 60fps experiences.',
    skills: [
      { name: 'Performance Optimization', highlight: true, description: 'Delivered 45% measured page load improvement' },
      { name: 'Lazy Loading & Suspense', highlight: false, description: 'On-demand component and asset loading to minimize initial bundle' },
      { name: 'Code Splitting', highlight: false, description: 'Route and vendor-level chunk splitting in Webpack and Vite' },
      { name: 'Memoization (useMemo/useCallback)', highlight: false, description: 'Eliminating wasted render cycles on heavy data lists' },
      { name: 'Service Workers', highlight: false, description: 'Client caching and progressive offline resilience strategies' },
      { name: 'Agile & Scrum', highlight: false, description: 'Active sprint execution, backlog grooming, and 20% velocity boost' },
      { name: 'Code Reviews', highlight: false, description: 'Mentoring, strict PR feedback, and maintainability standards' },
    ],
  },
  {
    id: 'devtools',
    title: 'Dev Tools & CI/CD',
    iconName: 'Wrench',
    description: 'Tooling for continuous integration, code quality, and delivery orchestration.',
    skills: [
      { name: 'GitHub & Git', highlight: true, description: 'Branching strategies, collaborative workflows, and PR reviews' },
      { name: 'Azure Boards & DevOps', highlight: true, description: 'Enterprise work item tracking, sprint planning, and CI/CD pipelines' },
      { name: 'ESLint & Prettier', highlight: false, description: 'Automated linting rules enforcing consistent engineering style' },
      { name: 'SonarQube', highlight: false, description: 'Automated static analysis, code smell detection, and security gates' },
    ],
  },
  {
    id: 'ai',
    title: 'AI-Assisted Development',
    iconName: 'Bot',
    description: 'Leveraging cutting-edge AI paired with critical human engineering judgment.',
    skills: [
      { name: 'Claude', highlight: true, description: 'Architecture exploration, complex refactoring, and edge-case testing' },
      { name: 'GitHub Copilot', highlight: true, description: 'Accelerating boilerplate implementation and repetitive code writing' },
      { name: 'Human Engineering Judgment', highlight: true, description: 'Deciding what should actually ship into production systems' },
    ],
  },
];
