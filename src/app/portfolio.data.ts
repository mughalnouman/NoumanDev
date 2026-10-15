export type Project = { slug:string; title:string; type:string; description:string; image:string; gallery:string[]; tags:string[]; status:string; live?:string; overview:string; features:string[] };
export const projects: Project[] = [
  {
    slug: 'maxout-crm',
    title: 'MaxOutCRM',
    type: 'Multi-tenant CRM',
    description: 'Enterprise CRM for task tracking, meetings, analytics, reporting and role-based access.',
    image: 'assets/images/CRM/dashboard.png',
    gallery: [
      'assets/images/CRM/dashboard.png',
      'assets/images/CRM/boardView.png',
      'assets/images/CRM/projects.png',
      'assets/images/CRM/general_tasks.png',
      'assets/images/CRM/messages.png',
      'assets/images/CRM/tasks_issues.png'
    ],
    tags: ['Angular', 'ASP.NET Core', 'ABP Framework', 'SQL Server'],
    status: 'In production',
    live: 'https://app.maxoutcrm.com',
    overview: 'A responsive multi-tenant CRM platform supporting enterprise operations with structured task tracking, calendar management, and executive analytics.',
    features: ['Interactive analytics dashboards', 'Custom financial reporting', 'Role-based access control (RBAC)', 'Real-time chat and notifications']
  },
  {
    slug: 'eas-inventory',
    title: 'EAS Inventory',
    type: 'Inventory Management',
    description: 'Multi-warehouse inventory system with executive dashboards and financial statements.',
    image: 'assets/images/easinventory/easinventory.JPG',
    gallery: ['assets/images/easinventory/easinventory.JPG'],
    tags: ['Angular', '.NET Core', 'SQL Server'],
    status: 'Completed',
    overview: 'An accounting and inventory management platform designed for multi-location businesses, real-time item tracking, and transaction audit trails.',
    features: ['Multi-warehouse inventory tracking', 'Client transaction workflows', 'Dynamic financial statements', 'Executive decision-support dashboards']
  },
  {
    slug: 'eas-sync',
    title: 'EAS Sync',
    type: 'Accounting Integration',
    description: 'Real-time synchronization application for secure accounting workflows.',
    image: 'assets/images/easync/easync.JPG',
    gallery: ['assets/images/easync/easync.JPG'],
    tags: ['Angular', 'SignalR', 'SQL Server'],
    status: 'Completed',
    overview: 'A secure synchronization engine linking desktop and cloud accounting data in real time with high availability.',
    features: ['Real-time synchronization', 'Secure API integrations', 'Responsive Angular user experience', 'Operational reporting workflows']
  },
  {
    slug: 'aurum-ecommerce',
    title: 'Aurum E-Commerce',
    type: 'Marketplace Experience',
    description: 'Bilingual collectible marketplace with filtering, cart and localization.',
    image: 'assets/images/aurum/aurum-App.webp',
    gallery: [
      'assets/images/aurum/aurum-App.webp',
      'assets/images/aurum/ar2.jpg',
      'assets/images/aurum/ar3.jpg',
      'assets/images/aurum/ar6.jpg',
      'assets/images/aurum/ar7.jpg',
      'assets/images/aurum/ar8.jpg'
    ],
    tags: ['React', 'Tailwind CSS', 'i18n'],
    status: 'Completed',
    live: 'https://aurummb.com',
    overview: 'A high-converting, bilingual e-commerce marketplace built in a cross-border agile team with comprehensive localization.',
    features: ['Product catalog and dynamic search filtering', 'Cart management and checkout', 'Arabic and English localization (i18n)', 'Mobile-first responsive UX']
  }
];

export const skills = ['Angular', 'TypeScript', '.NET Core', 'Tailwind CSS', 'SQL Server', 'PrimeNG', 'ABP Framework', 'Azure', 'Git', 'Docker'];

export const experience = [
  {
    company: 'Karma Software Solutions',
    role: 'Full Stack Developer',
    dates: 'Aug 2024 - Present',
    summary: 'Developing MaxOutCRM, an enterprise multi-tenant cloud CRM.',
    points: [
      'Engineered Angular and PrimeNG frontend architecture for modular enterprise modules',
      'Designed ASP.NET Core & ABP Framework RESTful APIs with JWT security & RBAC',
      'Created real-time notification, messaging, and activity feeds using SignalR',
      'Optimized SQL Server schema, queries, and stored procedures for fast reporting'
    ]
  },
  {
    company: 'Expert Accounting Software',
    role: 'Full Stack Web Developer',
    dates: 'Apr 2024 - Jun 2025',
    summary: 'Built EAS Inventory Management and EAS Sync applications.',
    points: [
      'Developed responsive Angular applications styled with Tailwind CSS and Bootstrap',
      'Integrated secure ASP.NET Core API endpoints for multi-location inventory operations',
      'Engineered dynamic financial dashboards and executive transaction statements',
      'Implemented real-time data synchronization utilizing SignalR'
    ]
  },
  {
    company: 'Aurum Memorabilia, Bahrain',
    role: 'Frontend Developer',
    dates: 'Feb 2024 - Mar 2024',
    summary: 'Developed a bilingual e-commerce collectible marketplace.',
    points: [
      'Built reactive UI components with React and Tailwind CSS',
      'Implemented product catalogs, live search filters, and cart flows',
      'Delivered seamless Arabic (RTL) and English (LTR) localization'
    ]
  },
  {
    company: 'Cloudy365 Pvt Ltd',
    role: 'Full Stack Web Developer Intern',
    dates: 'Oct 2020 - Jan 2021',
    summary: 'Contributed to enterprise ERP and sales-management interfaces.',
    points: [
      'Engineered responsive web interfaces using HTML, CSS, Bootstrap and JavaScript',
      'Connected frontend views to ASP.NET Web API endpoints',
      'Designed and improved Android sales-management user screens'
    ]
  }
];
