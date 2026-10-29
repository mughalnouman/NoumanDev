import { Component, OnInit, HostListener } from '@angular/core';
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
            <div class="portrait-social" aria-label="Social and Direct Contact Profiles">
              <a class="portrait-social-btn btn-linkedin" href="https://linkedin.com/in/nouman-ahmad-59022942a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" title="LinkedIn Profile">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
              </a>
              <a class="portrait-social-btn btn-github" href="https://github.com/mughalnouman" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" title="GitHub Profile">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
              <a class="portrait-social-btn btn-whatsapp" href="https://wa.me/923214940440" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat" title="Chat on WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.2 1.25-1.72 1.33-.49.07-1.12.1-3.23-.77-2.69-1.11-4.44-3.83-4.57-4-.14-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.26.1.1.66 1.66 1.43.56.27.93.41 1.07.63.14.22.14.85-.1 1.53z"/>
                </svg>
              </a>
              <a class="portrait-social-btn btn-email" [href]="gmailDirectLink" target="_blank" rel="noopener noreferrer" aria-label="Email via Gmail" title="Send Email via Gmail">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="about-copy glass-card">
            <h2>From Responsive SPAs to Scalable Cloud APIs.</h2>
            <p>
              I architect maintainable, high-throughput web applications across multi-tenant CRM, inventory ERP, and accounting management.
              My work merges reactive Angular 19 frontends with secure ASP.NET Core & ABP Framework APIs, SignalR real-time communications, and optimized SQL Server backbones.
            </p>
            <div class="about-skills-badges">
              <div *ngFor="let skill of skills" class="about-skill-pill">
                <img class="skill-mini-icon" [src]="techIcon(skill)" [alt]="skill + ' logo'" loading="lazy">
                <span>{{ skill }}</span>
              </div>
            </div>
            <div class="about-actions" style="margin-top: 24px;">
              <a class="primary" href="assets/documents/Nouman_Ahmad_FullStack_Developer.pdf" download>Download CV (PDF) →</a>
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
          <span>✓ Generative AI & Conversational Agents (Gemini & OpenAI)</span>
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
              <span class="status" [ngClass]="project.status === 'In production' ? 'status-production' : 'status-completed'">{{ project.status }}</span>
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

      <!-- ULTRA-IMMERSIVE CASE STUDY SHOWCASE (Inspired by Mobbin, Motion Primitives & Haiki) -->
      <ng-container *ngSwitchCase="'case-study'">
        <section class="case-study-showcase" *ngIf="project">
          <!-- TOP NAVIGATION / BREADCRUMB BAR -->
          <div class="case-topbar glass-card">
            <a routerLink="/projects" class="case-back-btn">
              <span class="back-arrow">←</span>
              <span>All Projects</span>
            </a>
            <div class="case-breadcrumbs">
              <span class="crumb-type">{{ project.type }}</span>
              <span class="crumb-divider">/</span>
              <span class="crumb-current">{{ project.title }}</span>
            </div>
            <div class="case-top-actions">
              <a *ngIf="project.live" [href]="project.live" target="_blank" rel="noopener" class="live-pill-btn">
                <span class="live-dot pulse-dot"></span>
                <span>Open Live Project</span>
                <span class="external-icon">↗</span>
              </a>
            </div>
          </div>

          <!-- HERO SECTION WITH 3D PERSPECTIVE MOCKUP & SYSTEM STATS -->
          <div class="case-hero-stage glass-panel">
            <div class="case-hero-glow"></div>
            <div class="case-hero-grid">
              <div class="case-hero-info">
                <div class="badge-row">
                  <span class="eyebrow-chip">{{ project.type }}</span>
                  <span class="status-chip" [ngClass]="project.status === 'In production' ? 'chip-production' : 'chip-completed'">
                    <span class="chip-dot"></span>
                    {{ project.status }}
                  </span>
                </div>
                <h1 class="case-hero-title">{{ project.title }}</h1>
                <p class="case-hero-desc">{{ project.overview }}</p>

                <!-- QUICK METRICS / SPECS -->
                <div class="case-stats-ribbon">
                  <div class="stat-box">
                    <span class="stat-label">Architecture</span>
                    <strong class="stat-val">Enterprise SPA</strong>
                  </div>
                  <div class="stat-box">
                    <span class="stat-label">Screen Views</span>
                    <strong class="stat-val">{{ project.gallery.length }} Modals / Views</strong>
                  </div>
                  <div class="stat-box">
                    <span class="stat-label">Data Sync</span>
                    <strong class="stat-val">Real-time / REST</strong>
                  </div>
                </div>

                <div class="tech-stack-row">
                  <span class="stack-badge" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>
              </div>

              <!-- 3D INTERACTIVE HERO STAGE -->
              <div class="hero-screen-stage" (mousemove)="onHeroMouseMove($event)" (mouseleave)="onHeroMouseLeave()">
                <div class="mockup-frame-3d" [style.transform]="heroTransform">
                  <div class="mockup-header-bar">
                    <div class="mac-controls">
                      <span class="mac-dot dot-red"></span>
                      <span class="mac-dot dot-yellow"></span>
                      <span class="mac-dot dot-green"></span>
                    </div>
                    <div class="mockup-url-bar">
                      <span class="lock-icon">🔒</span>
                      <span class="mock-url">{{ project.live || 'https://' + project.slug + '.cloud-platform.internal' }}</span>
                    </div>
                    <div class="mockup-actions">
                      <button (click)="openLightbox(activeScreenIndex)" class="expand-action" title="Expand View">⤢</button>
                    </div>
                  </div>
                  <div class="mockup-viewport" (click)="openLightbox(activeScreenIndex)">
                    <img [src]="project.gallery[activeScreenIndex] || project.image" [alt]="project.title + ' view'" class="mockup-img">
                    <div class="mockup-overlay">
                      <span class="view-pill">🔍 Click to inspect high-res</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- INTERACTIVE MULTI-VIEW SCREEN NAVIGATOR (Mobbin style tab switcher) -->
          <div class="screens-navigator-panel glass-card" *ngIf="project.gallery && project.gallery.length > 1">
            <div class="nav-panel-header">
              <div>
                <span class="eyebrow">Interactive View Explorer</span>
                <h3>System Interfaces & Workflows</h3>
              </div>
              <div class="nav-controls-hint">
                <span>Select a view to inspect</span>
              </div>
            </div>

            <!-- TAB PILLS -->
            <div class="screen-tabs-list">
              <button 
                *ngFor="let img of project.gallery; let i = index" 
                class="screen-tab-btn" 
                [class.active]="activeScreenIndex === i"
                (click)="setActiveScreen(i)">
                <span class="tab-index">0{{ i + 1 }}</span>
                <span class="tab-title">{{ getScreenTitle(i, project.slug) }}</span>
              </button>
            </div>
          </div>

          <!-- SPLIT STICKY PRESENTATION SHOWCASE (Mobbin & Haiki Style) -->
          <div class="showcase-split-container">
            <!-- LEFT: ENGINEERING ARCHITECTURE & KEY FEATURES (Scrollable) -->
            <div class="showcase-content-column">
              <!-- ARCHITECTURE CARD -->
              <div class="glass-card feature-showcase-card">
                <div class="card-icon-badge">⚡</div>
                <span class="eyebrow">Engineering Blueprint</span>
                <h2>Solution Architecture</h2>
                <p>{{ project.overview }}</p>
                <div class="arch-bullets">
                  <div class="arch-bullet-item" *ngFor="let feature of project.features; let fIndex = index">
                    <div class="bullet-number">0{{ fIndex + 1 }}</div>
                    <div class="bullet-text">
                      <strong>{{ getFeatureHeading(feature) }}</strong>
                      <p>{{ getFeatureDetail(feature) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CAPABILITIES & DATA FLOW -->
              <div class="glass-card capability-card">
                <span class="eyebrow">Design Systems & Ergonomics</span>
                <h3>Optimized for High-Throughput Operators</h3>
                <p>
                  Built with responsive data grids, instant filter search, keyboard shortcuts, and dynamic currency conversions to eliminate operational friction and accelerate daily workflows.
                </p>
                <div class="capabilities-grid">
                  <div class="cap-box">
                    <span class="cap-metric">&lt; 150ms</span>
                    <span class="cap-desc">Client Interaction Latency</span>
                  </div>
                  <div class="cap-box">
                    <span class="cap-metric">100%</span>
                    <span class="cap-desc">Responsive Cross-Device</span>
                  </div>
                  <div class="cap-box">
                    <span class="cap-metric">Real-time</span>
                    <span class="cap-desc">Data Pipelines & WebSockets</span>
                  </div>
                  <div class="cap-box">
                    <span class="cap-metric">Enterprise</span>
                    <span class="cap-desc">Security & Data Auditability</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT: STICKY CINEMATIC VIEWPORT (Changes with Active Screen or Scroll) -->
            <div class="showcase-sticky-column">
              <div class="sticky-viewport-card glass-card">
                <div class="viewport-header">
                  <div class="current-screen-info">
                    <span class="screen-step-tag">VIEW {{ activeScreenIndex + 1 }} OF {{ project.gallery.length }}</span>
                    <h4 class="screen-step-title">{{ getScreenTitle(activeScreenIndex, project.slug) }}</h4>
                  </div>
                  <div class="screen-pager">
                    <button class="pager-btn" (click)="prevScreen()" [disabled]="activeScreenIndex === 0">‹</button>
                    <span class="pager-text">{{ activeScreenIndex + 1 }} / {{ project.gallery.length }}</span>
                    <button class="pager-btn" (click)="nextScreen()" [disabled]="activeScreenIndex === project.gallery.length - 1">›</button>
                  </div>
                </div>

                <div class="sticky-image-wrap" (click)="openLightbox(activeScreenIndex)">
                  <img [src]="project.gallery[activeScreenIndex] || project.image" [alt]="project.title + ' screen'" class="sticky-screen-img">
                  <div class="hover-inspect-badge">
                    <span>Click to Open Lightbox ⤢</span>
                  </div>
                </div>

                <!-- MINI THUMBNAIL STRIP -->
                <div class="thumb-strip">
                  <button 
                    *ngFor="let img of project.gallery; let tIndex = index"
                    class="thumb-btn"
                    [class.active]="activeScreenIndex === tIndex"
                    (click)="setActiveScreen(tIndex)">
                    <img [src]="img" [alt]="'Thumbnail ' + (tIndex + 1)">
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- FULL-BLEED INTERACTIVE GALLERY GRID (All Screens in High Resolution) -->
          <div class="deep-dive-gallery-section">
            <div class="section-heading-row">
              <div>
                <span class="eyebrow">Comprehensive Deep Dive</span>
                <h2>All Production Interfaces</h2>
                <p>High-resolution captures of the live user flows, analytical dashboards, and enterprise modules.</p>
              </div>
            </div>

            <div class="deep-dive-grid">
              <div 
                *ngFor="let image of project.gallery; let gIndex = index" 
                class="deep-dive-card glass-card"
                (click)="openLightbox(gIndex)">
                <div class="card-browser-bar">
                  <div class="browser-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span class="browser-title">{{ getScreenTitle(gIndex, project.slug) }}</span>
                  <span class="zoom-icon">🔍</span>
                </div>
                <div class="card-image-box">
                  <img [src]="image" [alt]="project.title + ' interface ' + (gIndex + 1)" loading="lazy">
                </div>
                <div class="card-footer-info">
                  <span class="view-num">0{{ gIndex + 1 }}</span>
                  <span class="view-name">{{ getScreenTitle(gIndex, project.slug) }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- IMMERSIVE LIGHTBOX WITH KEYBOARD NAVIGATION -->
        <div class="image-lightbox" *ngIf="selectedImage" (click)="closeLightbox()">
          <div class="lightbox-header" (click)="$event.stopPropagation()">
            <span class="lightbox-title">{{ project?.title }} — View {{ lightboxIndex + 1 }}</span>
            <button class="lightbox-close" (click)="closeLightbox()" aria-label="Close image">×</button>
          </div>
          <div class="lightbox-body" (click)="$event.stopPropagation()">
            <button class="lightbox-nav-btn prev" (click)="lightboxPrev()" *ngIf="project && project.gallery.length > 1">‹</button>
            <img [src]="selectedImage" alt="Expanded project screenshot">
            <button class="lightbox-nav-btn next" (click)="lightboxNext()" *ngIf="project && project.gallery.length > 1">›</button>
          </div>
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
                  <b>2 Yrs</b>
                  <span>Production Exp</span>
                </div>
                <div class="p-stat">
                  <b>5+</b>
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
                  <svg viewBox="0 0 24 24" class="w-6 h-6" aria-hidden="true">
                    <path fill="#EA4335" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#0A66C2" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                  </svg>
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
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" class="w-5 h-5" aria-hidden="true">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
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
              <a class="download-cv-btn" href="assets/documents/Nouman_Ahmad_FullStack_Developer.pdf" download>
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Verified Resume
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

  // Case Study Showcase Interactive State (Mobbin / Motion Primitives style)
  activeScreenIndex = 0;
  lightboxIndex = 0;
  heroTransform = 'perspective(1000px) rotateX(4deg) rotateY(-4deg)';

  onHeroMouseMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    this.heroTransform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  onHeroMouseLeave() {
    this.heroTransform = 'perspective(1000px) rotateX(4deg) rotateY(-4deg)';
  }

  setActiveScreen(index: number) {
    this.activeScreenIndex = index;
  }

  nextScreen() {
    if (this.project?.gallery && this.activeScreenIndex < this.project.gallery.length - 1) {
      this.activeScreenIndex++;
    }
  }

  prevScreen() {
    if (this.activeScreenIndex > 0) {
      this.activeScreenIndex--;
    }
  }

  openLightbox(index: number) {
    if (this.project?.gallery && this.project.gallery[index]) {
      this.lightboxIndex = index;
      this.selectedImage = this.project.gallery[index];
    } else if (this.project?.image) {
      this.selectedImage = this.project.image;
    }
  }

  closeLightbox() {
    this.selectedImage = undefined;
  }

  lightboxNext() {
    if (this.project?.gallery && this.project.gallery.length > 0) {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.project.gallery.length;
      this.selectedImage = this.project.gallery[this.lightboxIndex];
    }
  }

  lightboxPrev() {
    if (this.project?.gallery && this.project.gallery.length > 0) {
      this.lightboxIndex = (this.lightboxIndex - 1 + this.project.gallery.length) % this.project.gallery.length;
      this.selectedImage = this.project.gallery[this.lightboxIndex];
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.selectedImage) {
      if (event.key === 'Escape') this.closeLightbox();
      if (event.key === 'ArrowRight') this.lightboxNext();
      if (event.key === 'ArrowLeft') this.lightboxPrev();
    }
  }

  getScreenTitle(index: number, slug?: string): string {
    const titles: Record<string, string[]> = {
      'eas-sync': [
        'Executive Financial Dashboard & Real-Time Balances',
        'Quick Actions & Core Management Reports',
        'Sales & Purchase Analytical Breakdown',
        'Payables Party Ledger & Credit Summary',
        'Receivables Party Ledger & Debit Balances'
      ],
      'maxout-crm': [
        'Executive Analytics & Multi-Tenant Dashboard',
        'Agile Board View & Sprint Workflows',
        'Enterprise Projects & Milestone Tracking',
        'Cross-Department Tasks & Schedule Management',
        'Internal Team Communications & Instant Chat',
        'Issues, Tickets & Resolution Pipeline'
      ],
      'aurum-ecommerce': [
        'Bilingual Marketplace Hero & Product Discovery',
        'Curated Memorabilia Showcase & Filtering',
        'Product Detail & High-Res Inspection',
        'Cart Management & Multi-Currency Checkout',
        'Arabic RTL Localization View',
        'Customer Checkout & Order Summary'
      ],
      'eas-inventory': [
        'Executive Multi-Warehouse Inventory Dashboard',
        'Secure Authentication & Accounting Access Portal'
      ]
    };

    if (slug && titles[slug] && titles[slug][index]) {
      return titles[slug][index];
    }
    return `Production Interface 0${index + 1}`;
  }

  getFeatureHeading(feature: string): string {
    const parts = feature.split(' - ');
    if (parts.length > 1) return parts[0];
    const colon = feature.split(': ');
    if (colon.length > 1) return colon[0];
    return feature.split(' with ')[0] || feature;
  }

  getFeatureDetail(feature: string): string {
    const parts = feature.split(' - ');
    if (parts.length > 1) return parts.slice(1).join(' - ');
    const colon = feature.split(': ');
    if (colon.length > 1) return colon.slice(1).join(': ');
    return feature;
  }

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
      'SignalR & WebSockets': 'https://cdn.simpleicons.org/socketdotio/ffffff',
      'SignalR & Web Sockets': 'https://cdn.simpleicons.org/socketdotio/ffffff',
      'Identity & RBAC (JWT)': 'https://cdn.simpleicons.org/jsonwebtokens/F33256',
      'AI Integration & LLMs': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHJvbGU9ImltZyIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgogIDxwYXRoIGZpbGw9IiMxMEEzN0YiIGQ9Ik0yMi4yODE5IDkuODIxMWE1Ljk4NDcgNS45ODQ3IDAgMCAwLS41MTU3LTQuOTEwOCA2LjA0NjIgNi4wNDYyIDAgMCAwLTYuNTA5OC0yLjlBNi4wNjUxIDYuMDY1MSAwIDAgMCA0Ljk4MDcgNC4xODE4YTUuOTg0NyA1Ljk4NDcgMCAwIDAtMy45OTc3IDIuOSA2LjA0NjIgNi4wNDYyIDAgMCAwIC43NDI3IDcuMDk2NiA1Ljk4IDUuOTggMCAwIDAgLjUxMSA0LjkxMDcgNi4wNTEgNi4wNTEgMCAwIDAgNi41MTQ2IDIuOTAwMUE1Ljk4NDcgNS45ODQ3IDAgMCAwIDEzLjI1OTkgMjRhNi4wNTU3IDYuMDU1NyAwIDAgMCA1Ljc3MTgtNC4yMDU4IDUuOTg5NCA1Ljk4OTQgMCAwIDAgMy4yNTAyLTkuOTczMXptLTkuMDIyIDEyLjU2OTRhNC40NTUyIDQuNDU1MiAwIDAgMS0yLjg2NDMtMS4wMzY1bC4xNDEzLS4wOCA0Ljc1NzctMi43NDU2YS43OTA5Ljc5MDkgMCAwIDAgLjM5MDctLjY3Nzh2LTYuNzAyMmwyLjAxMDQgMS4xNjI3Yy4yMDA4LjEwMjMuMzQwNC4yOTQ3LjM3NjMuNTE4MXY1LjU1NjJhNC40Njk3IDQuNDY5NyAwIDAgMS00LjQ3MjEgNC40NzUxem0tOS42MTc3LTQuMTA4YTQuNDUwMyA0LjQ1MDMgMCAwIDEtLjUzMjEtMy4wMDFsLjE0MTIuMDg0OCA0Ljc2MjQgMi43NDU2YS43NjcyLjc2NzIgMCAwIDAgLjc3NyAwbDUuODE4MS0zLjM1MzN2Mi4zMjE2YzAgLjIxNi0uMTE1MS40MTI0LS4zMjkzLjUyNGwtNC44MTg3IDIuNzc4OGMtMi4xNDE1IDEuMjMzOC00Ljg3MzIuNS02LjExNTYtMS42Mzk3ek0yLjE2OSA3Ljg1OWE0LjQ2MzMgNC40NjMzIDAgMCAxIDIuMzU1LTEuOTY0MnY1LjY1MTdjMCAuMzI1Ni4xNzM2LjYyNzcuNDU1Ny42NzM4bDUuNzg5OCAzLjMzOTYtMi4wMTA0IDEuMTYyN2MtLjA3NTQuMDM3LS4xNjgzLjAzNy0uMjQzNyAwTDMuODA1MiAxMy45MzljLTIuMTM3My0xLjIzODUtMi44NzAyLTMuOTY5Mi0xLjYzNjItNi4xMDh6bTE2LjUxMyAzLjgzOGwtNS44MDg3LTMuMzcxOCAyLjAxMDQtMS4xNjI3Yy4wNzU0LS4wMzcuMTY4My0uMDM3LjI0MzcgMGw0LjgwOTMgMi43Nzg4YTQuNDc0NiA0LjQ3NDYgMCAwIDEtLjY3MzcgOC4wNzIydi01LjY1MThjMC0uMzE5My0uMTY3My0uNjE0My0uNDA1Mi0uNjY0NXptMi4wMDEtMy4wMDg0bC0uMTQxMy0uMDg0OC00Ljc1My0yLjcxOTZhLjc3MjIuNzcyMiAwIDAgMC0uNzgxNyAwbC01LjgxODEgMy4zNTMzVjYuODY4YzAtLjIxNi4xMTUxLS40MTI0LjMyOTItLjUyNGw0LjgwOTMtMi43MzM3YTQuNDc4MiA0LjQ3ODIgMCAwIDEgNi42NTAyIDQuNjM2MnptLTEyLjc3NjYgMy41MzVsLTIuMDEwNC0xLjE1OGMtLjA3NTQtLjA1NjQtLjEyMTUtLjE0NTUtLjEyMTUtLjI0MzdWNC4wNDM1YTQuNDc4MiA0LjQ3ODIgMCAwIDEgNy4zNDQ0LTMuNDM2bC0uMTQxMy4wOC00Ljc1NzcgMi43NDU2YS43OTA5Ljc5MDkgMCAwIDAtLjM5MDYuNjc3OGwtLjAwNDcgNi42ODgxem0xLjA5MjQtMi4zNTU2bDIuNTg5OC0xLjQ5MTMgMi41OTQ1IDEuNDkxM3YyLjk4MjdsLTIuNTg1MSAxLjQ5MTMtMi41OTQ1LTEuNDkxMy0uMDQ3Mi0yLjk4Mjd6Ii8+Cjwvc3ZnPgo=',
      'AI Chatbots & Agents': 'https://cdn.simpleicons.org/googlegemini/8E75B2',
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
      'SignalR & WebSockets': 'Real-time bi-directional messaging, SignalR hubs, live activity feeds, and WebSocket synchronization.',
      'SignalR & Web Sockets': 'Real-time bi-directional messaging, SignalR hubs, live activity feeds, and WebSocket synchronization.',
      'Identity & RBAC (JWT)': 'Claims-based authentication, JWT bearer token lifecycle, and fine-grained enterprise role access control.',
      'AI Integration & LLMs': 'Integrating modern Generative AI models (Gemini API, OpenAI) into enterprise workflows for intelligent automation.',
      'AI Chatbots & Agents': 'Context-aware conversational assistants, portfolio AI copilots, knowledge retrieval and real-time streaming chat.',
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
