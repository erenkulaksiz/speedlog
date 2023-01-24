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
import { API } from "../API";
import { Events } from "../events";
import { InternalLogger } from "./../internalLogger";
import { LocalStorage } from "./../localStorage";
import { LogPool } from "./../logPool";
import { Device } from "./../device";
import type { NexysOptions, logTypes, configTypes, configFunctions } from "../../types";
export declare class NexysCore {
    InternalLogger: InternalLogger;
    LogPool: LogPool;
    Events: Events;
    API: API;
    Device: Device;
    LocalStorage: LocalStorage;
    _apiKey: string;
    _version: string;
    _server: string;
    _logPoolSize: number;
    _options: NexysOptions;
    _isClient: boolean;
    _allowDeviceData: boolean;
    _sendAllOnType: NexysOptions["sendAllOnType"];
    _ignoreType: NexysOptions["ignoreType"];
    _ignoreTypeSize: number;
    _config: configTypes;
    constructor(API_KEY: string, options?: NexysOptions);
    /**
     * Automatic error handling.
     */
    private setupEventHandlers;
    private loadFromLocalStorage;
    /**
     * Adds log request to logPool in Nexys instance.
     *
     * @example
     * ```javascript
     * // Initialize the client and log "Hello World"
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
     * nexys.log("Hello World");
     * ```
     *
     * ```javascript
     * // Initialize the client and log "Hello World" with options
     * nexys.log("Hello World", { type: "info" });
     * ```
     *
     * @param data - Any data to be logged
     * @param options - `Optional` - Log options specified below
     * @param options.type - `Optional` - Log type
     * @param options.level - `Optional` - Log level
     * @param options.tags - `Optional` - Log tags
     *
     * @public
     */
    log(data: logTypes["data"], options?: logTypes["options"]): void;
    error(data: logTypes["data"], options?: logTypes["options"]): void;
    metric(metric: {
        id: string;
        label: string;
        name: string;
        startTime: number;
        value: number;
    }): void;
    /**
     * Configures Nexys instance. All logs sent to Nexys will use these configurations.
     * This method will help you trough identifying your logs where came from like which user or which device.
     *
     * @example
     * ```javascript
     * // Import and initialize the client
     * import Nexys from "nexys";
     *
     * const nexys = new Nexys("API_KEY", { appName: "My_app" });
     *
     * // Import types of config (Optional: If TypeScript is being used)
     * import type { configFunctions } from "nexys/dist/src/types";
     *
     * nexys.configure((config: configFunctions) => {
     *  // Set user
     *  config.setUser("123456789_UNIQUE_ID");
     *  // Set client version (likely to be your app version)
     *  config.setClient("1.0.0");
     * });
     * ```
     */
    configure(config: (config: configFunctions) => void): void;
    /**
     * This method will clear whatever stored in Nexys.
     *
     * @example
     * ```javascript
     * nexys.clear();
     * ```
     */
    clear(): void;
    /**
     * This method will force a request to Nexys.
     *
     * @example
     * ```javascript
     * nexys.forceRequest();
     * ```
     */
    forceRequest(): void;
}
//# sourceMappingURL=index.d.ts.map