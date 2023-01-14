/**
 * @license
 * Copyright 2023 Eren Kulaksiz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NexysCore } from "../core";
import type { APIConstructorParams, sendRequestParams } from "./types";

export class API {
  private core: NexysCore;
  private _server: string = "";
  private _apiKey: string = "";
  private _appName: string = "";
  public _sendingRequest: boolean = false;

  constructor(
    core: NexysCore,
    { server, apiKey, appName }: APIConstructorParams
  ) {
    this.core = core;
    this._server = server;
    this._apiKey = apiKey;
    this._appName = appName;
  }

  public async sendRequest({
    headers,
    data,
  }: sendRequestParams): Promise<Response | any> {
    if (!this.checkAvailability())
      throw new Error("fetch is not defined (node environment)");
    if (this._sendingRequest) {
      throw new Error("API:ALREADY_SENDING");
    }
    this._sendingRequest = true;
    this.core.Events.on.request.sending?.(data);

    return fetch(`${this._server}/api/${this._apiKey}/${this._appName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    }).then(async (res: Response) => {
      if (res?.ok) {
        this.core.InternalLogger.log("API: Request sent successfully.");
        this.requestCompleted();
        const json = await res.json();
        this.core.Events.on.request.success?.({ res, json });
        return {
          res,
          json,
        };
      }
      throw new Error(`API:FAILED:${res.status}`);
    });
  }

  public requestCompleted(): void {
    this._sendingRequest = false;
  }

  private checkAvailability() {
    return typeof fetch !== "undefined";
  }
}
