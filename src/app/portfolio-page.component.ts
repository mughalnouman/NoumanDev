import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { experience, projects, skills, Project } from './portfolio.data';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <ng-container [ngSwitch]="page">
      <!-- ABOUT PAGE -->
      <section *ngSwitchCase="'about'" class="page section about-page">
        <div class="page-intro">
          <span class="eyebrow">About Me</span>
          <h1>Building reliable products with <em>clarity and care.</em></h1>
          <p>Full Stack Developer specializing in Angular and ASP.NET Core enterprise applications.</p>
        </div>
        <div class="about">
          <div class="about-photo">
            <img src="assets/images/portfolio_hero.png" alt="Portrait of Nouman Ahmad">
          </div>
          <div class="about-copy">
            <h2>From interfaces to scalable APIs.</h2>
            <p>
              I build maintainable web applications across CRM, ERP, accounting, and inventory management.
              My work combines responsive Angular experiences with secure ASP.NET Core APIs and well-structured SQL Server databases.
            </p>
            <div class="feature-list tech-pills">
              <span *ngFor="let skill of skills">
                <img [src]="techIcon(skill)" [alt]="skill + ' logo'">{{ skill }}
              </span>
            </div>
            <a class="primary" href="assets/documents/NoumanAhmad_FullStack.pdf" download>Download CV →</a>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE PAGE -->
      <section *ngSwitchCase="'experience'" class="page section">
        <div class="page-intro">
          <span class="eyebrow">Career path</span>
          <h1>My <em>Experience</em></h1>
          <p>Practical full stack work across enterprise software, accounting and e-commerce platforms.</p>
        </div>
        <div class="timeline">
          <article *ngFor="let item of experience">
            <span class="timeline-dot"></span>
            <div class="timeline-date">{{ item.dates }}</div>
            <div class="timeline-card">
              <span class="eyebrow">{{ item.company }}</span>
              <h2>{{ item.role }}</h2>
              <p>{{ item.summary }}</p>
              <ul>
                <li *ngFor="let point of item.points">{{ point }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- SKILLS PAGE -->
      <section *ngSwitchCase="'skills'" class="page section skills-page">
        <div class="page-intro">
          <span class="eyebrow">Professional toolkit</span>
          <h1>Skills & <em>Expertise</em></h1>
          <p>Frontend, backend, data, and delivery tools used to build maintainable enterprise software.</p>
        </div>
        <div class="skills-page-grid">
          <article *ngFor="let skill of skills; let i = index" class="skill-detail-card">
            <span class="skill-number">0{{ i + 1 }}</span>
            <img class="skill-page-icon" [src]="techIcon(skill)" [alt]="skill + ' logo'">
            <h2>{{ skill }}</h2>
            <p>{{ skillDescription(skill) }}</p>
          </article>
        </div>
        <section class="skill-principles">
          <span>✓ Responsive UI & SPA</span>
          <span>✓ Secure JWT & RBAC APIs</span>
          <span>✓ Clean Architecture & SOLID</span>
          <span>✓ Real-time SignalR Services</span>
        </section>
      </section>

      <!-- PROJECTS PAGE -->
      <section *ngSwitchCase="'projects'" class="page section">
        <div class="page-intro">
          <span class="eyebrow">Portfolio</span>
          <h1>My <em>Projects</em></h1>
          <p>Selected enterprise platforms and e-commerce experiences.</p>
        </div>
        <div class="project-grid page-grid">
          <article class="project-card" *ngFor="let project of projects">
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
                <a *ngIf="project.live" [href]="project.live" target="_blank" rel="noopener">Live Site ↗</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- CASE STUDY PAGE -->
      <ng-container *ngSwitchCase="'case-study'">
        <section class="page section" *ngIf="project">
          <a routerLink="/projects" class="back-link">← All projects</a>
          <div class="case-hero">
            <div>
              <span class="eyebrow">{{ project.type }}</span>
              <h1>{{ project.title }}</h1>
              <p>{{ project.overview }}</p>
              <div class="tags">
                <span *ngFor="let tag of project.tags">{{ tag }}</span>
              </div>
              <a *ngIf="project.live" class="primary" [href]="project.live" target="_blank" rel="noopener" style="display:inline-block; margin-top:20px;">Visit Live Project ↗</a>
            </div>
            <button class="case-cover" (click)="selectedImage = project.image" type="button">
              <img [src]="project.image" [alt]="project.title + ' overview'">
              <span>Click to expand ⤢</span>
            </button>
          </div>
          <div class="case-layout">
            <article>
              <span class="eyebrow">The work</span>
              <h2>Solution overview</h2>
              <p>{{ project.overview }}</p>
              <span class="eyebrow" style="margin-top:22px;">Key features</span>
              <ul class="feature-list">
                <li *ngFor="let feature of project.features">{{ feature }}</li>
              </ul>
            </article>
            <div class="case-gallery">
              <button *ngFor="let image of project.gallery" (click)="selectedImage = image" type="button">
                <img [src]="image" [alt]="project.title + ' interface screenshot'">
              </button>
            </div>
          </div>
        </section>
        <div class="image-lightbox" *ngIf="selectedImage" (click)="selectedImage = undefined">
          <button class="lightbox-close" (click)="selectedImage = undefined" aria-label="Close image">×</button>
          <img [src]="selectedImage" alt="Expanded project screenshot" (click)="$event.stopPropagation()">
        </div>
      </ng-container>

      <!-- CONTACT PAGE -->
      <section *ngSwitchCase="'contact'" class="page section">
        <div class="page-intro">
          <span class="eyebrow">Get in touch</span>
          <h1>Let's build something <em>great together.</em></h1>
          <p>Have a project, opportunity, or product idea? I’d be glad to discuss it.</p>
        </div>
        <div class="contact contact-page">
          <div class="contact-copy">
            <span class="eyebrow available"><i></i> Available for work</span>
            <h2>Start a conversation.</h2>
            
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

            <a class="contact-channel-item" href="https://linkedin.com/in/nouman-ahmad-59022942a" target="_blank" rel="noopener">
              <svg class="channel-icon linkedin-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#0A66C2" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
              </svg>
              <span>LinkedIn Profile</span>
            </a>

            <a class="contact-channel-item" href="https://github.com/mughalnouman" target="_blank" rel="noopener">
              <svg class="channel-icon github-icon" viewBox="0 0 16 16" aria-hidden="true">
                <path fill="#FFFFFF" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.5c-2.23.49-2.7-.95-2.7-.95-.36-.93-.9-1.18-.9-1.18-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.32.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82A7.67 7.67 0 0 1 8 4.8c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.47v2.18c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/>
              </svg>
              <span>GitHub Profile</span>
            </a>

            <span class="contact-channel-item" style="cursor: default;">
              <span style="font-size: 15px; margin-right: 6px;">📍</span>
              <span>Lahore, Pakistan</span>
            </span>
          </div>

          <form (ngSubmit)="submit()" #contactForm="ngForm" novalidate>
            <div *ngIf="submitted" class="success">
              <p><strong>Your message is ready!</strong> Choose your preferred channel to send:</p>
              <div class="send-options">
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
              <button type="button" class="text-link" style="margin-top: 15px; display: inline-block; background:none; border:none; color:#78a9ff; cursor:pointer;" (click)="resetForm()">Send another message</button>
            </div>

            <ng-container *ngIf="!submitted">
              <input name="name" [(ngModel)]="form.name" required placeholder="Your name">
              <input name="email" [(ngModel)]="form.email" required email placeholder="Your email">
              <textarea name="message" [(ngModel)]="form.message" required placeholder="Tell me about your project or opportunity"></textarea>
              <button class="primary" type="submit" [disabled]="!form.name || !form.email || !form.message">Continue to Send →</button>
              <p class="form-error" *ngIf="contactForm.submitted && (!form.name || !form.email || !form.message)">
                Please enter your name, valid email, and message.
              </p>
            </ng-container>
          </form>

          <div class="contact-map">
            <div class="map-grid"></div>
            <div>
              <span class="eyebrow">Let's Connect</span>
              <p>Available for Full-time and Contract roles.</p>
            </div>
          </div>
        </div>
      </section>
    </ng-container>
  `
})
export class PortfolioPageComponent implements OnInit {
  page = '';
  project?: Project;
  selectedImage?: string;
  projects = projects;
  skills = skills;
  experience = experience;
  submitted = false;
  form = { name: '', email: '', message: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(d => this.page = d['page']);
    this.route.paramMap.subscribe(p => this.project = projects.find(x => x.slug === p.get('slug')));
  }

  techIcon(skill: string): string {
    const icons: Record<string, string> = {
      'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      '.NET Core': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
      'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      'SQL Server': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg',
      'PrimeNG': 'https://cdn.simpleicons.org/primeng/3B82F6',
      'ABP Framework': 'https://cdn.simpleicons.org/dotnet/8B5CF6',
      'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
      'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
    };
    return icons[skill] || '';
  }

  skillDescription(skill: string): string {
    const descriptions: Record<string, string> = {
      'Angular': 'Responsive, component-driven enterprise web applications with TypeScript.',
      'TypeScript': 'Strongly-typed JavaScript delivering clean, scalable frontend architecture.',
      '.NET Core': 'High-performance, secure RESTful APIs, EF Core, and business microservices.',
      'Tailwind CSS': 'Utility-first modern responsive interfaces and rapid prototyping.',
      'SQL Server': 'Relational database schema modeling, indexing, and complex query optimization.',
      'PrimeNG': 'Rich, enterprise-grade component libraries for high-productivity Angular UIs.',
      'ABP Framework': 'Domain-driven modular software architecture with built-in multi-tenancy & RBAC.',
      'Azure': 'Cloud resource management, hosting, app services, and deployment pipelines.',
      'Git': 'Professional Git version control, branching strategies, and team collaboration.',
      'Docker': 'Containerization for consistent local development and staging environments.'
    };
    return descriptions[skill] || 'Enterprise software engineering toolkit.';
  }

  get gmailDirectLink(): string {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=mughalnouman678@gmail.com';
  }

  get emailLink(): string {
    return `mailto:mughalnouman678@gmail.com?subject=${encodeURIComponent('Portfolio enquiry from ' + this.form.name)}&body=${encodeURIComponent(`Hello Nouman,\n\nI am ${this.form.name} (${this.form.email}).\n\n${this.form.message}`)}`;
  }

  get whatsAppLink(): string {
    return `https://wa.me/923214940440?text=${encodeURIComponent(`Hello Nouman, I reached out via your portfolio.\nName: ${this.form.name}\nEmail: ${this.form.email}\n\nMessage: ${this.form.message}`)}`;
  }

  openEmail() {
    const subject = encodeURIComponent('Portfolio inquiry from ' + (this.form.name || 'Visitor'));
    const body = encodeURIComponent(`Hello Nouman,\n\nI am ${this.form.name} (${this.form.email}).\n\n${this.form.message}`);
    // Open Gmail web client with fallback to mailto protocol
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
