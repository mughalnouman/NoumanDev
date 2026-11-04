import { Injectable, signal, computed } from '@angular/core';

export type CvMode = 'global' | 'local';

export interface CvProfile {
  mode: CvMode;
  fileName: string;
  url: string;
  buttonText: string;
  tag: string;
  tagEmoji: string;
  editionLabel: string;
  badgeNote: string;
}

@Injectable({
  providedIn: 'root'
})
export class CvService {
  readonly mode = signal<CvMode>('local');
  readonly detectedRegion = signal<'pakistan' | 'international'>('pakistan');
  private hasExplicitParam = false;

  readonly profiles: Record<CvMode, CvProfile> = {
    global: {
      mode: 'global',
      fileName: 'Nouman_Ahmad_Global_Resume.pdf',
      url: 'assets/documents/Nouman_Ahmad_Global_Resume.pdf',
      buttonText: 'Download Resume',
      tag: 'Global / UAE & Remote',
      tagEmoji: '🌍',
      editionLabel: 'Global Edition (UAE & Remote Relocation)',
      badgeNote: 'Open to UAE Relocation & Global Remote'
    },
    local: {
      mode: 'local',
      fileName: 'Nouman_Ahmad_Pakistan_CV.pdf',
      url: 'assets/documents/Nouman_Ahmad_Pakistan_CV.pdf',
      buttonText: 'Download Resume',
      tag: 'Pakistan / Local',
      tagEmoji: '🇵🇰',
      editionLabel: 'Standard Edition (Pakistan & Enterprise)',
      badgeNote: 'Enterprise & Local Market Ready'
    }
  };

  readonly current = computed(() => this.profiles[this.mode()]);

  constructor() {
    this.initCvMode();
  }

  /**
   * Smart Multi-Tier Detection Architecture:
   * 1. Explicit URL Query Parameter (?target=global / ?target=local / ?cv=global / ?cv=local)
   *    -> Highest priority for direct recruiter links. If provided, disables auto-override.
   * 2. Instant Synchronous Browser Timezone & Offset Detection:
   *    -> Asia/Karachi or UTC+5 offset (-300 mins) -> Pakistan Local CV
   *    -> International timezones (America, Europe, Asia/Dubai, etc.) -> Global Resume
   * 3. Non-blocking Async IP Country Verification (api.country.is):
   *    -> Verifies real visitor IP country silently in background.
   *    -> country === 'PK' -> 'local', otherwise -> 'global'.
   */
  initCvMode(): void {
    if (typeof window === 'undefined') return;

    try {
      // Clear legacy trapped sessionStorage from earlier manual toggle tests
      sessionStorage.removeItem('preferred_cv_edition');

      // 1. Explicit URL Query Parameter (Highest Priority)
      const urlParams = new URLSearchParams(window.location.search);
      const targetParam = (
        urlParams.get('target') ||
        urlParams.get('cv') ||
        urlParams.get('view') ||
        urlParams.get('mode') ||
        urlParams.get('region')
      )?.toLowerCase();

      if (targetParam === 'global' || targetParam === 'remote' || targetParam === 'uae' || targetParam === 'intl') {
        this.hasExplicitParam = true;
        this.detectedRegion.set('international');
        this.mode.set('global');
        return;
      }

      if (targetParam === 'local' || targetParam === 'pk' || targetParam === 'pakistan') {
        this.hasExplicitParam = true;
        this.detectedRegion.set('pakistan');
        this.mode.set('local');
        return;
      }

      // 2. Intelligent Browser Timezone / Geolocation Detection
      const isFromPakistan = this.detectIsPakistanLocation();
      this.detectedRegion.set(isFromPakistan ? 'pakistan' : 'international');
      this.mode.set(isFromPakistan ? 'local' : 'global');

      // 3. Background IP Verification (Silent & Non-blocking)
      this.verifyLocationByIp();
    } catch {
      // Safe fallback to Pakistan local edition
      this.mode.set('local');
    }
  }

  // Alias for backwards compatibility
  initFromQueryParamOrStorage(): void {
    this.initCvMode();
  }

  /**
   * Detects whether visitor is in Pakistan based on timezone, offset, and locale.
   */
  detectIsPakistanLocation(): boolean {
    if (typeof window === 'undefined') return true;

    try {
      // A. Check resolved IANA TimeZone (e.g. "Asia/Karachi")
      const timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
      if (timeZone.includes('karachi') || timeZone.includes('pakistan') || timeZone === 'asia/karachi') {
        return true;
      }

      // B. Check TimeZone Offset (-300 minutes = UTC+5 = Pakistan Standard Time)
      const offset = new Date().getTimezoneOffset();
      if (offset === -300) {
        return true;
      }

      // C. If timezone is explicitly set to another known foreign hub (Dubai, London, NY, etc.)
      if (timeZone && timeZone !== 'asia/karachi') {
        return false;
      }

      // D. Check browser navigator locale (e.g. "ur-PK", "en-PK")
      const languages = navigator.languages || [navigator.language || ''];
      const hasPkLocale = languages.some(lang => lang && lang.toUpperCase().includes('PK'));
      return hasPkLocale;
    } catch {
      return true;
    }
  }

  /**
   * Asynchronously verifies real country code using lightweight IP Geolocation.
   */
  private verifyLocationByIp(): void {
    if (typeof window === 'undefined' || this.hasExplicitParam) return;

    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = setTimeout(() => controller?.abort(), 2500);

      fetch('https://api.country.is', {
        signal: controller?.signal,
        cache: 'no-cache'
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          clearTimeout(timeoutId);
          if (data?.country && !this.hasExplicitParam) {
            const isPk = data.country.toUpperCase() === 'PK';
            this.detectedRegion.set(isPk ? 'pakistan' : 'international');
            this.mode.set(isPk ? 'local' : 'global');
          }
        })
        .catch(() => {
          // Timezone detection already set the correct state synchronously
        });
    } catch {}
  }

  setMode(mode: CvMode): void {
    this.mode.set(mode);
  }

  toggleMode(): void {
    this.setMode(this.mode() === 'global' ? 'local' : 'global');
  }
}
