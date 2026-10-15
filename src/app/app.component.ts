import { Component, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PortfolioChatComponent } from './portfolio-chat.component';
@Component({selector:'app-root', standalone:true, imports:[NgFor,RouterLink,RouterLinkActive,RouterOutlet,PortfolioChatComponent], templateUrl:'./app.component.html', styleUrl:'./app.component.css', encapsulation:ViewEncapsulation.None})
export class AppComponent { menuOpen=false; nav=[['Home','/'],['About','/about'],['Experience','/experience'],['Projects','/projects'],['Skills','/skills'],['Contact','/contact']]; }
