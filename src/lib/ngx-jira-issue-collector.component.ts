import { Component, OnInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CollectorOptions, CollectorMessage, TriggerPosition } from './types';

@Component({
  selector: 'ngx-jira-issue-collector',
  templateUrl: './ngx-jira-issue-collector.component.html',
  styleUrls: ['./ngx-jira-issue-collector.component.scss']
})
export class NgxJiraIssueCollectorComponent implements OnInit {
  @ViewChild('iframeEl') private iframe: ElementRef<HTMLIFrameElement>;

  @Input() configuration?: CollectorOptions;

  configLoaded = false;
  iframeSrc: SafeResourceUrl;
  hidden = true;
  loader = false;
  created = false;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit(): void {
    if (this.configuration && this.configuration.baseUrl && this.configuration.collectorId) {
      this.fetchCollectorConfiguration().subscribe((config: CollectorOptions) => {
        this.updateConfiguration(config);
        this.setIframeSrc();
        this.configLoaded = true;
      });
    } else {
      console.error(`Missing configuration, requirement is: baseUrl and collectorId`);
    }
  }

  updateConfiguration = (config: CollectorOptions) => {
    const conf = {
      ...this.configuration,
      ...config
    };
    this.configuration = conf;
  };

  setIframeSrc = () => {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.configuration.baseUrl}/rest/collectors/1.0/template/form/${this.configuration.collectorId}?os_authType=none`
    );
  };

  @HostListener('document:keydown.escape')
  hideDialog = (): void => {
    if (!this.hidden) {
      this.hide();
    }
  };

  showDialog = (): void => {
    if (!this.loader) {
      this.loader = true;
      this.created = true;
    }
  };

  emitMessage = (): void => {
    if (!this.iframe) {
      return;
    }
    const message: CollectorMessage = {
      messageType: 'collector.iframe.loaded',
      feedbackString: this.collectFeedback(),
      fieldValues: this.collectDefaultFieldValues()
    };
    this.iframe.nativeElement.contentWindow.postMessage(JSON.stringify(message), this.configuration.baseUrl);
  };

  private collectFeedback = (): string => {
    if (!this.configuration.recordWebInfo) {
      return '';
    }
    let feedback: { [key: string]: string } = {
      Location: window.location.href,
      Referrer: document.referrer,
      'User-Agent': navigator.userAgent,
      'Screen Resolution': screen.width + ' x ' + screen.height
    };
    if (this.configuration.environment) {
      feedback = {
        ...feedback,
        ...this.configuration.environment
      };
    }
    if (this.configuration.environmentFn) {
      feedback = {
        ...feedback,
        ...this.configuration.environmentFn()
      };
    }
    const feedbackArray: string[] = [];
    for (const prop in feedback) {
      if (feedback.hasOwnProperty(prop) && feedback[prop] && typeof feedback[prop] === 'string') {
        feedbackArray.push('*' + prop + '*: ' + feedback[prop]);
      }
    }
    return feedbackArray.join('\n');
  };

  private collectDefaultFieldValues = (): { [key: string]: string } => {
    let defaultValues = {};
    if (this.configuration.fieldValues) {
      defaultValues = {
        ...defaultValues,
        ...this.configuration.fieldValues
      };
    }
    if (this.configuration.fieldValuesFn) {
      defaultValues = {
        ...defaultValues,
        ...this.configuration.fieldValuesFn()
      };
    }
    return defaultValues;
  };

  private hide = (): void => {
    this.hidden = true;
    this.created = false;
  };

  private show = (): void => {
    this.hidden = false;
    this.loader = false;
  };

  @HostListener('window:message', ['$event'])
  eventListener = (message: MessageEvent): void => {
    if (message && this.iframe && message.source === this.iframe.nativeElement.contentWindow && message.data) {
      if (message.data === 'cancelFeedbackDialog') {
        this.hide();
      } else if (message.data === 'collectorLoaded') {
        this.show();
      }
    }
  };

  getTriggerClasses = (): string => {
    if (!this.configuration.triggerPosition) {
      this.configuration.triggerPosition = TriggerPosition.TOP;
    }
    let classes = '';
    switch (this.configuration.triggerPosition) {
      case TriggerPosition.CUSTOM:
        classes = 'd-none';
        break;
      case TriggerPosition.RIGHT:
        classes = 'atlwdg-trigger atlwdg-RIGHT';
        break;
      case TriggerPosition.SUBTLE:
        classes = 'atlwdg-trigger atlwdg-SUBTLE';
        break;
      default:
        classes = 'atlwdg-trigger atlwdg-TOP';
    }
    return classes;
  };

  private fetchCollectorConfiguration = (): Observable<CollectorOptions> => {
    return this.http.jsonp<CollectorOptions>(
      `${this.configuration.baseUrl}/rest/collectors/1.0/configuration/trigger/${this.configuration.collectorId}?os_authType=none`,
      'callback'
    );
  };
}
