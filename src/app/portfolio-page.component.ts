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
          <span class="eyebrow">Engineering Leadership</span>
          <h1>Building High-Scale Systems with <em>Clarity & Precision.</em></h1>
          <p>Full Stack Developer specializing in Angular 19 and ASP.NET Core enterprise architectures.</p>
        </div>
        <div class="about">
          <div class="about-photo glass-card">
            <img src="assets/images/nouman-executive.jpg" alt="Portrait of Nouman Ahmad">
            <div class="portrait-social">
              <a href="https://linkedin.com/in/nouman-ahmad-59022942a" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
              <a href="https://github.com/mughalnouman" target="_blank" rel="noopener" aria-label="GitHub">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path fill="currentColor" d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.5c-2.23.49-2.7-.95-2.7-.95-.36-.93-.9-1.18-.9-1.18-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.32.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82A7.67 7.67 0 0 1 8 4.8c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.47v2.18c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/>
                </svg>
              </a>
              <a href="mailto:mughalnouman678@gmail.com" aria-label="Email">&#9993;</a>
            </div>
          </div>
          <div class="about-copy glass-card">
            <h2>From Responsive SPAs to Scalable Cloud APIs.</h2>
            <p>
              I architect maintainable, high-throughput web applications across multi-tenant CRM, inventory ERP, and accounting management.
              My work merges reactive Angular 19 frontends with secure ASP.NET Core & ABP Framework APIs, SignalR real-time communications, and optimized SQL Server backbones.
            </p>
            <div class="feature-list tech-pills">
              <span *ngFor="let skill of skills">
                <img [src]="techIcon(skill)" [alt]="skill + ' logo'" loading="lazy">{{ skill }}
              </span>
            </div>
            <div class="about-actions" style="margin-top: 24px;">
              <a class="primary" href="assets/documents/NoumanAhmad_FullStack.pdf" download>Download CV (PDF) →</a>
              <a class="whatsapp-btn" [href]="whatsAppLink" target="_blank" rel="noopener">Connect on WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE PAGE -->
      <section *ngSwitchCase="'experience'" class="page section">
        <div class="page-intro">
          <span class="eyebrow">Career Milestones</span>
          <h1>Production <em>Experience</em></h1>
          <p>Full stack contributions across enterprise software, accounting systems, and e-commerce platforms.</p>
        </div>
        <div class="timeline">
          <article *ngFor="let item of experience">
            <span class="timeline-dot"></span>
            <div class="timeline-date">{{ item.dates }}</div>
            <div class="timeline-card glass-card">
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
          <span class="eyebrow">Professional Toolkit</span>
          <h1>Skills & <em>Technical Mastery</em></h1>
          <p>Frontend, backend, cloud, and real-time delivery tools used to build maintainable enterprise software.</p>
        </div>
        <div class="skills-page-grid">
          <article *ngFor="let skill of skills; let i = index" class="skill-detail-card glass-card">
            <span class="skill-number">0{{ i + 1 }}</span>
            <img class="skill-page-icon" [src]="techIcon(skill)" [alt]="skill + ' logo'" loading="lazy">
            <h2>{{ skill }}</h2>
            <p>{{ skillDescription(skill) }}</p>
          </article>
        </div>
        <section class="skill-principles glass-panel">
          <span>✓ Modern Angular 19 & Signal Architecture</span>
          <span>✓ Secure JWT & Granular RBAC Permissions</span>
          <span>✓ Clean Architecture, SOLID & CQRS</span>
          <span>✓ Real-time SignalR WebSockets</span>
        </section>
      </section>

      <!-- PROJECTS PAGE -->
      <section *ngSwitchCase="'projects'" class="page section">
        <div class="page-intro">
          <span class="eyebrow">Case Studies & Work</span>
          <h1>Production <em>Projects</em></h1>
          <p>Architected multi-tenant cloud platforms, ERP management engines, and high-conversion web apps.</p>
        </div>
        <div class="project-grid page-grid">
          <article class="project-card glass-card" *ngFor="let project of projects">
            <div class="project-image">
              <img [src]="project.image" [alt]="project.title + ' screenshot'" loading="lazy">
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
          <div class="case-hero glass-panel">
            <div>
              <span class="eyebrow">{{ project.type }}</span>
              <h1>{{ project.title }}</h1>
              <p>{{ project.overview }}</p>
              <div class="tags">
                <span *ngFor="let tag of project.tags">{{ tag }}</span>
              </div>
              <a *ngIf="project.live" class="primary" [href]="project.live" target="_blank" rel="noopener" style="display:inline-flex; margin-top:20px;">Visit Live Project ↗</a>
            </div>
            <button class="case-cover" (click)="selectedImage = project.image" type="button">
              <img [src]="project.image" [alt]="project.title + ' overview'">
              <span>Click to expand ⤢</span>
            </button>
          </div>
          <div class="case-layout">
            <article class="glass-card">
              <span class="eyebrow">The System</span>
              <h2>Solution Architecture</h2>
              <p>{{ project.overview }}</p>
              <span class="eyebrow" style="margin-top:22px;">Key Engineering Features</span>
              <ul class="feature-list">
                <li *ngFor="let feature of project.features">{{ feature }}</li>
              </ul>
            </article>
            <div class="case-gallery">
              <button *ngFor="let image of project.gallery" (click)="selectedImage = image" type="button" class="glass-card">
                <img [src]="image" [alt]="project.title + ' interface screenshot'" loading="lazy">
              </button>
            </div>
          </div>
        </section>
        <div class="image-lightbox" *ngIf="selectedImage" (click)="selectedImage = undefined">
          <button class="lightbox-close" (click)="selectedImage = undefined" aria-label="Close image">×</button>
          <img [src]="selectedImage" alt="Expanded project screenshot" (click)="$event.stopPropagation()">
        </div>
      </ng-container>

      <!-- HIGH-CONVERSION EXECUTIVE CONTACT PORTAL -->
      <section *ngSwitchCase="'contact'" class="page section contact-portal-section">
        <div class="page-intro">
          <div class="eyebrow-row">
            <span class="eyebrow available">
              <span class="pulse-emerald-dot"></span>
              Available for Full-Time Roles & Enterprise Contracts
            </span>
            <span class="location-badge">⚡ Typical Response: &lt; 2 Hours</span>
          </div>
          <h1>Let's Architect Something <em>Extraordinary.</em></h1>
          <p class="section-lead">
            Whether you are looking to build a high-concurrency cloud platform, scale an ASP.NET Core backend, 
            or design an ultra-responsive Angular 19 SPA, let's connect and discuss your engineering goals.
          </p>
        </div>

        <div class="contact-portal-grid">
          <!-- LEFT COLUMN: EXECUTIVE CHANNELS & CREDENTIALS -->
          <div class="contact-channels-column">
            <!-- Executive Profile Card -->
            <div class="channel-profile-card glass-card">
              <div class="profile-header">
                <div class="avatar-ring">
                  <img src="assets/images/nouman-executive.jpg" alt="Nouman Ahmad - Full Stack Architect" class="profile-avatar">
                  <span class="online-indicator"></span>
                </div>
                <div class="profile-details">
                  <div class="name-badge-row">
                    <h3>Nouman Ahmad</h3>
                    <span class="verified-pill" title="Verified Full Stack Engineer">✓ Verified</span>
                  </div>
                  <p class="profile-title">Full Stack & Distributed Systems Architect</p>
                  <p class="profile-location">📍 Lahore, Pakistan • Open to Global Remote</p>
                </div>
              </div>

              <div class="profile-stats-bar">
                <div class="p-stat">
                  <b>2+ Yrs</b>
                  <span>Production Exp</span>
                </div>
                <div class="p-stat">
                  <b>10+</b>
                  <span>Deployed Systems</span>
                </div>
                <div class="p-stat">
                  <b>100%</b>
                  <span>On-Time Delivery</span>
                </div>
              </div>
            </div>

            <!-- Direct Contact Methods -->
            <div class="direct-methods-list">
              <!-- WhatsApp Card -->
              <a class="method-card whatsapp-card glass-card" [href]="whatsAppLink" target="_blank" rel="noopener">
                <div class="method-icon-wrap wa-icon-bg">
                  <svg viewBox="0 0 24 24" fill="#25D366" class="w-6 h-6">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.2 1.25-1.72 1.33-.49.07-1.12.1-3.23-.77-2.69-1.11-4.44-3.83-4.57-4-.14-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.26.1.1.66 1.66 1.43.56.27.93.41 1.07.63.14.22.14.85-.1 1.53z"/>
                  </svg>
                </div>
                <div class="method-info">
                  <div class="method-top">
                    <span class="method-name">WhatsApp Direct</span>
                    <span class="method-tag tag-green">Instant Response</span>
                  </div>
                  <span class="method-value">+92 321 4940440</span>
                </div>
                <span class="method-arrow">→</span>
              </a>

              <!-- Official Email Card -->
              <a class="method-card email-card glass-card" [href]="gmailDirectLink" target="_blank" rel="noopener">
                <div class="method-icon-wrap gmail-icon-bg">
                  <svg viewBox="0 0 24 24" class="w-6 h-6">
                    <path fill="#4285F4" d="M22.5 12.25c0-.7-.06-1.37-.18-2.02H12v4.11h5.9c-.25 1.34-1 2.48-2.14 3.24v2.69h3.46c2.02-1.86 3.28-4.6 3.28-8.02z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.99 7.28-2.67l-3.46-2.69c-.99.66-2.25 1.05-3.82 1.05-2.94 0-5.43-1.98-6.32-4.66H2.08v2.77C3.89 20.41 7.67 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.68 14.03c-.23-.68-.36-1.41-.36-2.03s.13-1.35.36-2.03V7.2H2.08C1.35 8.65.94 10.28.94 12s.41 3.35 1.14 4.8l3.6-2.77z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.67 1 3.89 3.59 2.08 7.2l3.6 2.77c.89-2.68 3.38-4.59 6.32-4.59z"/>
                  </svg>
                </div>
                <div class="method-info">
                  <div class="method-top">
                    <span class="method-name">Official Direct Email</span>
                    <span class="method-tag tag-blue">Open in Gmail</span>
                  </div>
                  <span class="method-value">mughalnouman678&#64;gmail.com</span>
                </div>
                <span class="method-arrow">→</span>
              </a>

              <!-- LinkedIn Profile Card -->
              <a class="method-card linkedin-card glass-card" href="https://linkedin.com/in/nouman-ahmad-59022942a" target="_blank" rel="noopener">
                <div class="method-icon-wrap in-icon-bg">
                  <span class="in-text">in</span>
                </div>
                <div class="method-info">
                  <div class="method-top">
                    <span class="method-name">LinkedIn Network</span>
                    <span class="method-tag tag-blue">Connect & Message</span>
                  </div>
                  <span class="method-value">linkedin.com/in/nouman-ahmad</span>
                </div>
                <span class="method-arrow">→</span>
              </a>

              <!-- GitHub Profile Card -->
              <a class="method-card github-card glass-card" href="https://github.com/mughalnouman" target="_blank" rel="noopener">
                <div class="method-icon-wrap gh-icon-bg">
                  <svg viewBox="0 0 16 16" fill="#ffffff" class="w-5 h-5">
                    <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.5c-2.23.49-2.7-.95-2.7-.95-.36-.93-.9-1.18-.9-1.18-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.32.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82A7.67 7.67 0 0 1 8 4.8c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.47v2.18c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/>
                  </svg>
                </div>
                <div class="method-info">
                  <div class="method-top">
                    <span class="method-name">GitHub Repositories</span>
                    <span class="method-tag tag-gray">&#64;mughalnouman</span>
                  </div>
                  <span class="method-value">Clean Architecture Repos</span>
                </div>
                <span class="method-arrow">→</span>
              </a>
            </div>

            <!-- Download CV & Trust Badges -->
            <div class="trust-download-box glass-card">
              <div class="trust-pills">
                <span>✓ NDA Protected</span>
                <span>✓ Clean Architecture</span>
                <span>✓ Global Remote Ready</span>
              </div>
              <a class="download-cv-btn" href="assets/documents/NoumanAhmad_FullStack.pdf" download>
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Verified Resume (PDF)
              </a>
            </div>
          </div>

          <!-- RIGHT COLUMN: INTERACTIVE PROJECT INQUIRY STUDIO -->
          <div class="contact-studio-column glass-panel">
            <div class="studio-header">
              <span class="hub-tag">Project Inquiry & Hiring Studio</span>
              <h2>Start a Discussion</h2>
              <p>Tell me what you are looking to build or achieve. I will review and reply within a few hours.</p>
            </div>

            <!-- Interactive Interest Selector -->
            <div class="interest-section">
              <label class="studio-label">What are you looking to collaborate on?</label>
              <div class="interest-chips">
                <button 
                  type="button" 
                  *ngFor="let option of interestOptions"
                  [class.active]="selectedInterest === option"
                  (click)="selectedInterest = option">
                  {{ option }}
                </button>
              </div>
            </div>

            <!-- SUCCESS CONFIRMATION MODAL -->
            <div *ngIf="submitted" class="success-dispatch-card glass-card">
              <div class="success-icon-badge">✓</div>
              <h3>Inquiry Prepared Successfully!</h3>
              <p>Choose your preferred channel below to dispatch your message directly to Nouman:</p>
              
              <div class="dispatch-actions-grid">
                <button type="button" class="primary dispatch-btn" (click)="openEmail()">
                  <svg class="btn-channel-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#fff" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>Dispatch via Gmail</span>
                </button>
                <a class="whatsapp-btn dispatch-btn" [href]="whatsAppLink" target="_blank" rel="noopener">
                  <svg class="btn-channel-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.2 1.25-1.72 1.33-.49.07-1.12.1-3.23-.77-2.69-1.11-4.44-3.83-4.57-4-.14-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.26.1.1.66 1.66 1.43.56.27.93.41 1.07.63.14.22.14.85-.1 1.53z"/>
                  </svg>
                  <span>Dispatch via WhatsApp</span>
                </a>
              </div>
              <button type="button" class="reset-link-btn" (click)="resetForm()">Send another inquiry ↺</button>
            </div>

            <!-- INQUIRY FORM -->
            <form *ngIf="!submitted" (ngSubmit)="submit()" #contactForm="ngForm" class="studio-form" novalidate>
              <div class="form-grid-row">
                <div class="form-group">
                  <label>Your Name <span class="required">*</span></label>
                  <input 
                    name="name" 
                    [(ngModel)]="form.name" 
                    required 
                    placeholder="e.g. Alex Johnson"
                    class="studio-input"
                  >
                </div>
                <div class="form-group">
                  <label>Work Email <span class="required">*</span></label>
                  <input 
                    name="email" 
                    [(ngModel)]="form.email" 
                    required 
                    email 
                    placeholder="alex@company.com"
                    class="studio-input"
                  >
                </div>
              </div>

              <div class="form-grid-row">
                <div class="form-group">
                  <label>Company / Organization</label>
                  <input 
                    name="company" 
                    [(ngModel)]="form.company" 
                    placeholder="e.g. TechCorp Solutions"
                    class="studio-input"
                  >
                </div>
                <div class="form-group">
                  <label>Project Timeline / Target Start</label>
                  <select name="timeline" [(ngModel)]="form.timeline" class="studio-select">
                    <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                    <option value="1 - 3 Months">1 - 3 Months</option>
                    <option value="Full-Time / Long-term Contract">Full-Time / Long-term Contract</option>
                    <option value="Consulting / Discussion Only">Consulting / Discussion Only</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Project Scope or Role Details <span class="required">*</span></label>
                <textarea 
                  name="message" 
                  [(ngModel)]="form.message" 
                  required 
                  rows="4"
                  placeholder="Describe your system requirements, target deliverables, architecture stack, or role details..."
                  class="studio-textarea"
                ></textarea>
              </div>

              <div class="form-actions-row">
                <button 
                  type="submit" 
                  class="primary glow-btn submit-btn" 
                  [disabled]="!form.name || !form.email || !form.message">
                  <span>Send Message & Start Conversation</span>
                  <span class="btn-arrow">→</span>
                </button>
                <a class="whatsapp-btn secondary-btn" [href]="whatsAppLink" target="_blank" rel="noopener">
                  <span>Direct WhatsApp</span>
                </a>
              </div>

              <p class="form-error" *ngIf="contactForm.submitted && (!form.name || !form.email || !form.message)">
                Please enter your name, valid email address, and project details.
              </p>
            </form>
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

  // Contact Studio State
  form = {
    name: '',
    email: '',
    company: '',
    timeline: 'Immediate (< 1 Month)',
    message: ''
  };

  selectedInterest = '🏢 Enterprise CRM / Cloud SaaS';
  interestOptions = [
    '🏢 Enterprise CRM / Cloud SaaS',
    '⚡ High-Throughput ASP.NET Core APIs',
    '🖥️ Modern Angular 19 Reactive SPAs',
    '💼 Senior Full Stack / Lead Engineering Role',
    '🛠️ Architecture Review & Code Audit'
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((d: any) => this.page = d['page']);
    this.route.paramMap.subscribe((p: any) => this.project = projects.find(x => x.slug === p.get('slug')));
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
      'Angular': 'Responsive, component-driven enterprise web applications with Angular 19 & Signals.',
      'TypeScript': 'Strongly-typed JavaScript delivering clean, scalable frontend architecture.',
      '.NET Core': 'High-throughput RESTful APIs with Clean Architecture, dependency injection & ABP.',
      'Tailwind CSS': 'Utility-first CSS powering modern design systems, glassmorphism, and responsive layouts.',
      'SQL Server': 'Relational data modeling, execution plan tuning, and Entity Framework Core optimization.',
      'PrimeNG': 'Rich accessible enterprise UI component library for complex data tables and dashboards.',
      'ABP Framework': 'Enterprise multi-tenancy, domain-driven design, and role-based permissions.',
      'Azure': 'Cloud hosting with Azure App Services, automated CI/CD, and monitoring.',
      'Git': 'Version control, branch protection, pull request reviews, and GitHub Actions.',
      'Docker': 'Containerized applications for reproducible dev and production cloud deployment.'
    };
    return descriptions[skill] || 'Production engineering toolkit.';
  }

  get gmailDirectLink(): string {
    const subject = encodeURIComponent(`Project Inquiry: ${this.selectedInterest} from ${this.form.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Nouman,\n\nI am contacting you regarding: ${this.selectedInterest}.\n` +
      `Name: ${this.form.name || ''}\nCompany: ${this.form.company || 'N/A'}\nTimeline: ${this.form.timeline}\n\n` +
      `Details:\n${this.form.message || ''}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=mughalnouman678@gmail.com&su=${subject}&body=${body}`;
  }

  get whatsAppLink(): string {
    return `https://wa.me/923214940440?text=${encodeURIComponent(
      `Hello Nouman! I reached out via your portfolio regarding: ${this.selectedInterest}.\n` +
      `Name: ${this.form.name || 'Visitor'}\n` +
      (this.form.company ? `Company: ${this.form.company}\n` : '') +
      `Timeline: ${this.form.timeline}\n\n` +
      `Message: ${this.form.message || 'I would like to discuss an opportunity with you.'}`
    )}`;
  }

  openEmail() {
    window.open(this.gmailDirectLink, '_blank', 'noopener,noreferrer');
  }

  submit() {
    if (this.form.name && /^\S+@\S+\.\S+$/.test(this.form.email) && this.form.message) {
      this.submitted = true;
    }
  }

  resetForm() {
    this.submitted = false;
    this.form = {
      name: '',
      email: '',
      company: '',
      timeline: 'Immediate (< 1 Month)',
      message: ''
    };
  }
}
