import { TestBed } from '@angular/core/testing';

import { NgxJiraIssueCollectorService } from './ngx-jira-issue-collector.service';

describe('NgxJiraIssueCollectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxJiraIssueCollectorService = TestBed.get(NgxJiraIssueCollectorService);
    expect(service).toBeTruthy();
  });
});
