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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isClient } from "../../utils";
var Device = /** @class */ (function () {
    function Device() {
        this._isAvailable = false;
        this._isAvailable = isClient() && this.checkAvailability();
    }
    Device.prototype.checkAvailability = function () {
        if (typeof navigator !== "undefined") {
            return true;
        }
        return false;
    };
    Device.prototype.getPlatform = function () {
        if (!this._isAvailable)
            return null;
        return navigator.platform;
    };
    Device.prototype.getLanguage = function () {
        if (!this._isAvailable)
            return null;
        return navigator.language;
    };
    Device.prototype.getVendor = function () {
        if (!this._isAvailable)
            return null;
        return navigator.vendor;
    };
    Device.prototype.getDeviceMemory = function () {
        if (!this._isAvailable)
            return null;
        if ("deviceMemory" in navigator) {
            // We are ignoring because deviceMemory is not yet supported by all browsers.
            /** @ts-ignore */
            return navigator.deviceMemory;
        }
        return null;
    };
    Device.prototype.getHardwareConcurrency = function () {
        if (!this._isAvailable)
            return null;
        if ("hardwareConcurrency" in navigator) {
            // We are ignoring because hardwareConcurrency is not yet supported by all browsers.
            /** @ts-ignore */
            return navigator.hardwareConcurrency;
        }
        return null;
    };
    Device.prototype.getGeolocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            if (!_this._isAvailable) {
                reject(null);
                return;
            }
            if (!((_a = navigator === null || navigator === void 0 ? void 0 : navigator.geolocation) === null || _a === void 0 ? void 0 : _a.getCurrentPosition)) {
                reject(null);
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    Device.prototype.getBattery = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._isAvailable) {
                reject(null);
                return;
            }
            if ("getBattery" in navigator) {
                // We are ignoring because getBattery is not yet supported by all browsers.
                /** @ts-ignore */
                navigator.getBattery().then(resolve, reject);
            }
            reject(null);
        });
    };
    Device.prototype.getUserAgent = function () {
        if (!this._isAvailable)
            return null;
        if ("userAgent" in navigator) {
            return navigator.userAgent;
        }
        return null;
    };
    Device.prototype.getConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!_this._isAvailable) {
                            reject(null);
                            return;
                        }
                        if ("connection" in navigator) {
                            /** @ts-ignore */
                            resolve(navigator.connection);
                        }
                        reject(null);
                    })];
            });
        });
    };
    Device.prototype.getScreen = function () {
        if (!this._isAvailable)
            return null;
        return {
            height: window.screen.height,
            width: window.screen.width,
        };
    };
    Device.prototype.getDeviceData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var battery, connection, geo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isAvailable) {
                            return [2 /*return*/, Promise.reject(null)];
                        }
                        return [4 /*yield*/, this.getBattery().catch(function (err) { return null; })];
                    case 1:
                        battery = _a.sent();
                        return [4 /*yield*/, this.getConnection().catch(function (err) { return null; })];
                    case 2:
                        connection = _a.sent();
                        ;
                        return [4 /*yield*/, this.getGeolocation().catch(function (err) { return null; })];
                    case 3:
                        geo = _a.sent();
                        ;
                        return [2 /*return*/, Promise.resolve({
                                platform: this.getPlatform(),
                                language: this.getLanguage(),
                                vendor: this.getVendor(),
                                deviceMemory: this.getDeviceMemory(),
                                hardwareConcurrency: this.getHardwareConcurrency(),
                                userAgent: this.getUserAgent(),
                                battery: {
                                    charging: battery === null || battery === void 0 ? void 0 : battery.charging,
                                    chargingTime: battery === null || battery === void 0 ? void 0 : battery.chargingTime,
                                    dischargingTime: battery === null || battery === void 0 ? void 0 : battery.dischargingTime,
                                    level: battery === null || battery === void 0 ? void 0 : battery.level,
                                },
                                connection: connection,
                                geo: geo
                            })];
                }
            });
        });
    };
    return Device;
}());
export { Device };
