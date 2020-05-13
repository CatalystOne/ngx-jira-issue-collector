import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { NgxJiraIssueCollectorComponent } from './ngx-jira-issue-collector.component';

@NgModule({
  declarations: [NgxJiraIssueCollectorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  exports: [NgxJiraIssueCollectorComponent]
})
export class NgxJiraIssueCollectorModule { }
