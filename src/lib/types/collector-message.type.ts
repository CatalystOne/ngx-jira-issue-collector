export interface CollectorMessage {
  messageType: string;
  feedbackString: string;
  fieldValues: { [key: string]: string };
}
