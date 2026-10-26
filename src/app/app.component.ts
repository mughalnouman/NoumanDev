import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PortfolioChatComponent } from './portfolio-chat.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, RouterOutlet, PortfolioChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  menuOpen = false;
  nav = [
    ['Home', '/'],
    ['About', '/about'],
    ['Experience', '/experience'],
    ['Projects', '/projects'],
    ['Skills', '/skills'],
    ['Contact', '/contact']
  ];

  // Preloader State
  isPreloaderVisible = true;
  loadingProgress = 0;
  statusLog = 'Bootstrapping Nouman Ahmad Architecture...';
  private preloaderInterval: any;

  private statusMessages = [
    { at: 12, msg: 'Initializing Angular 19 Reactive Signals... [OK]' },
    { at: 35, msg: 'Connecting ASP.NET Core Clean APIs & ABP... [OK]' },
    { at: 62, msg: 'Spinning SignalR Real-Time Backplane... [OK]' },
    { at: 84, msg: 'Loading Three.js 3D WebGL Shaders... [OK]' },
    { at: 98, msg: 'System verified. Launching portfolio experience...' }
  ];

  ngOnInit() {
    this.initPreloader();
  }

  ngOnDestroy() {
    if (this.preloaderInterval) {
      clearInterval(this.preloaderInterval);
    }
  }

  private initPreloader() {
    // Check if user already loaded in current session
    if (typeof window !== 'undefined' && sessionStorage.getItem('na_preloaded') === 'true') {
      this.isPreloaderVisible = false;
      return;
    }

    const duration = 1800; // 1.8 seconds total
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    this.preloaderInterval = setInterval(() => {
      step++;
      const rawProgress = Math.min(100, Math.floor((step / steps) * 100));

      // Natural loading fluctuation
      this.loadingProgress = rawProgress;

      // Update status messages according to percentage
      for (const item of this.statusMessages) {
        if (this.loadingProgress >= item.at) {
          this.statusLog = item.msg;
        }
      }

      if (this.loadingProgress >= 100) {
        clearInterval(this.preloaderInterval);
        this.statusLog = 'SYSTEM INITIALIZED. WELCOME.';
        this.dismissPreloader();
      }
    }, intervalTime);
  }

  skipPreloader() {
    if (this.preloaderInterval) {
      clearInterval(this.preloaderInterval);
    }
    this.loadingProgress = 100;
    this.dismissPreloader(0.3);
  }

  private dismissPreloader(duration = 0.65) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('na_preloaded', 'true');
    }

    if (typeof window !== 'undefined') {
      gsap.to('.cyber-preloader', {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: duration,
        ease: 'power3.inOut',
        onComplete: () => {
          this.isPreloaderVisible = false;
        }
      });
    } else {
      this.isPreloaderVisible = false;
    }
  }
}
