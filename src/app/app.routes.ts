import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PortfolioPageComponent } from './portfolio-page.component';
export const routes: Routes = [
  {path:'', component:HomeComponent, title:'Nouman Ahmad | Full Stack Developer'},
  {path:'about', component:PortfolioPageComponent, data:{page:'about'}, title:'About | Nouman Ahmad'},
  {path:'experience', component:PortfolioPageComponent, data:{page:'experience'}, title:'Experience | Nouman Ahmad'},
  {path:'skills', component:PortfolioPageComponent, data:{page:'skills'}, title:'Skills | Nouman Ahmad'},
  {path:'projects', component:PortfolioPageComponent, data:{page:'projects'}, title:'Projects | Nouman Ahmad'},
  {path:'projects/:slug', component:PortfolioPageComponent, data:{page:'case-study'}, title:'Case Study | Nouman Ahmad'},
  {path:'contact', component:PortfolioPageComponent, data:{page:'contact'}, title:'Contact | Nouman Ahmad'},
  {path:'**', redirectTo:''}
];
