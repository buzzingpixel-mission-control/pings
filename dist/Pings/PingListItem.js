"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_2 = require("@headlessui/react");
var solid_1 = require("@heroicons/react/20/solid");
var PingData_1 = require("./PingData");
var PingListItemEditor_1 = __importDefault(require("./PingListItemEditor"));
var archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
var statuses = {
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
var PingListItem = function (_a) {
    var isArchive = _a.isArchive, item = _a.item, projectPageSlug = _a.projectPageSlug;
    var _b = (0, react_1.useState)(false), editIsOpen = _b[0], setEditIsOpen = _b[1];
    var archiveMutation = (0, PingData_1.useArchivePingMutation)(item.id, isArchive, item.projectId);
    var viewDetailsLink = item.href;
    if (projectPageSlug) {
        viewDetailsLink += "?fromProjectPageSlug=".concat(projectPageSlug);
    }
    return (react_1.default.createElement("li", null,
        react_1.default.createElement("div", { className: "sm:flex items-center justify-between gap-x-6 py-5" },
            react_1.default.createElement("div", { className: "min-w-0" },
                react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                    react_1.default.createElement("p", { className: "text-sm font-semibold leading-6 text-gray-900" }, item.title),
                    react_1.default.createElement("p", { className: classNames(archiveActiveStatuses[item.activeOrArchivedText], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, item.activeOrArchivedText),
                    (function () {
                        if (isArchive) {
                            return null;
                        }
                        return (react_1.default.createElement("p", { className: classNames(statuses[item.statusReadable], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, item.statusReadable));
                    })(),
                    (function () {
                        if (!item.project || projectPageSlug) {
                            return null;
                        }
                        return (react_1.default.createElement(react_router_dom_1.Link, { to: item.project.href, className: classNames('text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800', 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') },
                            "Project:",
                            ' ',
                            item.project.title));
                    })()),
                react_1.default.createElement("div", { className: "mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 truncate" },
                    react_1.default.createElement("p", null,
                        "Last Ping:",
                        ' ',
                        react_1.default.createElement("strong", null, item.lastPingAtDate ? item.lastPingAtDate.toLocaleDateString() : 'N/A')),
                    react_1.default.createElement("svg", { viewBox: "0 0 2 2", className: "h-0.5 w-0.5 fill-current" },
                        react_1.default.createElement("circle", { cx: 1, cy: 1, r: 1 })),
                    react_1.default.createElement("p", null,
                        "Expect Every:",
                        ' ',
                        react_1.default.createElement("strong", null, item.expectEvery),
                        ' ',
                        react_1.default.createElement("em", null, "minutes")),
                    react_1.default.createElement("svg", { viewBox: "0 0 2 2", className: "h-0.5 w-0.5 fill-current" },
                        react_1.default.createElement("circle", { cx: 1, cy: 1, r: 1 })),
                    react_1.default.createElement("p", null,
                        "Warn After:",
                        ' ',
                        react_1.default.createElement("strong", null, item.warnAfter),
                        ' ',
                        react_1.default.createElement("em", null, "minutes")),
                    react_1.default.createElement("svg", { viewBox: "0 0 2 2", className: "h-0.5 w-0.5 fill-current" },
                        react_1.default.createElement("circle", { cx: 1, cy: 1, r: 1 })),
                    react_1.default.createElement("p", null,
                        "Created",
                        ' ',
                        item.createdAtDate.toLocaleDateString()))),
            react_1.default.createElement("div", { className: "mt-2 sm:mt-0 flex flex-none items-center gap-x-4" },
                react_1.default.createElement(react_router_dom_1.Link, { to: viewDetailsLink, className: "block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" },
                    "View Details",
                    react_1.default.createElement("span", { className: "sr-only" },
                        ",",
                        item.title)),
                react_1.default.createElement(react_2.Menu, { as: "div", className: "relative flex-none" },
                    react_1.default.createElement(react_2.Menu.Button, { className: "-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" },
                        react_1.default.createElement("span", { className: "sr-only" }, "Open options"),
                        react_1.default.createElement(solid_1.EllipsisVerticalIcon, { className: "h-5 w-5", "aria-hidden": "true" })),
                    react_1.default.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                        react_1.default.createElement(react_2.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" },
                            react_1.default.createElement(react_2.Menu.Item, null, function (_a) {
                                var active = _a.active;
                                return (react_1.default.createElement("span", { className: classNames(active ? 'bg-gray-50' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900'), onClick: function () {
                                        setEditIsOpen(true);
                                    } },
                                    "Edit",
                                    react_1.default.createElement("span", { className: "sr-only" },
                                        ",",
                                        item.title)));
                            }),
                            react_1.default.createElement(react_2.Menu.Item, null, function (_a) {
                                var active = _a.active;
                                return (react_1.default.createElement("span", { className: classNames(active ? 'bg-gray-50' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900'), onClick: function () {
                                        archiveMutation.mutate(undefined);
                                    } },
                                    isArchive ? 'Un-archive' : 'Archive',
                                    react_1.default.createElement("span", { className: "sr-only" },
                                        ",",
                                        item.title)));
                            })))))),
        (function () {
            if (!editIsOpen) {
                return null;
            }
            return (react_1.default.createElement(PingListItemEditor_1.default, { item: item, setEditorIsOpen: setEditIsOpen }));
        })()));
};
PingListItem.defaultProps = {
    projectPageSlug: undefined,
};
exports.default = PingListItem;
