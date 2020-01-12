import { StaticKit } from '@statickit/core';

import {
  FunctionArgs,
  FunctionSuccess,
  Failure,
  FunctionOptions
} from '@statickit/core/functions';

export { StaticKit, createClient } from '@statickit/core';

export namespace SendNotification {
  export interface Args extends FunctionArgs {
    subject: string;
    replyTo?: string;
    fields: object;
  }

  export interface Success extends FunctionSuccess {}
  export type Response = Success | Failure;
}

export function sendSupportEmail(
  client: StaticKit,
  args: SendNotification.Args,
  opts: FunctionOptions = {}
): Promise<SendNotification.Response> {
  return client.invokeFunction('sendSupportEmail', args, opts);
}
