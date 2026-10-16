import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Message = { role: 'assistant' | 'user'; content: string };

@Component({
  selector: 'app-portfolio-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button class="portfolio-chat-trigger" type="button" (click)="isOpen = !isOpen" [attr.aria-expanded]="isOpen" aria-controls="portfolio-chat-panel">
      <span class="chat-spark">✦</span>
      <span>Ask Nouman AI</span>
    </button>

    <section *ngIf="isOpen" id="portfolio-chat-panel" class="portfolio-chat-panel" aria-label="Nouman's portfolio assistant">
      <header>
        <div>
          <span class="chat-status"></span>
          <strong>Nouman's Portfolio AI</strong>
          <small>Ask about Skills, Projects & Roles</small>
        </div>
        <button type="button" (click)="isOpen = false" aria-label="Close portfolio assistant">×</button>
      </header>

      <div class="chat-messages custom-thin-scroll" aria-live="polite">
        <div *ngFor="let item of messages" class="chat-message" [class.user]="item.role === 'user'">
          {{ item.content }}
        </div>
        <div *ngIf="loading" class="chat-message typing">
          <i></i><i></i><i></i>
        </div>
      </div>

      <div class="chat-suggestions" *ngIf="messages.length === 1">
        <button type="button" (click)="ask('What technologies does Nouman specialize in?')">Specialties</button>
        <button type="button" (click)="ask('Tell me about MaxOutCRM project')">MaxOutCRM</button>
        <button type="button" (click)="ask('What is Nouman\\'s experience in ASP.NET Core?')">ASP.NET Core</button>
        <button type="button" (click)="ask('How can I contact Nouman for job opportunities?')">Contact Info</button>
      </div>

      <form (ngSubmit)="ask()">
        <input [(ngModel)]="draft" name="portfolioQuestion" maxlength="700" autocomplete="off" placeholder="Ask about skills, projects or experience…" [disabled]="loading">
        <button type="submit" [disabled]="loading || !draft.trim()" aria-label="Send question">↗</button>
      </form>
      <p *ngIf="error" class="chat-error">{{ error }}</p>
    </section>
  `,
  styles: [`
    .portfolio-chat-trigger {
      position: fixed;
      right: 26px;
      bottom: 25px;
      z-index: 60;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(117,139,255,.8);
      border-radius: 999px;
      padding: 12px 18px;
      background: linear-gradient(110deg,#126cf6,#9d2fff);
      color: #fff;
      font: 700 13px 'DM Sans',sans-serif;
      box-shadow: 0 14px 35px rgba(53,62,244,.38);
      cursor: pointer;
      transition: all .25s ease;
    }
    .portfolio-chat-trigger:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 18px 40px rgba(84,50,255,.58);
    }
    .chat-spark {
      font-size: 16px;
      animation: chat-pulse 2.8s ease-in-out infinite;
    }
    .portfolio-chat-panel {
      position: fixed;
      z-index: 61;
      right: 26px;
      bottom: 84px;
      width: min(440px, calc(100vw - 32px));
      border: 1px solid rgba(103,138,255,.55);
      border-radius: 20px;
      overflow: hidden;
      background: linear-gradient(145deg,rgba(8,21,54,.98),rgba(3,10,28,.99));
      color: #eef3ff;
      box-shadow: 0 25px 70px rgba(0,0,0,.65);
      font-family: 'DM Sans', sans-serif;
      animation: chat-enter .25s cubic-bezier(.2,.8,.2,1) both;
    }
    .portfolio-chat-panel header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid rgba(92,133,255,.25);
      background: linear-gradient(90deg,rgba(26,96,255,.2),rgba(154,44,255,.16));
    }
    .portfolio-chat-panel header > div {
      display: grid;
      grid-template-columns: 10px 1fr;
      column-gap: 10px;
      align-items: center;
    }
    .portfolio-chat-panel strong { font-size: 14px; }
    .portfolio-chat-panel small { grid-column: 2; color: #9aadd3; font-size: 11px; margin-top: 2px; }
    .chat-status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #36e09a;
      box-shadow: 0 0 10px #36e09a;
    }
    .portfolio-chat-panel header button {
      color: #b9c9ee;
      font-size: 24px;
      line-height: 1;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;
    }
    .chat-messages {
      display: flex;
      min-height: 220px;
      max-height: 400px;
      overflow-y: auto;
      flex-direction: column;
      gap: 12px;
      padding: 18px;
      scrollbar-width: thin;
      scrollbar-color: rgba(98, 140, 255, 0.4) transparent;
    }
    .chat-messages::-webkit-scrollbar {
      width: 5px;
    }
    .chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    .chat-messages::-webkit-scrollbar-thumb {
      background: rgba(98, 140, 255, 0.4);
      border-radius: 10px;
    }
    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(140, 175, 255, 0.7);
    }
    .chat-message {
      align-self: flex-start;
      max-width: 88%;
      padding: 11px 15px;
      border: 1px solid rgba(98,130,222,.24);
      border-radius: 4px 14px 14px 14px;
      background: #112553;
      color: #dde8ff;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .chat-message.user {
      align-self: flex-end;
      border-color: rgba(170,82,255,.36);
      border-radius: 14px 4px 14px 14px;
      background: linear-gradient(120deg,#245cff,#872df2);
      color: #fff;
    }
    .chat-suggestions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      padding: 0 16px 12px;
    }
    .chat-suggestions button {
      border: 1px solid rgba(98,140,255,.45);
      border-radius: 999px;
      padding: 6px 10px;
      background: #0b1c44;
      color: #a9ceff;
      font-size: 11px;
      cursor: pointer;
      transition: background .2s ease;
    }
    .chat-suggestions button:hover {
      background: #153272;
      color: #fff;
    }
    .portfolio-chat-panel form {
      display: grid;
      grid-template-columns: 1fr 42px;
      gap: 8px;
      padding: 12px 16px 16px;
      border-top: 1px solid rgba(92,133,255,.2);
    }
    .portfolio-chat-panel input {
      box-sizing: border-box;
      margin: 0;
      padding: 11px 12px;
      font-size: 12px;
      border-radius: 8px;
    }
    .portfolio-chat-panel form button {
      border-radius: 8px;
      background: linear-gradient(135deg,#2776ff,#b32fff);
      color: #fff;
      font-size: 18px;
      border: 0;
      cursor: pointer;
    }
    .portfolio-chat-panel form button:disabled { opacity: .5; cursor: not-allowed; }
    .chat-error { margin: -6px 16px 10px; color: #ff9ab1; font-size: 11px; line-height: 1.4; }
    .typing { display: flex; gap: 4px; padding: 12px; }
    .typing i { width: 5px; height: 5px; border-radius: 50%; background: #b7c9ff; animation: typing 1.1s infinite; }
    .typing i:nth-child(2) { animation-delay: .15s; }
    .typing i:nth-child(3) { animation-delay: .3s; }
    @keyframes chat-enter { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }
    @keyframes typing { 50% { transform: translateY(-4px); opacity: .35; } }
    @keyframes chat-pulse { 50% { transform: scale(1.2) rotate(12deg); } }
    @media(max-width:520px) {
      .portfolio-chat-trigger { right: 15px; bottom: 15px; }
      .portfolio-chat-panel { right: 14px; bottom: 68px; }
    }
  `]
})
export class PortfolioChatComponent {
  isOpen = false;
  loading = false;
  draft = '';
  error = '';
  messages: Message[] = [
    {
      role: 'assistant',
      content: 'Hi! I am Nouman’s portfolio assistant. Ask me anything about his technical stack, ASP.NET Core & Angular projects, experience, or contact details.'
    }
  ];

  async ask(suggested?: string) {
    const question = (suggested ?? this.draft).trim();
    if (!question || this.loading) return;

    this.messages.push({ role: 'user', content: question });
    this.draft = '';
    this.error = '';
    this.loading = true;

    try {
      const response = await fetch('/api/portfolio-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history: this.messages.slice(-5)
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'The assistant is temporarily unavailable.');
      }
      this.messages.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'The assistant is temporarily unavailable.';
    } finally {
      this.loading = false;
    }
  }
}
