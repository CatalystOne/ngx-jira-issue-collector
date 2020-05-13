import { TriggerPosition } from './trigger-position.enum';

/**
 * Options for the Issue Collector
 */
export interface CollectorOptions {
  /**
   * Base url for the jira instance e.g.: https://jira.myorg.com
   */
  baseUrl: string;
  /**
   * The collector's unique ID, see:
   * https://confluence.atlassian.com/adminjiracloud/advanced-use-of-the-jira-issue-collector-788726105.html
   */
  collectorId: string;
  /**
   * Collector is enabled or not.
   */
  enabled?: boolean;
  /**
   * Should jira collect data from the reporter's browser? Defaults: location, referrer, user agent and resolution
   */
  recordWebInfo?: boolean;
  /**
   * Custom values for that will be added in case `recordWebInfo` is true.
   */
  environment?: { [key: string]: string };
  /**
   * Function returning custom values for that will be added in case `recordWebInfo` is true.
   */
  environmentFn?: () => { [key: string]: string };
  /**
   * Pre-populate values in the form, the key references a field in Jira.
   */
  fieldValues?: { [key: string]: string };
  /**
   * Function to pre-populate values in the form, the key references a field in Jira.
   */
  fieldValuesFn?: () => { [key: string]: string };
  /**
   * Position for default trigger (default TriggerPosition.TOP), use TriggerPosition.CUSTOM to disable the default.
   * ```
   * <div>
   *   <button (click)="collector.showDialog()">Click me!</button>
   *   <ngx-jira-issue-collector [configuration]="collectorConfiguration" #collector></ngx-jira-issue-collector>
   * </div>
   * ```
   */
  triggerPosition?: TriggerPosition;
  /**
   * Text for the trigger, fetched from Jira.
   */
  triggerText?: string;
  /**
   * Custom height for the dialog, e.g.: `500px`, but other CSS Units should work.
   */
  customHeight?: string;
}
