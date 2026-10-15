import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { projects, skills } from './portfolio.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- HERO SECTION WITH DYNAMIC HEADLINE & LIVE CODE TERMINAL -->
    <section id="home" class="hero section">
      <div class="hero-copy reveal">
        <div class="eyebrow-row">
          <span class="eyebrow available"><i></i> Available for full-time & contracts</span>
          <span class="location-badge">📍 Lahore, Pakistan (Remote Ready)</span>
        </div>

        <p class="mini-name">Hello, I'm <strong>Nouman Ahmad</strong></p>
        
        <h1 class="hero-heading">
          Full Stack Engineer<br>
          <span class="typewriter-container">
            <em>{{ currentRoleText }}</em><span class="typewriter-cursor">|</span>
          </span>
        </h1>

        <p class="lead">
          Architecting high-performance enterprise platforms, multi-tenant CRMs, and real-time distributed systems using 
          <strong>Angular 19, ASP.NET Core & SQL Server.</strong>
        </p>

        <div class="hero-buttons">
          <a class="primary glow-btn" routerLink="/projects">Explore Architecture & Projects <span>→</span></a>
          <a class="secondary" href="assets/documents/NoumanAhmad_FullStack.pdf" download>↓ Download CV</a>
        </div>

        <div class="stats">
          <div><b>2+</b><span>Years Experience</span></div>
          <div><b>10+</b><span>Projects Built</span></div>
          <div><b>99.9%</b><span>Architecture Reliability</span></div>
        </div>
      </div>

      <!-- INTERACTIVE FULL STACK CONSOLE & 3D ART -->
      <div class="hero-visual hero-workstation">
        <div class="scene-grid"></div>
        <div class="hero-rings"></div>
        <div class="hero-spark spark-one"></div>
        <div class="hero-spark spark-two"></div>
        
        <!-- Interactive Live Code Terminal Widget -->
        <div class="interactive-terminal">
          <div class="terminal-bar">
            <div class="term-dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <span class="term-title">nouman-core-api.cs — ASP.NET & Angular</span>
            <span class="term-status">● Live</span>
          </div>
          <div class="terminal-body">
            <p class="term-line"><span class="t-kw">namespace</span> <span class="t-type">Enterprise.Architecture</span> &#123;</p>
            <p class="term-line indent"><span class="t-kw">public record</span> <span class="t-func">DeveloperProfile</span>(</p>
            <p class="term-line indent-2"><span class="t-str">"Nouman Ahmad"</span>, <span class="t-str">"Full Stack Specialist"</span>,</p>
            <p class="term-line indent-2"><span class="t-prop">Frontend:</span> <span class="t-str">"Angular 19 + TypeScript + PrimeNG"</span>,</p>
            <p class="term-line indent-2"><span class="t-prop">Backend:</span> <span class="t-str">"ASP.NET Core + ABP + SignalR"</span>,</p>
            <p class="term-line indent-2"><span class="t-prop">Database:</span> <span class="t-str">"SQL Server (Clean Architecture)"</span></p>
            <p class="term-line indent">);</p>
            <p class="term-line"><span class="t-comment">// HTTP 200 OK — Ready for Production Scale</span></p>
          </div>
        </div>

        <img class="workstation-art" src="assets/images/hero-section.png" alt="Neon developer workstation">
        <span class="float-tag angular">▲ Angular 19</span>
        <span class="float-tag dotnet">.NET Core & C#</span>
        <span class="float-tag sql">▣ SQL Server</span>
        <span class="float-tag clean">Clean Architecture<br>SignalR Real-Time<br>JWT & RBAC Security</span>
      </div>
    </section>

    <!-- LIVE TECH MARQUEE -->
    <section class="marquee" aria-label="Technology stack">
      <div class="marquee-track">
        <div class="tech-pill" *ngFor="let item of marqueeTech.concat(marqueeTech)">
          <img [src]="item.icon" [alt]="item.name + ' logo'">
          {{ item.name }}
        </div>
      </div>
    </section>

    <!-- FULL STACK ARCHITECTURE BLUEPRINT SECTION -->
    <section class="architecture-section section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Enterprise Ready</span>
          <h2>How I <em>Architect Solutions</em></h2>
        </div>
        <p class="section-subtitle">Bridging resilient backend microservices with sleek, reactive frontend interfaces.</p>
      </div>

      <div class="arch-tabs">
        <button [class.active]="activeArchTab === 'frontend'" (click)="activeArchTab = 'frontend'">
          <span>01.</span> Frontend Architecture
        </button>
        <button [class.active]="activeArchTab === 'backend'" (click)="activeArchTab = 'backend'">
          <span>02.</span> Backend & APIs
        </button>
        <button [class.active]="activeArchTab === 'database'" (click)="activeArchTab = 'database'">
          <span>03.</span> Database & Cloud
        </button>
      </div>

      <div class="arch-card" [ngSwitch]="activeArchTab">
        <!-- Frontend Tab -->
        <div *ngSwitchCase="'frontend'" class="arch-content">
          <div class="arch-text">
            <h3>Component-Driven & Reactive Frontends</h3>
            <p>
              I build enterprise-grade SPAs utilizing <strong>Angular (Signals & RxJS)</strong>, structured into reusable feature modules, lazy-loaded routing, and optimized change detection.
            </p>
            <ul class="arch-points">
              <li><strong>Modern UI Kits:</strong> Pixel-perfect implementation with PrimeNG, Tailwind CSS, and custom design tokens.</li>
              <li><strong>Real-Time Sync:</strong> Integrated WebSocket and SignalR hubs for instant notifications and live state updates.</li>
              <li><strong>Security:</strong> Client-side route guards, HTTP interceptors with automatic JWT token refresh.</li>
            </ul>
          </div>
          <div class="arch-badge-panel">
            <span class="arch-pill">Angular 19</span>
            <span class="arch-pill">TypeScript</span>
            <span class="arch-pill">PrimeNG</span>
            <span class="arch-pill">Tailwind CSS</span>
            <span class="arch-pill">RxJS & Signals</span>
            <span class="arch-pill">React</span>
          </div>
        </div>

        <!-- Backend Tab -->
        <div *ngSwitchCase="'backend'" class="arch-content">
          <div class="arch-text">
            <h3>Clean Architecture & Resilient REST APIs</h3>
            <p>
              Applying <strong>SOLID principles</strong> and <strong>Clean Architecture</strong> in ASP.NET Core with decoupled layers: Domain, Application, Infrastructure, and API.
            </p>
            <ul class="arch-points">
              <li><strong>Multi-Tenant CRM & ERP:</strong> Domain-driven design with ABP Framework, CQRS, and global tenant filters.</li>
              <li><strong>Security & RBAC:</strong> Granular permissions, role-based claims, and encrypted authentication tokens.</li>
              <li><strong>Real-Time Communication:</strong> SignalR backplane for multi-user sync and background jobs.</li>
            </ul>
          </div>
          <div class="arch-badge-panel">
            <span class="arch-pill">ASP.NET Core</span>
            <span class="arch-pill">C# & LINQ</span>
            <span class="arch-pill">ABP Framework</span>
            <span class="arch-pill">SignalR</span>
            <span class="arch-pill">Clean Architecture</span>
            <span class="arch-pill">JWT & RBAC</span>
          </div>
        </div>

        <!-- Database Tab -->
        <div *ngSwitchCase="'database'" class="arch-content">
          <div class="arch-text">
            <h3>Relational Data Modeling & Cloud Deployment</h3>
            <p>
              Structuring robust SQL Server schemas with Entity Framework Core, optimized indexing, and containerized deployment workflows.
            </p>
            <ul class="arch-points">
              <li><strong>Query Optimization:</strong> Index tuning, execution plan analysis, and optimized LINQ expressions.</li>
              <li><strong>Auditability:</strong> Complete transactional tracking, Soft-Delete mechanisms, and automated audit logs.</li>
              <li><strong>DevOps & Hosting:</strong> Microsoft Azure App Services, Docker containers, and automated CI/CD pipelines.</li>
            </ul>
          </div>
          <div class="arch-badge-panel">
            <span class="arch-pill">SQL Server</span>
            <span class="arch-pill">EF Core</span>
            <span class="arch-pill">Azure Cloud</span>
            <span class="arch-pill">Docker</span>
            <span class="arch-pill">Git / GitHub CI</span>
            <span class="arch-pill">SSMS</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section class="about section">
      <div class="about-photo">
        <img src="assets/images/portfolio_hero.png" alt="Portrait of Nouman Ahmad">
        <div class="portrait-social">
          <a href="https://linkedin.com/in/nouman-ahmad-59022942a" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
          <a href="https://github.com/mughalnouman" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.5c-2.23.49-2.7-.95-2.7-.95-.36-.93-.9-1.18-.9-1.18-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.32.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82A7.67 7.67 0 0 1 8 4.8c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.47v2.18c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/>
            </svg>
          </a>
          <a href="mailto:mughalnouman678@gmail.com" aria-label="Email">&#9993;</a>
        </div>
      </div>
      <div class="about-copy">
        <span class="eyebrow">About Me</span>
        <h2>Full Stack Developer with a <em>Passion for Building</em> High-Impact Systems</h2>
        <p>
          I'm a Full Stack Developer with 2+ years of professional experience building enterprise applications with Angular and ASP.NET Core across multi-tenant CRM, inventory ERP, and accounting systems.
        </p>
        <div class="about-metrics">
          <div><b>2+</b><span>Years Experience</span></div>
          <div><b>10+</b><span>Projects Completed</span></div>
          <div><b>100%</b><span>Client & Team Focus</span></div>
        </div>
        <a class="primary" routerLink="/about">More About My Background <span>→</span></a>
      </div>
    </section>

    <!-- SELECTED PROJECTS SECTION WITH RECRUITER METRIC BADGES -->
    <section id="projects" class="projects section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Production Portfolio</span>
          <h2>Featured <em>Enterprise Work</em></h2>
        </div>
        <a class="text-link" routerLink="/projects">View All Projects →</a>
      </div>
      <div class="project-grid compact">
        <article class="project-card glow-card" *ngFor="let project of projects">
          <div class="project-image">
            <img [src]="project.image" [alt]="project.title + ' screenshot'">
            <span class="status">{{ project.status }}</span>
          </div>
          <div class="project-content">
            <p class="project-type">{{ project.type }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="tags">
              <span *ngFor="let tag of project.tags">{{ tag }}</span>
            </div>
            <div class="project-links">
              <a [routerLink]="['/projects', project.slug]">View Case Study →</a>
              <a *ngIf="project.live" [href]="project.live" target="_blank" rel="noopener">Live Demo ↗</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- TECH STACK & METERS -->
    <section id="skills" class="skills section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Production Toolkit</span>
          <h2>My <em>Tech Stack</em></h2>
        </div>
      </div>
      <div class="skills-layout">
        <div class="skill-grid">
          <article *ngFor="let skill of skillCards" class="skill-card">
            <img class="skill-icon" [src]="skill.icon" [alt]="skill.name + ' logo'">
            <span>{{ skill.name }}</span>
          </article>
        </div>
        <aside class="expertise">
          <span class="eyebrow">Engineering Mastery</span>
          <div class="meter" *ngFor="let item of expertiseList">
            <div>
              <span>{{ item.label }}</span>
              <b>{{ item.percentage }}</b>
            </div>
            <i><em [style.width]="item.percentage"></em></i>
          </div>
        </aside>
      </div>
    </section>

    <!-- CONTACT SECTION WITH DIRECT WHATSAPP & EMAIL CHANNELS -->
    <section class="contact section home-contact">
      <div class="contact-copy">
        <span class="eyebrow available"><i></i> Available for work</span>
        <h2>Let's Build Something <em>Remarkable Together</em></h2>
        <p>I'm always open to discussing new engineering projects, contract roles, or full-time opportunities.</p>
        
        <a class="contact-channel-item" [href]="gmailDirectLink" target="_blank" rel="noopener">
          <svg class="channel-icon gmail-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.5 12.25c0-.7-.06-1.37-.18-2.02H12v4.11h5.9c-.25 1.34-1 2.48-2.14 3.24v2.69h3.46c2.02-1.86 3.28-4.6 3.28-8.02z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.99 7.28-2.67l-3.46-2.69c-.99.66-2.25 1.05-3.82 1.05-2.94 0-5.43-1.98-6.32-4.66H2.08v2.77C3.89 20.41 7.67 23 12 23z"/>
            <path fill="#FBBC05" d="M5.68 14.03c-.23-.68-.36-1.41-.36-2.03s.13-1.35.36-2.03V7.2H2.08C1.35 8.65.94 10.28.94 12s.41 3.35 1.14 4.8l3.6-2.77z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.67 1 3.89 3.59 2.08 7.2l3.6 2.77c.89-2.68 3.38-4.59 6.32-4.59z"/>
          </svg>
          <span>mughalnouman678&#64;gmail.com</span>
        </a>

        <a class="contact-channel-item" href="https://wa.me/923214940440" target="_blank" rel="noopener">
          <svg class="channel-icon whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.2 1.25-1.72 1.33-.49.07-1.12.1-3.23-.77-2.69-1.11-4.44-3.83-4.57-4-.14-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.26.1.1.66 1.66 1.43.56.27.93.41 1.07.63.14.22.14.85-.1 1.53z"/>
          </svg>
          <span>+92 321 4940440 (WhatsApp)</span>
        </a>

        <span class="contact-channel-item" style="cursor: default;">
          <span style="font-size: 15px; margin-right: 6px;">📍</span>
          <span>Lahore, Pakistan (Open to Remote / Relocation)</span>
        </span>
      </div>

      <form (ngSubmit)="submit()" #quickForm="ngForm" novalidate>
        <div *ngIf="submitted" class="success">
          <p><strong>Your message is ready!</strong> Click below to dispatch via Email or WhatsApp:</p>
          <div class="send-options" style="margin-top: 14px;">
            <button type="button" class="primary action-send-btn" (click)="openEmail()">
              <svg class="btn-channel-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#fff" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>Send via Email</span>
            </button>
            <a class="secondary action-send-btn" [href]="whatsAppLink" target="_blank" rel="noopener">
              <svg class="btn-channel-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.2 1.25-1.72 1.33-.49.07-1.12.1-3.23-.77-2.69-1.11-4.44-3.83-4.57-4-.14-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.26.1.1.66 1.66 1.43.56.27.93.41 1.07.63.14.22.14.85-.1 1.53z"/>
              </svg>
              <span>Send via WhatsApp</span>
            </a>
          </div>
          <button type="button" class="text-link" style="margin-top: 12px; display: inline-block; background:none; border:none; color:#78a9ff; cursor:pointer;" (click)="resetForm()">Send another message</button>
        </div>

        <ng-container *ngIf="!submitted">
          <div class="form-row">
            <input name="name" [(ngModel)]="form.name" required placeholder="Your name">
            <input name="email" [(ngModel)]="form.email" required email placeholder="Your email">
          </div>
          <textarea name="message" [(ngModel)]="form.message" required placeholder="Your message or project scope"></textarea>
          <button class="primary" type="submit" [disabled]="!form.name || !form.email || !form.message">Send Message <span>→</span></button>
          <p class="form-error" *ngIf="quickForm.submitted && (!form.name || !form.email || !form.message)">Please fill in your name, valid email and message.</p>
        </ng-container>
      </form>

      <div class="contact-map">
        <div class="map-grid"></div>
        <div>
          <span class="eyebrow">Let's Connect</span>
          <p>Building high-performance software with clarity & care.</p>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  projects = projects;
  skills = skills;
  submitted = false;
  form = { name: '', email: '', message: '' };
  activeArchTab: 'frontend' | 'backend' | 'database' = 'frontend';

  // Dynamic Typewriter Effect for Hero Headline
  roles: string[] = [
    'Building Scalable Enterprise CRMs',
    'Developing High-Performance ASP.NET Core APIs',
    'Crafting Modern Angular 19 SPAs',
    'Designing Real-Time Distributed Systems'
  ];
  currentRoleText = '';
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typewriterTimer: any;

  marqueeTech = [
    { name: 'Angular 19', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
    { name: '.NET Core & C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
    { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Microsoft Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
    { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' }
  ];

  skillCards = this.marqueeTech.concat([
    { name: 'PrimeNG', icon: 'https://cdn.simpleicons.org/primeng/3B82F6' },
    { name: 'ABP Framework', icon: 'https://cdn.simpleicons.org/dotnet/8B5CF6' }
  ]);

  expertiseList = [
    { label: 'Frontend Architecture (Angular 19 & Signals)', percentage: '94%' },
    { label: 'Backend Engineering (ASP.NET Core & C#)', percentage: '92%' },
    { label: 'Database Design & EF Core (SQL Server)', percentage: '88%' },
    { label: 'Real-Time Services (SignalR & WebSockets)', percentage: '86%' },
    { label: 'Modular Multi-Tenancy (ABP Framework & RBAC)', percentage: '85%' }
  ];

  ngOnInit() {
    this.startTypewriter();
  }

  ngOnDestroy() {
    if (this.typewriterTimer) {
      clearTimeout(this.typewriterTimer);
    }
  }

  startTypewriter() {
    const current = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.currentRoleText = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentRoleText = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? 30 : 65;

    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2200; // Pause at end of text
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 400;
    }

    this.typewriterTimer = setTimeout(() => this.startTypewriter(), speed);
  }

  get gmailDirectLink(): string {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=mughalnouman678@gmail.com';
  }

  get emailLink(): string {
    return `mailto:mughalnouman678@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + this.form.name)}&body=${encodeURIComponent(`Hello Nouman,\n\nI am ${this.form.name} (${this.form.email}).\n\n${this.form.message}`)}`;
  }

  get whatsAppLink(): string {
    return `https://wa.me/923214940440?text=${encodeURIComponent(`Hello Nouman, I reached out via your portfolio.\nName: ${this.form.name}\nEmail: ${this.form.email}\n\nMessage: ${this.form.message}`)}`;
  }

  openEmail() {
    const subject = encodeURIComponent('Portfolio inquiry from ' + (this.form.name || 'Visitor'));
    const body = encodeURIComponent(`Hello Nouman,\n\nI am ${this.form.name} (${this.form.email}).\n\n${this.form.message}`);
    // Open Gmail web client with pre-filled fields
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mughalnouman678@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  }

  submit() {
    if (this.form.name && /^\S+@\S+\.\S+$/.test(this.form.email) && this.form.message) {
      this.submitted = true;
    }
  }

  resetForm() {
    this.submitted = false;
    this.form = { name: '', email: '', message: '' };
  }
}
