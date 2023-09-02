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

import { Core } from ".";
import checkVersion from "../core/checkVersion.js";

export default async function loadFromLocalStorage(core: Core): Promise<void> {
  // Load logs from localStorage
  const localLogs = await core.LocalStorage.getLocalLogs();
  if (
    Array.isArray(localLogs) &&
    localLogs.length > 0 &&
    core._options.localStorage?.useLocalStorage
  ) {
    core.LogPool.setLogs(localLogs);
    core.InternalLogger.log(
      "NexysCore: Set logs from localStorage.",
      localLogs
    );
  } else if (
    Array.isArray(localLogs) &&
    localLogs.length == 0 &&
    core._options.localStorage?.useLocalStorage
  ) {
    core.InternalLogger.log("NexysCore: LocalStorage is empty, no logs found.");
  }

  // Load requests from localStorage
  const localRequests = await core.LocalStorage.getLocalRequests();
  if (
    Array.isArray(localRequests) &&
    localRequests.length > 0 &&
    core._options.localStorage?.useLocalStorage
  ) {
    core.LogPool.setRequests(localRequests);
    core.InternalLogger.log(
      "NexysCore: Set requests from localStorage.",
      localRequests
    );
  } else if (
    Array.isArray(localRequests) &&
    localRequests.length == 0 &&
    core._options.localStorage?.useLocalStorage
  ) {
    core.InternalLogger.log(
      "NexysCore: LocalStorage is empty, no requests found."
    );
  }

  if (core._options.localStorage?.useLocalStorage) {
    const localUser = await core.LocalStorage.getLocalUser();
    if (localUser) {
      core._config = {
        ...core._config,
        user: localUser,
      };
      core.InternalLogger.log(
        "NexysCore: Set user from localStorage.",
        localUser
      );
    } else {
      core.InternalLogger.log(
        "NexysCore: LocalStorage is empty, no user found."
      );
    }
  }

  const APIValues = await core.LocalStorage.getAPIValues();
  if (APIValues) {
    core._APIValues = APIValues;
    core.InternalLogger.log(
      "NexysCore: Set API values from localStorage.",
      APIValues
    );
    checkVersion(core);
  }
}
