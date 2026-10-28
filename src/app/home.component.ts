import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { projects, skills } from './portfolio.data';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- 3D INTERACTIVE WEBGL BACKGROUND CANVAS -->
    <div class="canvas-container" aria-hidden="true">
      <canvas #threeCanvas class="webgl-canvas"></canvas>
      <div class="ambient-glow glow-top"></div>
      <div class="ambient-glow glow-bottom"></div>
    </div>

    <!-- HERO SECTION WITH 3D DUAL-PERSONA INTERACTIVE SHOWCASE -->
    <section id="home" class="hero section">
      <div class="hero-copy">
        <div class="eyebrow-row">
          <span class="eyebrow available">
            <span class="pulse-emerald-dot"></span>
            Available for Enterprise & Contract Roles
          </span>
          <span class="location-badge">📍 Lahore, Pakistan • Global Remote</span>
        </div>

        <p class="mini-name">Hello, I'm <strong class="name-highlight">Nouman Ahmad</strong></p>
        
        <h1 class="hero-heading">
          Full Stack & Distributed<br>
          <span class="typewriter-container">
            <em class="gradient-text">{{ currentRoleText }}</em><span class="typewriter-cursor">|</span>
          </span>
        </h1>

        <p class="lead">
          Crafting ultra-scalable multi-tenant CRMs, high-throughput REST APIs, and real-time reactive SPAs utilizing 
          <strong>Angular 19, ASP.NET Core, SignalR & SQL Server.</strong>
        </p>

        <!-- Call to Actions -->
        <div class="hero-buttons">
          <a class="primary glow-btn" routerLink="/projects">
            <span>Explore Architecture & Projects</span>
            <span class="btn-arrow">→</span>
          </a>
          <a class="secondary" href="assets/documents/NoumanAhmad_FullStack.pdf" download>
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download CV (PDF)
          </a>
          <a class="whatsapp-btn" [href]="whatsAppLink" target="_blank" rel="noopener">
            <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="#25D366">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.16c-.24.68-1.2 1.25-1.72 1.33-.49.07-1.12.1-3.23-.77-2.69-1.11-4.44-3.83-4.57-4-.14-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.14.26.1.1.66 1.66 1.43.56.27.93.41 1.07.63.14.22.14.85-.1 1.53z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        <div class="stats">
          <div><b>2</b><span>Years Production Exp</span></div>
          <div><b>5+</b><span>Deployments Built</span></div>
          <div><b>99.9%</b><span>Architecture Uptime</span></div>
        </div>
      </div>

      <!-- 3D DUAL-PERSONA INTERACTIVE CARD WITH REAL USER IMAGES -->
      <div class="hero-visual">
        <div class="persona-switch-bar">
          <button 
            type="button" 
            [class.active]="activePersona === 'developer'" 
            (click)="activePersona = 'developer'">
            💻 Full Stack Creator
          </button>
          <button 
            type="button" 
            [class.active]="activePersona === 'executive'" 
            (click)="activePersona = 'executive'">
            👔 Enterprise Architect
          </button>
        </div>

        <!-- 3D Perspective Tilt Card -->
        <div 
          #personaCard 
          class="hero-persona-card" 
          (mousemove)="onCardMouseMove($event)" 
          (mouseleave)="onCardMouseLeave()">
          
          <div class="card-inner" [style.transform]="cardTransform">
            <!-- Glare reflection layer -->
            <div class="card-glare" [style.background]="cardGlare"></div>
            
            <div class="image-wrapper">
              <!-- Developer Portrait -->
              <img 
                *ngIf="activePersona === 'developer'" 
                src="assets/images/nouman-developer.jpg" 
                alt="Nouman Ahmad - Full Stack Creator"
                class="persona-img dev-img"
              />
              <!-- Executive Portrait -->
              <img 
                *ngIf="activePersona === 'executive'" 
                src="assets/images/nouman-executive.jpg" 
                alt="Nouman Ahmad - Enterprise Architect"
                class="persona-img exec-img"
              />
              
              <!-- Subtle gradient overlay -->
              <div class="card-overlay"></div>
            </div>

            <!-- Card Bottom Bar Info -->
            <div class="card-caption">
              <div class="caption-header">
                <div>
                  <h4 class="caption-name">Nouman Ahmad</h4>
                  <p class="caption-role">
                    {{ activePersona === 'developer' ? 'Lead Full Stack Specialist' : 'Enterprise Solutions Architect' }}
                  </p>
                </div>
                <span class="verified-badge" title="Verified Engineering Credentials">✓</span>
              </div>

              <!-- Tech chips corresponding to persona -->
              <div class="persona-chips" *ngIf="activePersona === 'developer'">
                <span>Angular 19</span>
                <span>TypeScript</span>
                <span>SignalR</span>
                <span>Tailwind</span>
              </div>
              <div class="persona-chips" *ngIf="activePersona === 'executive'">
                <span>ASP.NET Core</span>
                <span>ABP Framework</span>
                <span>SQL Server</span>
                <span>Clean Arch</span>
              </div>
            </div>

            <!-- Floating Micro Badges -->
            <div class="float-badge badge-top-left">
              <span class="dot-live">●</span>
              <span>Available for Hire</span>
            </div>
            <div class="float-badge badge-bottom-right">
              <span>99.9% Reliable Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LIVE MARQUEE WITH MODERN HIGH CONTRAST BADGES -->
    <section class="marquee" aria-label="Technology stack">
      <div class="marquee-track">
        <div class="tech-pill" *ngFor="let item of fullMarquee">
          <img [src]="item.icon" [alt]="item.name + ' icon'" loading="lazy">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- PRODUCTION ECOSYSTEM & DEPLOYMENT RADAR (VERCEL, NETLIFY, GITHUB, LOVABLE, REELS) -->
    <section class="ecosystem-section section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Production Ecosystem</span>
          <h2>Cloud Deployments & <em>Engineering Radar</em></h2>
        </div>
        <p class="section-subtitle">Battle-tested CI/CD pipelines, edge serverless hosting, and modern workflow velocity.</p>
      </div>

      <!-- Bento Grid for Ecosystem -->
      <div class="bento-grid">
        
        <!-- Bento Card 1: Vercel & Netlify Edge Deployment Hub -->
        <article class="bento-card bento-vercel">
          <div class="bento-header">
            <div class="badge-icon-row">
              <span class="hub-tag">Edge Infrastructure</span>
              <span class="status-live-pill"><span class="pulse-dot"></span> Edge CDN Active</span>
            </div>
            <h3>Vercel & Netlify Production Pipeline</h3>
            <p>Automated Git-triggered builds with zero-downtime rollouts, global edge caching, and serverless API gateways.</p>
          </div>
          
          <div class="edge-metrics-row">
            <div class="edge-stat">
              <span class="stat-number">24ms</span>
              <span class="stat-label">Global TTFB</span>
            </div>
            <div class="edge-stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">CI/CD Automation</span>
            </div>
            <div class="edge-stat">
              <span class="stat-number">Edge</span>
              <span class="stat-label">Distributed Network</span>
            </div>
          </div>

          <div class="bento-tags">
            <span>▲ Vercel Edge</span>
            <span>⚡ Netlify High-Avail</span>
            <span>✦ GitHub Actions</span>
            <span>☁ Cloudflare CDN</span>
          </div>
        </article>

        <!-- Bento Card 2: GitHub Repository & Open Source Velocity -->
        <article class="bento-card bento-github">
          <div class="bento-header">
            <div class="badge-icon-row">
              <span class="hub-tag">Source Control</span>
              <a href="https://github.com/mughalnouman" target="_blank" rel="noopener" class="hub-link">github.com/mughalnouman ↗</a>
            </div>
            <h3>Clean Architecture & Open Codebase</h3>
            <p>Strictly typed Angular 19 codebases, decoupled ASP.NET Core Clean Architecture solutions, and automated test suites.</p>
          </div>

          <div class="github-commit-sim">
            <div class="sim-header">
              <span class="branch-pill">main</span>
              <span class="sim-msg">feat: real-time SignalR notifications & multi-tenancy</span>
            </div>
            <div class="sim-grid">
              <div *ngFor="let cell of commitCells" [class]="'cell ' + cell"></div>
            </div>
          </div>

          <div class="bento-tags">
            <span>Repository Radar</span>
            <span>ABP Framework</span>
            <span>Clean Architecture</span>
            <span>Dockerized</span>
          </div>
        </article>

        <!-- Bento Card 3: Lovable & AI-Native Velocity Showcase -->
        <article class="bento-card bento-lovable">
          <div class="bento-header">
            <div class="badge-icon-row">
              <span class="hub-tag">Velocity Accelerator</span>
              <span class="tag-accent">AI-Powered Rapid Prototyping</span>
            </div>
            <h3>Lovable & Modern Frontend Velocity</h3>
            <p>Leveraging state-of-the-art generative engineering tools to prototype, iterate, and deliver responsive interfaces at 10x speed.</p>
          </div>

          <div class="velocity-meter">
            <div class="meter-bar">
              <div class="meter-fill" style="width: 95%"></div>
            </div>
            <div class="meter-labels">
              <span>Ideation to Live Deployment</span>
              <b>95% Velocity</b>
            </div>
          </div>

          <div class="bento-tags">
            <span>Lovable.dev</span>
            <span>Design-to-Code</span>
            <span>Component Tokens</span>
            <span>Tailwind CSS</span>
          </div>
        </article>

        <!-- Bento Card 4: Interactive Reels / Video Demo Player Card -->
        <article class="bento-card bento-reel">
          <div class="reel-frame">
            <div class="reel-top-bar">
              <div class="reel-user">
                <img src="assets/images/nouman-developer.jpg" alt="Nouman Avatar" class="reel-avatar">
                <div>
                  <span class="reel-name">&#64;mughalnouman</span>
                  <span class="reel-sub">Full Stack Reel</span>
                </div>
              </div>
              <span class="reel-follow-pill">Follow</span>
            </div>

            <!-- Simulated live animated demo inside reel -->
            <div class="reel-screen" (click)="toggleReelPlay()">
              <div class="reel-glow"></div>
              
              <!-- Animated terminal demonstration -->
              <div class="reel-code-run">
                <div class="code-line"><span class="c-kw">SignalR.Hub</span>.Broadcast(<span class="c-str">"NewTaskAssigned"</span>);</div>
                <div class="code-line"><span class="c-comment">// Enterprise CRM live sync: 0.12ms</span></div>
                <div class="code-line success-line">✓ WebSocket connected: client-app-39</div>
                <div class="code-line"><span class="c-prop">Tenant:</span> <span class="c-str">"MaxOut Corp"</span> [Active]</div>
              </div>

              <!-- Play / Pause Overlay Icon -->
              <div class="reel-play-btn">
                <span *ngIf="!reelPlaying">▶</span>
                <span *ngIf="reelPlaying" class="equalizer-bars">
                  <i></i><i></i><i></i><i></i>
                </span>
              </div>
            </div>

            <div class="reel-bottom-actions">
              <div class="reel-stats">
                <span>❤️ 1,420</span>
                <span>💬 89</span>
                <span>↗ 310</span>
              </div>
              <span class="reel-caption-text">Building enterprise CRM with Angular & .NET</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- FULL STACK ARCHITECTURE BLUEPRINT SECTION -->
    <section class="architecture-section section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">System Design</span>
          <h2>How I <em>Architect Enterprise Systems</em></h2>
        </div>
        <p class="section-subtitle">Decoupled Clean Architecture bridging resilient backend services with responsive SPAs.</p>
      </div>

      <div class="arch-tabs">
        <button [class.active]="activeArchTab === 'frontend'" (click)="activeArchTab = 'frontend'">
          <span>01.</span> Frontend Architecture
        </button>
        <button [class.active]="activeArchTab === 'backend'" (click)="activeArchTab = 'backend'">
          <span>02.</span> Backend & Clean APIs
        </button>
        <button [class.active]="activeArchTab === 'database'" (click)="activeArchTab = 'database'">
          <span>03.</span> Database & Cloud
        </button>
      </div>

      <div class="arch-card glass-panel" [ngSwitch]="activeArchTab">
        <!-- Frontend Tab -->
        <div *ngSwitchCase="'frontend'" class="arch-content">
          <div class="arch-text">
            <h3>Component-Driven & Reactive Frontends</h3>
            <p>
              I build enterprise-grade SPAs utilizing <strong>Angular 19 (Signals & RxJS)</strong>, structured into reusable feature modules, lazy-loaded routing, and optimized change detection.
            </p>
            <ul class="arch-points">
              <li><strong>Modern UI Kits:</strong> Pixel-perfect implementation with PrimeNG, Tailwind CSS, GSAP, and design tokens.</li>
              <li><strong>Real-Time Sync:</strong> Integrated WebSocket and SignalR hubs for instant notifications and live state updates.</li>
              <li><strong>Security:</strong> Client-side route guards, HTTP interceptors with automated JWT token refresh workflows.</li>
            </ul>
          </div>
          <div class="arch-badge-panel">
            <span class="arch-pill">Angular 19</span>
            <span class="arch-pill">TypeScript</span>
            <span class="arch-pill">PrimeNG</span>
            <span class="arch-pill">Tailwind CSS</span>
            <span class="arch-pill">RxJS & Signals</span>
            <span class="arch-pill">GSAP Motion</span>
            <span class="arch-pill">Three.js 3D</span>
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

    <!-- SELECTED PRODUCTION PROJECTS SECTION -->
    <section id="projects" class="projects section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Production Portfolio</span>
          <h2>Featured <em>Enterprise Work</em></h2>
        </div>
        <a class="text-link" routerLink="/projects">View All Projects →</a>
      </div>
      
      <div class="project-grid">
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
              <a *ngIf="project.live" [href]="project.live" target="_blank" rel="noopener">Live Demo ↗</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ABOUT SECTION WITH EDITORIAL REFINEMENT -->
    <section class="about section">
      <div class="about-photo glass-card">
        <img src="assets/images/nouman-executive.jpg" alt="Nouman Ahmad - Full Stack Developer">
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
        <span class="eyebrow">Engineering Leadership</span>
        <h2>Building Resilient Products with <em>Clarity, Velocity & Care</em></h2>
        <p>
          I am a Full Stack Developer with 2 years of hands-on production experience architecting enterprise applications with Angular 19 and ASP.NET Core across multi-tenant CRM, inventory ERP, and accounting platforms.
        </p>
        <p>
          My engineering methodology focuses on clean modular boundaries, decoupled service architecture, automated data pipelines, and responsive, accessible user interfaces that leave a lasting impression.
        </p>
        <div class="about-metrics">
          <div><b>2</b><span>Years Production Exp</span></div>
          <div><b>5+</b><span>Projects Completed</span></div>
          <div><b>100%</b><span>Client & Delivery Focus</span></div>
        </div>
        <div class="about-actions">
          <a class="primary" routerLink="/about">More About My Background <span>→</span></a>
          <a class="whatsapp-btn-alt" [href]="whatsAppLink" target="_blank" rel="noopener">Contact on WhatsApp ↗</a>
        </div>
      </div>
    </section>

    <!-- TECH STACK & PROFICIENCY -->
    <section id="skills" class="skills section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Production Toolkit</span>
          <h2>Engineered with <em>Modern Technologies</em></h2>
        </div>
      </div>
      <div class="skills-layout">
        <div class="skill-grid">
          <article *ngFor="let skill of skillCards" class="skill-card glass-card">
            <img class="skill-icon" [src]="skill.icon" [alt]="skill.name + ' logo'" loading="lazy">
            <span>{{ skill.name }}</span>
          </article>
        </div>
        <aside class="expertise glass-card">
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

    <!-- CONTACT SECTION WITH DIRECT CHANNELS -->
    <section class="contact section home-contact glass-panel">
      <div class="contact-copy">
        <span class="eyebrow available"><i></i> Available for work</span>
        <h2>Let's Build Something <em>Remarkable Together</em></h2>
        <p>I am actively open to discussing enterprise engineering opportunities, contract projects, and high-impact full-time roles.</p>
        
        <a class="contact-channel-item" [href]="gmailDirectLink" target="_blank" rel="noopener">
          <svg class="channel-icon gmail-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#EA4335" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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
          <span>Lahore, Pakistan (Open to Global Remote)</span>
        </span>
      </div>

      <form (ngSubmit)="submit()" #quickForm="ngForm" novalidate>
        <div *ngIf="submitted" class="success">
          <p><strong>Your message is ready!</strong> Click below to dispatch via Email or WhatsApp:</p>
          <div class="send-options" style="margin-top: 14px;">
            <button type="button" class="primary action-send-btn" (click)="openEmail()">
              <span>Send via Gmail</span>
            </button>
            <a class="secondary action-send-btn" [href]="whatsAppLink" target="_blank" rel="noopener">
              <span>Send via WhatsApp</span>
            </a>
          </div>
          <button type="button" class="text-link" style="margin-top: 12px; display: inline-block; background:none; border:none; color:#38bdf8; cursor:pointer;" (click)="resetForm()">Send another message</button>
        </div>

        <ng-container *ngIf="!submitted">
          <div class="form-row">
            <input name="name" [(ngModel)]="form.name" required placeholder="Your name">
            <input name="email" [(ngModel)]="form.email" required email placeholder="Your email">
          </div>
          <textarea name="message" [(ngModel)]="form.message" required placeholder="Tell me about your project, timeline, or engineering opportunity..."></textarea>
          <button class="primary glow-btn" type="submit" [disabled]="!form.name || !form.email || !form.message">Send Message <span>→</span></button>
          <p class="form-error" *ngIf="quickForm.submitted && (!form.name || !form.email || !form.message)">Please fill in your name, valid email and message.</p>
        </ng-container>
      </form>

      <div class="contact-map">
        <div class="map-grid"></div>
        <div>
          <span class="eyebrow">Connect Directly</span>
          <p>High-reliability software with speed and precision.</p>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') threeCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('personaCard') personaCardRef!: ElementRef<HTMLDivElement>;

  projects = projects;
  skills = skills;
  submitted = false;
  form = { name: '', email: '', message: '' };
  activeArchTab: 'frontend' | 'backend' | 'database' = 'frontend';
  activePersona: 'developer' | 'executive' = 'developer';
  reelPlaying = true;

  // 3D Card Tilt State
  cardTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  cardGlare = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)';

  // Three.js State
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animId: number = 0;
  private sphereMesh!: THREE.Mesh;
  private particlesMesh!: THREE.Points;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;

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
    { name: 'AI LLMs & Gemini', icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
    { name: 'AI Chatbots', icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHJvbGU9ImltZyIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPgogIDxwYXRoIGZpbGw9IiMxMEEzN0YiIGQ9Ik0yMi4yODE5IDkuODIxMWE1Ljk4NDcgNS45ODQ3IDAgMCAwLS41MTU3LTQuOTEwOCA2LjA0NjIgNi4wNDYyIDAgMCAwLTYuNTA5OC0yLjlBNi4wNjUxIDYuMDY1MSAwIDAgMCA0Ljk4MDcgNC4xODE4YTUuOTg0NyA1Ljk4NDcgMCAwIDAtMy45OTc3IDIuOSA2LjA0NjIgNi4wNDYyIDAgMCAwIC43NDI3IDcuMDk2NiA1Ljk4IDUuOTggMCAwIDAgLjUxMSA0LjkxMDcgNi4wNTEgNi4wNTEgMCAwIDAgNi41MTQ2IDIuOTAwMUE1Ljk4NDcgNS45ODQ3IDAgMCAwIDEzLjI1OTkgMjRhNi4wNTU3IDYuMDU1NyAwIDAgMCA1Ljc3MTgtNC4yMDU4IDUuOTg5NCA1Ljk4OTQgMCAwIDAgMy4yNTAyLTkuOTczMXptLTkuMDIyIDEyLjU2OTRhNC40NTUyIDQuNDU1MiAwIDAgMS0yLjg2NDMtMS4wMzY1bC4xNDEzLS4wOCA0Ljc1NzctMi43NDU2YS43OTA5Ljc5MDkgMCAwIDAgLjM5MDctLjY3Nzh2LTYuNzAyMmwyLjAxMDQgMS4xNjI3Yy4yMDA4LjEwMjMuMzQwNC4yOTQ3LjM3NjMuNTE4MXY1LjU1NjJhNC40Njk3IDQuNDY5NyAwIDAgMS00LjQ3MjEgNC40NzUxem0tOS42MTc3LTQuMTA4YTQuNDUwMyA0LjQ1MDMgMCAwIDEtLjUzMjEtMy4wMDFsLjE0MTIuMDg0OCA0Ljc2MjQgMi43NDU2YS43NjcyLjc2NzIgMCAwIDAgLjc3NyAwbDUuODE4MS0zLjM1MzN2Mi4zMjE2YzAgLjIxNi0uMTE1MS40MTI0LS4zMjkzLjUyNGwtNC44MTg3IDIuNzc4OGMtMi4xNDE1IDEuMjMzOC00Ljg3MzIuNS02LjExNTYtMS42Mzk3ek0yLjE2OSA3Ljg1OWE0LjQ2MzMgNC40NjMzIDAgMCAxIDIuMzU1LTEuOTY0MnY1LjY1MTdjMCAuMzI1Ni4xNzM2LjYyNzcuNDU1Ny42NzM4bDUuNzg5OCAzLjMzOTYtMi4wMTA0IDEuMTYyN2MtLjA3NTQuMDM3LS4xNjgzLjAzNy0uMjQzNyAwTDMuODA1MiAxMy45MzljLTIuMTM3My0xLjIzODUtMi44NzAyLTMuOTY5Mi0xLjYzNjItNi4xMDh6bTE2LjUxMyAzLjgzOGwtNS44MDg3LTMuMzcxOCAyLjAxMDQtMS4xNjI3Yy4wNzU0LS4wMzcuMTY4My0uMDM3LjI0MzcgMGw0LjgwOTMgMi43Nzg4YTQuNDc0NiA0LjQ3NDYgMCAwIDEtLjY3MzcgOC4wNzIydi01LjY1MThjMC0uMzE5My0uMTY3My0uNjE0My0uNDA1Mi0uNjY0NXptMi4wMDEtMy4wMDg0bC0uMTQxMy0uMDg0OC00Ljc1My0yLjcxOTZhLjc3MjIuNzcyMiAwIDAgMC0uNzgxNyAwbC01LjgxODEgMy4zNTMzVjYuODY4YzAtLjIxNi4xMTUxLS40MTI0LjMyOTItLjUyNGw0LjgwOTMtMi43MzM3YTQuNDc4MiA0LjQ3ODIgMCAwIDEgNi42NTAyIDQuNjM2MnptLTEyLjc3NjYgMy41MzVsLTIuMDEwNC0xLjE1OGMtLjA3NTQtLjA1NjQtLjEyMTUtLjE0NTUtLjEyMTUtLjI0MzdWNC4wNDM1YTQuNDc4MiA0LjQ3ODIgMCAwIDEgNy4zNDQ0LTMuNDM2bC0uMTQxMy4wOC00Ljc1NzcgMi43NDU2YS43OTA5Ljc5MDkgMCAwIDAtLjM5MDYuNjc3OGwtLjAwNDcgNi42ODgxem0xLjA5MjQtMi4zNTU2bDIuNTg5OC0xLjQ5MTMgMi41OTQ1IDEuNDkxM3YyLjk4MjdsLTIuNTg1MSAxLjQ5MTMtMi41OTQ1LTEuNDkxMy0uMDQ3Mi0yLjk4Mjd6Ii8+Cjwvc3ZnPgo=' },
    { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Microsoft Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
    { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' }
  ];

  fullMarquee = [
    ...this.marqueeTech,
    { name: 'SignalR & Sockets', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
    { name: 'JWT & RBAC', icon: 'https://cdn.simpleicons.org/jsonwebtokens/F33256' },
    { name: 'PrimeNG', icon: 'https://cdn.simpleicons.org/primeng/3B82F6' },
    { name: 'ABP Framework', icon: 'https://cdn.simpleicons.org/dotnet/8B5CF6' },
    { name: 'Three.js 3D', icon: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
    { name: 'GSAP Motion', icon: 'https://cdn.simpleicons.org/greensock/88CE02' },
    { name: 'Vercel Edge', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
    { name: 'Netlify Cloud', icon: 'https://cdn.simpleicons.org/netlify/00C7B7' }
  ];

  skillCards = [
    ...this.marqueeTech,
    { name: 'SignalR & Sockets', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
    { name: 'JWT & RBAC', icon: 'https://cdn.simpleicons.org/jsonwebtokens/F33256' },
    { name: 'PrimeNG', icon: 'https://cdn.simpleicons.org/primeng/3B82F6' },
    { name: 'ABP Framework', icon: 'https://cdn.simpleicons.org/dotnet/8B5CF6' },
    { name: 'Three.js 3D', icon: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
    { name: 'GSAP Motion', icon: 'https://cdn.simpleicons.org/greensock/88CE02' }
  ];

  expertiseList = [
    { label: 'Frontend Architecture (Angular 19 & Signals)', percentage: '95%' },
    { label: 'Backend Engineering (ASP.NET Core & C#)', percentage: '93%' },
    { label: 'AI Integration & Intelligent Chatbots (Gemini / OpenAI)', percentage: '91%' },
    { label: 'Database Design & EF Core (SQL Server)', percentage: '90%' },
    { label: 'Real-Time Services (SignalR & WebSockets)', percentage: '88%' },
    { label: 'Multi-Tenant Architecture (ABP Framework & RBAC)', percentage: '87%' }
  ];

  // Simulated GitHub Commit Grid (28 cells with activity classes)
  commitCells = [
    'c-1', 'c-2', 'c-3', 'c-2', 'c-4', 'c-3', 'c-4',
    'c-2', 'c-4', 'c-3', 'c-4', 'c-2', 'c-3', 'c-4',
    'c-3', 'c-2', 'c-4', 'c-4', 'c-3', 'c-4', 'c-2',
    'c-4', 'c-3', 'c-4', 'c-2', 'c-4', 'c-3', 'c-4'
  ];

  ngOnInit() {
    this.startTypewriter();
  }

  ngAfterViewInit() {
    this.initThreeJS();
    this.initGSAPAnimations();
  }

  ngOnDestroy() {
    if (this.typewriterTimer) {
      clearTimeout(this.typewriterTimer);
    }
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  /* -------------------------------------------------------------------------- */
  /* THREE.JS 3D INTERACTIVE WEBGL SCENE                                        */
  /* -------------------------------------------------------------------------- */
  private initThreeJS() {
    if (!this.threeCanvasRef) return;
    const canvas = this.threeCanvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    this.camera.position.z = 24;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Floating Icosahedron Wireframe Core
    const sphereGeo = new THREE.IcosahedronGeometry(7, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    this.sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    this.sphereMesh.position.set(7, -1, 0);
    this.scene.add(this.sphereMesh);

    // 2. Interactive Constellation Particles
    const particleCount = 750;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorViolet = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 45;
      positions[i + 2] = (Math.random() - 0.5) * 40;

      const mixed = Math.random() > 0.5 ? colorCyan : colorViolet;
      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });

    this.particlesMesh = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particlesMesh);

    // Start render loop
    this.renderThreeLoop();
  }

  private renderThreeLoop = () => {
    this.animId = requestAnimationFrame(this.renderThreeLoop);

    // Smooth lerp mouse response
    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    if (this.sphereMesh) {
      this.sphereMesh.rotation.y += 0.0025;
      this.sphereMesh.rotation.x += 0.0015;
      this.sphereMesh.rotation.x += this.targetY * 0.0005;
      this.sphereMesh.rotation.y += this.targetX * 0.0005;
    }

    if (this.particlesMesh) {
      this.particlesMesh.rotation.y -= 0.0008;
      this.particlesMesh.position.x = this.targetX * 0.8;
      this.particlesMesh.position.y = -this.targetY * 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  };

  @HostListener('window:resize')
  onWindowResize() {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove(e: MouseEvent) {
    this.mouseX = (e.clientX - window.innerWidth / 2) * 0.002;
    this.mouseY = (e.clientY - window.innerHeight / 2) * 0.002;
  }

  /* -------------------------------------------------------------------------- */
  /* 3D CARD PERSPECTIVE TILT                                                   */
  /* -------------------------------------------------------------------------- */
  onCardMouseMove(e: MouseEvent) {
    if (!this.personaCardRef) return;
    const card = this.personaCardRef.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    this.cardTransform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    this.cardGlare = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
  }

  onCardMouseLeave() {
    this.cardTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    this.cardGlare = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)';
  }

  /* -------------------------------------------------------------------------- */
  /* GSAP SCROLL & ENTRANCE ANIMATIONS                                          */
  /* -------------------------------------------------------------------------- */
  private initGSAPAnimations() {
    // Staggered hero reveal
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });
    heroTl
      .from('.eyebrow-row', { opacity: 0, y: -20, delay: 0.1 })
      .from('.mini-name', { opacity: 0, y: 15 }, '-=0.6')
      .from('.hero-heading', { opacity: 0, y: 25 }, '-=0.5')
      .from('.lead', { opacity: 0, y: 20 }, '-=0.5')
      .from('.hero-buttons', { opacity: 0, y: 20 }, '-=0.5')
      .from('.stats div', { opacity: 0, y: 20, stagger: 0.12 }, '-=0.5')
      .from('.hero-visual', { opacity: 0, scale: 0.95 }, '-=0.7');

    // ScrollTrigger reveals on Bento Cards
    gsap.utils.toArray('.bento-card').forEach((card: any, index: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        opacity: 0,
        y: 35,
        duration: 0.75,
        delay: index * 0.12,
        ease: 'power2.out'
      });
    });

    // ScrollTrigger reveals on Project Cards
    gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%'
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: (index % 2) * 0.15,
        ease: 'power2.out'
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* TYPEWRITER HEADLINE LOGIC                                                  */
  /* -------------------------------------------------------------------------- */
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
      speed = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 400;
    }

    this.typewriterTimer = setTimeout(() => this.startTypewriter(), speed);
  }

  toggleReelPlay() {
    this.reelPlaying = !this.reelPlaying;
  }

  get gmailDirectLink(): string {
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=mughalnouman678@gmail.com';
  }

  get whatsAppLink(): string {
    return `https://wa.me/923214940440?text=${encodeURIComponent(
      `Hello Nouman, I reviewed your portfolio and would like to discuss an engineering opportunity with you.\nName: ${this.form.name || 'Visitor'}\nMessage: ${this.form.message || ''}`
    )}`;
  }

  openEmail() {
    const subject = encodeURIComponent('Portfolio Inquiry from ' + (this.form.name || 'Visitor'));
    const body = encodeURIComponent(`Hello Nouman,\n\nI am ${this.form.name} (${this.form.email}).\n\n${this.form.message}`);
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
