import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
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

  // Back to top scroll state
  showBackToTop = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.showBackToTop = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // 1. Initial Page Load Architectural Preloader
  isPreloaderVisible = true;
  loadingProgress = 0;
  statusLog = 'Bootstrapping Nouman Ahmad Enterprise Architecture...';
  private preloaderInterval: any;

  private statusMessages = [
    { at: 15, msg: 'Initializing Angular 19 Reactive Signals... [OK]' },
    { at: 38, msg: 'Connecting ASP.NET Core Clean APIs & ABP Framework... [OK]' },
    { at: 65, msg: 'Spinning SignalR Real-Time Backplane & SQL Server... [OK]' },
    { at: 86, msg: 'Compiling Three.js 3D WebGL Shader Pipeline... [OK]' },
    { at: 98, msg: 'Architecture verified. Launching portfolio experience...' }
  ];

  // 2. URL Change / Route Transition Preloader
  isRouteLoading = false;
  routeProgress = 0;
  currentRouteLabel = '';
  private routeInterval: any;
  private routerSub: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initBootloader();
    this.initRoutePreloader();
  }

  ngOnDestroy() {
    if (this.preloaderInterval) {
      clearInterval(this.preloaderInterval);
    }
    if (this.routeInterval) {
      clearInterval(this.routeInterval);
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  /* -------------------------------------------------------------------------- */
  /* INITIAL BOOTLOADER                                                         */
  /* -------------------------------------------------------------------------- */
  private initBootloader() {
    const duration = 1500; // 1.5s snappy, energetic intro
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let step = 0;

    this.preloaderInterval = setInterval(() => {
      step++;
      const rawProgress = Math.min(100, Math.floor((step / steps) * 100));
      this.loadingProgress = rawProgress;

      for (const item of this.statusMessages) {
        if (this.loadingProgress >= item.at) {
          this.statusLog = item.msg;
        }
      }

      if (this.loadingProgress >= 100) {
        clearInterval(this.preloaderInterval);
        this.statusLog = 'SYSTEM INITIALIZED. WELCOME.';
        this.dismissBootloader();
      }
    }, intervalTime);
  }

  skipPreloader() {
    if (this.preloaderInterval) {
      clearInterval(this.preloaderInterval);
    }
    this.loadingProgress = 100;
    this.dismissBootloader(0.25);
  }

  private dismissBootloader(duration = 0.55) {
    if (typeof window !== 'undefined') {
      gsap.to('.cyber-preloader', {
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)',
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

  /* -------------------------------------------------------------------------- */
  /* ROUTE TRANSITION PRELOADER (TRIGGERED ON URL CHANGE)                       */
  /* -------------------------------------------------------------------------- */
  private initRoutePreloader() {
    this.routerSub = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Do not trigger route loader if initial bootloader is still running
        if (this.isPreloaderVisible) return;

        this.startRouteTransition(event.url);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.finishRouteTransition();
      }
    });
  }

  private startRouteTransition(url: string) {
    if (this.routeInterval) {
      clearInterval(this.routeInterval);
    }

    this.isRouteLoading = true;
    this.routeProgress = 20;
    this.currentRouteLabel = this.formatRouteName(url);

    // Rapid progress ticker for route changes
    this.routeInterval = setInterval(() => {
      if (this.routeProgress < 85) {
        this.routeProgress += Math.floor(Math.random() * 15) + 5;
      }
    }, 40);
  }

  private finishRouteTransition() {
    if (this.routeInterval) {
      clearInterval(this.routeInterval);
    }

    this.routeProgress = 100;

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        gsap.to('.route-preloader-pill', {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            this.isRouteLoading = false;
            this.routeProgress = 0;
          }
        });
      } else {
        this.isRouteLoading = false;
        this.routeProgress = 0;
      }
    }, 180);
  }

  private formatRouteName(url: string): string {
    const clean = url.split('?')[0].split('#')[0].replace('/', '');
    if (!clean) return 'Home';
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }
}
