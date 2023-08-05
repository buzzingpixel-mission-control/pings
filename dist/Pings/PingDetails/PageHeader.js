"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var react_1 = __importDefault(require("react"));
var PingEditButton_1 = __importDefault(require("./PingEditButton"));
var archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
var statusClasses = {
    Unknown: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    Healthy: 'text-green-700 bg-green-50 ring-green-600/20',
    'Pending Missing': 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    Missing: 'text-red-700 bg-red-50 ring-red-600/20',
};
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var PageHeader = function (_a) {
    var data = _a.data, fromProjectPageSlug = _a.fromProjectPageSlug;
    return (react_1.default.createElement("div", { className: "mb-8" },
        react_1.default.createElement("div", { className: "border-b border-gray-200 pb-4" },
            react_1.default.createElement("div", { className: "md:flex md:items-center md:justify-between md:space-x-5" },
                react_1.default.createElement("div", { className: "flex items-start space-x-5 overflow-hidden" },
                    react_1.default.createElement("div", { className: "pt-1.5" },
                        (function () {
                            if (!fromProjectPageSlug) {
                                return null;
                            }
                            return (react_1.default.createElement(react_router_dom_1.Link, { to: "/projects/".concat(fromProjectPageSlug), className: "relative inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mb-2" }, "\u2190 Back to Project"));
                        })(),
                        react_1.default.createElement("h1", { className: "text-2xl font-bold text-gray-900" }, data.title),
                        react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                            react_1.default.createElement("p", { className: classNames(archiveActiveStatuses[data.activeOrArchivedText], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, data.activeOrArchivedText),
                            (function () {
                                if (!data.isActive) {
                                    return null;
                                }
                                return (react_1.default.createElement("p", { className: classNames(statusClasses[data.statusReadable], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, data.statusReadable));
                            })(),
                            (function () {
                                if (!data.project) {
                                    return null;
                                }
                                return (react_1.default.createElement(react_router_dom_1.Link, { to: data.project.href, className: classNames('text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800', 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') },
                                    "Project:",
                                    ' ',
                                    data.project.title));
                            })()))),
                react_1.default.createElement("div", { className: "mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3" },
                    react_1.default.createElement(PingEditButton_1.default, { item: data }))))));
};
PageHeader.defaultProps = {
    fromProjectPageSlug: undefined,
};
exports.default = PageHeader;
