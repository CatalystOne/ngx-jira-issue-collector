import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJiraIssueCollectorComponent } from './ngx-jira-issue-collector.component';

describe('NgxJiraIssueCollectorComponent', () => {
  let component: NgxJiraIssueCollectorComponent;
  let fixture: ComponentFixture<NgxJiraIssueCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxJiraIssueCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJiraIssueCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
