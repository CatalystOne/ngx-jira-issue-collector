# ngx-jira-issue-collector

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Commands

```bash
npm run {lint, test, build, commit, semantic-release}
```

## Compatibility

| Angular | Channel |
| ------- | ------- |
| 8.x.x   | 8.x     |
| 9.x.x   | 9.x     |
| 12.x.x  | 10.x    |
| 14.x.x  | 11.x    |
| 15.x.x  | 12.x    |

Ivy is partially enabled with v11.x of this library(https://angular.io/guide/creating-libraries#publishing-libraries)

Ivy compilation is disabled till v10.x of this library as per [docs](https://angular.io/guide/creating-libraries#publishing-your-library)

> Till v10.x of this library, it is not recommended to publish Ivy libraries to NPM repositories. Before publishing a library to NPM, build it using the --prod flag which will use the older compiler and runtime known as View Engine instead of Ivy.

| Jira   |
| ------ |
| v8.2.3 |

_Only tested with Jira Software_

## API

`import { NgxJiraIssueCollectorModule } from 'ngx-jira-issue-collector';`

### @Inputs

| Input         | Type                                                          | Required           |
| ------------- | ------------------------------------------------------------- | ------------------ |
| configuration | [CollectorOptions](./src/lib/types/collector-options.type.ts) | :heavy_check_mark: |

## Example

### Jira trigger

```ts
config: CollectorOptions = {
  baseUrl: 'https://jira.myorg.com',
  collectorId: 'coll123'
};
```

```html
<div>
  <ngx-jira-issue-collector [configuration]="config"></ngx-jira-issue-collector>
</div>
```

### Custom trigger

```ts
config: CollectorOptions = {
  baseUrl: 'https://jira.myorg.com',
  collectorId: 'coll123'
};
```

```html
<div>
  <button (click)="collector.showDialog()">Click me!</button>
  <ngx-jira-issue-collector [configuration]="config" #collector></ngx-jira-issue-collector>
</div>
```

### Custom environment

Environment are the properties sent to Jira if `CollectorOptions.recordWebInfo` is true. The default information, if the user allows collection, is:

```ts
const environment = {
  Location: window.location.href,
  Referrer: document.referrer,
  'User-Agent': navigator.userAgent,
  'Screen Resolution': screen.width + ' x ' + screen.height
};
```

Using `CollectorOptions.environment` and `CollectorOptions.environmentFn` you can specify other defaults to collect information about the user's environment.

```ts
config: CollectorOptions = {
  baseUrl: 'https://jira.myorg.com',
  collectorId: 'coll123',
  environment: {
    'custom-env': 'test'
  },
  environmentFn: () => {
    return {
      'custom-env2': 'test'
    };
  }
};
```

### Field values

Field values can be used to pre-populate fields in Jira, using `CollectorOptions.fieldValues` and `CollectorOptions.fieldValuesFn`.

```ts
config: CollectorOptions = {
  baseUrl: 'https://jira.myorg.com',
  collectorId: 'coll123',
  fieldValues: {
    summary: 'Title of ticket'
  },
  fieldValuesFn: () => {
    return {
      description: 'Textarea for in-depth description'
    };
  }
};
```

The keys should correspond to a field selected in the Issue collector configuration, for custom fields refer to the jira documentation.
