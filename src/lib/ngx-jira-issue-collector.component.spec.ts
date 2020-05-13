import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxJiraIssueCollectorComponent } from './ngx-jira-issue-collector.component';
import { DomSanitizer } from '@angular/platform-browser';
import { TriggerPosition } from './types';
/* tslint:disable:no-string-literal */
describe('NgxJiraIssueCollectorComponent', () => {
  let component: NgxJiraIssueCollectorComponent;
  let fixture: ComponentFixture<NgxJiraIssueCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxJiraIssueCollectorComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJiraIssueCollectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should print console error with missing configuration ', () => {
    const spy = spyOn(console, 'error');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call fetchCollectorConfiguration with configuration', () => {
    const spy = spyOn<any>(component, 'fetchCollectorConfiguration').and.callThrough();
    component.configuration = {
      baseUrl: 'http://jira.myorg.com',
      collectorId: 'coll123'
    };
    const url = TestBed.inject(DomSanitizer).bypassSecurityTrustResourceUrl(
      `http://jira.myorg.com/rest/collectors/1.0/template/form/coll123?os_authType=none`
    );
    component.setIframeSrc();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.iframeSrc).toEqual(url);
  });

  it('collectFeedback() should work with environment / environmentFn', () => {
    component.configuration = {
      baseUrl: 'http://jira.myorg.com',
      collectorId: 'coll123',
      recordWebInfo: true,
      environment: {
        'from-environment': 'test'
      },
      environmentFn: () => {
        return {
          'from-function-environment': 'test'
        };
      }
    };

    const feedback = component['collectFeedback']();
    expect(feedback).toContain('from-environment');
    expect(feedback).toContain('from-function-environment');
    expect(feedback).not.toContain('fake-feedback');
  });

  it('collectDefaultFieldValues() should work with fieldValues / fieldValuesFn', () => {
    component.configuration = {
      baseUrl: 'http://jira.myorg.com',
      collectorId: 'coll123',
      recordWebInfo: true,
      fieldValues: {
        summary: 'test'
      },
      fieldValuesFn: () => {
        return {
          description: 'test'
        };
      }
    };

    const defaultValues = component['collectDefaultFieldValues']();
    expect(defaultValues).toEqual({
      summary: 'test',
      description: 'test'
    });
    expect(defaultValues).not.toContain({
      fake: 'value'
    });
  });

  it('should assign correct css to trigger', () => {
    component.configuration = {
      baseUrl: 'http://jira.myorg.com',
      collectorId: 'coll123'
    };
    const defaultClasses = component.getTriggerClasses();
    expect(defaultClasses).toEqual('atlwdg-trigger atlwdg-TOP');
    expect(component.configuration.triggerPosition).toEqual(TriggerPosition.TOP);
    component.configuration.triggerPosition = TriggerPosition.CUSTOM;
    const custom = component.getTriggerClasses();
    expect(custom).toEqual('d-none');
    component.configuration.triggerPosition = TriggerPosition.RIGHT;
    const right = component.getTriggerClasses();
    expect(right).toEqual('atlwdg-trigger atlwdg-RIGHT');
    component.configuration.triggerPosition = TriggerPosition.SUBTLE;
    const subtle = component.getTriggerClasses();
    expect(subtle).toEqual('atlwdg-trigger atlwdg-SUBTLE');
  });
});
