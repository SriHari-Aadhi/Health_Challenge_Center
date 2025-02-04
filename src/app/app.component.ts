import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AddEntriesComponent } from './add-entries/add-entries.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ViewEntriesComponent } from './view-entries/view-entries.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, AddEntriesComponent, AnalysisComponent, ViewEntriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}) 
// @Component({
//   selector: 'app-root',
//   standalone: true, // Mark as standalone
//   template: `
//     <router-outlet></router-outlet>
    
//   `,
//   imports: [AddEntriesComponent, RouterOutlet, ViewEntriesComponent, AnalysisComponent] // Add the standalone component to imports
// })
  export class AppComponent {
   title = 'angulartailwind';
  //  this.router.navigateByUrl('/user');
 }


