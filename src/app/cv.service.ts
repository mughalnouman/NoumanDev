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
    this.initFromQueryParamOrStorage();
  }

  /**
   * Detects ?target=global, ?cv=global, ?view=global, or ?mode=global from the URL.
   * If present, sets mode to 'global' and caches it in sessionStorage.
   */
  initFromQueryParamOrStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const targetParam = (
        urlParams.get('target') ||
        urlParams.get('cv') ||
        urlParams.get('view') ||
        urlParams.get('mode') ||
        urlParams.get('region')
      )?.toLowerCase();

      if (targetParam === 'global' || targetParam === 'remote' || targetParam === 'uae') {
        this.setMode('global');
        return;
      }

      if (targetParam === 'local' || targetParam === 'pk' || targetParam === 'pakistan') {
        this.setMode('local');
        return;
      }

      // Check session storage if previously set
      const cached = sessionStorage.getItem('preferred_cv_edition') as CvMode | null;
      if (cached === 'global' || cached === 'local') {
        this.mode.set(cached);
      }
    } catch {
      // Ignore storage access errors in restricted contexts
    }
  }

  setMode(mode: CvMode): void {
    this.mode.set(mode);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('preferred_cv_edition', mode);
      } catch {}
    }
  }

  toggleMode(): void {
    this.setMode(this.mode() === 'global' ? 'local' : 'global');
  }
}

