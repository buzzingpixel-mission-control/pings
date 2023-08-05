"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var date_1 = __importDefault(require("locutus/php/datetime/date"));
var PingDetails = function (_a) {
    var data = _a.data;
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (react_1.default.createElement("div", { className: "max-w-6xl" },
        react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow sm:rounded-lg" },
            react_1.default.createElement("div", { className: "border-t border-gray-100" },
                react_1.default.createElement("dl", { className: "divide-y divide-gray-100" },
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Check In URL"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" },
                            react_1.default.createElement("input", { type: "text", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", value: data.checkInUrl, readOnly: true }))),
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Expect Every"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" },
                            data.expectEvery,
                            ' ',
                            "Minutes")),
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Warn After"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" },
                            data.warnAfter,
                            ' ',
                            "Minutes")),
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Last Ping At"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" }, data.lastPingAtDate
                            ? "".concat((0, date_1.default)('Y-m-d g:i:s A', data.lastPingAtDate), " (").concat(timezone, ")")
                            : 'N/A')),
                    react_1.default.createElement("div", { className: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" },
                        react_1.default.createElement("dt", { className: "text-sm font-medium text-gray-900" }, "Created"),
                        react_1.default.createElement("dd", { className: "mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" }, "".concat((0, date_1.default)('Y-m-d g:i:s A', data.createdAtDate), " (").concat(timezone, ")"))))))));
};
exports.default = PingDetails;
