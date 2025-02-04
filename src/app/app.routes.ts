import { Routes } from '@angular/router';
import { AddEntriesComponent } from './add-entries/add-entries.component';
import { ViewEntriesComponent } from './view-entries/view-entries.component';
import { AnalysisComponent } from './analysis/analysis.component';

export const routes: Routes = [
    {path: 'add', component: AddEntriesComponent},
    {path: 'view', component: ViewEntriesComponent},
    {path: 'analysis', component: AnalysisComponent},
    { path: '', redirectTo: '/view', pathMatch: 'full' }
  ];
