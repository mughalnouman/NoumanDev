export type Project = { slug: string; title: string; type: string; description: string; image: string; gallery: string[]; tags: string[]; status: string; live?: string; overview: string; features: string[] };
export const projects: Project[] = [
  {
    slug: 'maxout-crm',
    title: 'MaxOutCRM',
    type: 'Multi-tenant CRM',
    description: 'Enterprise multi-tenant cloud CRM (100+ tenants, 1,000+ users) with task tracking, meetings, financial analytics, and Stripe billing.',
    image: 'assets/images/CRM/dashboard.png',
    gallery: [
      'assets/images/CRM/dashboard.png',
      'assets/images/CRM/boardView.png',
      'assets/images/CRM/projects.png',
      'assets/images/CRM/general_tasks.png',
      'assets/images/CRM/messages.png',
      'assets/images/CRM/tasks_issues.png'
    ],
    tags: ['Angular', 'ASP.NET Core', 'ABP Framework', 'SQL Server', 'PrimeNG', 'SignalR', 'RBAC (JWT)', 'Stripe API'],
    status: 'In production',
    live: 'https://app.maxoutcrm.com',
    overview: 'Production multi-tenant enterprise CRM with 100+ active tenants and 1,000+ users. Architected with Angular 17+ and ASP.NET Core (.NET 8) ABP Framework with RBAC, optimized SQL queries (8s → 3s), real-time SignalR chat, and Stripe integrations.',
    features: [
      'Multi-tenant architecture with per-user and per-tenant RBAC permissions',
      'Interactive executive dashboards and user Task Completion Reports',
      'SQL Server query tuning cutting dashboard load time from 8s to 3s',
      'SignalR real-time chat, notifications, and Stripe payment integration'
    ]
  },
  {
    slug: 'eas-inventory',
    title: 'EAS Inventory',
    type: 'Inventory Management',
    description: 'Multi-warehouse inventory platform with executive decision dashboards and dynamic financial statements.',
    image: 'assets/images/easinventory/easinventory.JPG',
    gallery: [
      'assets/images/easinventory/easinventory.JPG',
      'assets/images/easinventory/login.png'
    ],
    tags: ['Angular', 'ASP.NET Core', 'C#', 'SQL Server', 'RxJS'],
    status: 'Completed',
    live: 'https://easinventory.netlify.app/',
    overview: 'An accounting and multi-warehouse inventory management platform built with Angular and ASP.NET Core, deployed and actively utilized by multiple enterprise business clients for real-time item tracking and audit trails.',
    features: [
      'Multi-warehouse stock tracking and client transaction workflows',
      'Dynamic financial statement generation and executive dashboards',
      'High-performance Angular UI powered by RxJS reactive state streams',
      'Relational SQL Server data modeling with comprehensive audit trails'
    ]
  },
  {
    slug: 'eas-sync',
    title: 'EAS Sync',
    type: 'Accounting Integration',
    description: 'High-speed bi-directional accounting synchronization engine linking desktop and cloud accounting data in real time.',
    image: 'assets/images/easync/dashboard.png',
    gallery: [
      'assets/images/easync/dashboard.png',
      'assets/images/easync/quick-actions-reports.png',
      'assets/images/easync/sales-purchase-analysis.png',
      'assets/images/easync/payables-report.png',
      'assets/images/easync/receivables-report.png'
    ],
    tags: ['Angular', 'ASP.NET Core Web API', 'SignalR', 'SQL Server', 'C#'],
    status: 'Completed',
    live: 'https://easync.netlify.app/',
    overview: 'A secure synchronization engine linking desktop and cloud accounting data in real time using ASP.NET Core Web API, SignalR, and SQL Server with live ledger drilldowns, currency metrics, and receivables/payables analytics.',
    features: [
      'Real-time bi-directional data synchronization with SignalR backplane',
      'Secure ASP.NET Core Web APIs for accounting data synchronization',
      'Executive financial dashboard with currency rates and live balances',
      'Granular sales & purchase analysis drilldowns and exportable party ledgers'
    ]
  },
  {
    slug: 'aurum-ecommerce',
    title: 'Aurum E-Commerce',
    type: 'Marketplace Experience',
    description: 'Bilingual collectible marketplace with multi-criteria search filtering, cart flows, and Arabic/English localization.',
    image: 'assets/images/aurum/aurum-App.webp',
    gallery: [
      'assets/images/aurum/aurum-App.webp',
      'assets/images/aurum/ar2.jpg',
      'assets/images/aurum/ar3.jpg',
      'assets/images/aurum/ar6.jpg',
      'assets/images/aurum/ar7.jpg',
      'assets/images/aurum/ar8.jpg'
    ],
    tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    status: 'Completed',
    // live: 'https://aurummb.com',
    overview: 'A high-converting, bilingual e-commerce marketplace built in a 5-member cross-border Agile team with comprehensive Arabic (RTL) and English (LTR) localization.',
    features: [
      'Product catalog and multi-criteria dynamic search filtering',
      'Cart management and responsive multi-step checkout flows',
      'Seamless Arabic (RTL) and English (LTR) localization (i18n)',
      'Mobile-first responsive UI built with React and Tailwind CSS'
    ]
  }
];

export const skills = [
  'Angular',
  'TypeScript',
  '.NET Core',
  'SignalR & WebSockets',
  'Identity & RBAC (JWT)',
  'AI Integration & LLMs',
  'AI Chatbots & Agents',
  'Tailwind CSS',
  'SQL Server',
  'PrimeNG',
  'ABP Framework',
  'Azure',
  'Git',
  'Docker'
];

export const experience = [
  {
    company: 'Karma Software Solutions',
    role: 'Full Stack Developer',
    dates: 'Aug 2025 - Present',
    summary: 'Building MaxOutCRM, a production multi-tenant CRM with 100+ tenants and 1,000+ users.',
    points: [
      'Build Angular interfaces and ASP.NET Core (ABP Framework) REST APIs for task tracking, meeting scheduling, and tenant management in MaxOutCRM (100+ tenants, 1,000+ users)',
      'Delivered interactive analytics dashboards, a per-user Task Completion Report, and custom financial reports used across 100+ tenants',
      'Designed granular role-based access control (RBAC) with JWT authentication, strictly enforcing permissions per user and per tenant',
      'Optimized Microsoft SQL Server schema design and queries, cutting dashboard and report load times from 8 seconds to 3 seconds',
      'Independently shipped complex modules end-to-end, including SignalR real-time chat, notifications, and Stripe payment API integration'
    ]
  },
  {
    company: 'Expert Accounting Software',
    role: 'Angular Developer (Full Stack Contributions)',
    dates: 'Apr 2024 - Jun 2025',
    summary: 'Engineered EAS Inventory Management and EAS Sync App across Angular and ASP.NET Core.',
    points: [
      'Built responsive Angular applications for accounting and multi-warehouse inventory management, actively deployed and used by multiple enterprise clients',
      'Developed secure ASP.NET Core Web APIs for real-time data synchronization in EAS Sync App and automated dynamic financial statement generation',
      'Implemented multi-warehouse stock tracking, client transaction modules, and executive decision-support dashboards with real-time auditability',
      'Integrated RxJS state streaming, SignalR backplane, and optimized SQL Server queries for high-throughput accounting operations'
    ]
  },
  {
    company: 'Aurum Memorabilia, Bahrain',
    role: 'Frontend Developer',
    dates: 'Feb 2024 - Mar 2024',
    summary: 'Developed a bilingual e-commerce collectible marketplace.',
    points: [
      'Built reactive UI components, product catalog, multi-criteria search filters, and cart management with React and Tailwind CSS in a 5-member cross-border Agile team',
      'Delivered seamless Arabic (RTL) and English (LTR) bilingual localization'
    ]
  },
  {
    company: 'Cloudy365 Pvt Ltd',
    role: 'Full Stack Web Developer (Intern)',
    dates: 'Oct 2020 - Jan 2021',
    summary: 'Contributed to enterprise ERP and sales-management interfaces.',
    points: [
      'Built ERP front-end screens and ASP.NET Web API integration for the ESESOL ERP system and its Android sales app',
      'Engineered responsive web interfaces using HTML, CSS, Bootstrap, and JavaScript'
    ]
  }
];
