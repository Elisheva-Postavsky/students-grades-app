import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [
  {path: 'data', component: DataComponent, title: 'Data - Students Grades'},
  {path: 'analysis', component: AnalysisComponent, title: 'Analysis - Students Grades'},
  {path: 'monitor', component: MonitorComponent, title: 'Monitor - Students Grades'},
  {path: '', redirectTo: '/data', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
