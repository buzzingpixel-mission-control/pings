"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var react_router_dom_1 = require("react-router-dom");
var ProjectsListingData_1 = require("./ProjectsListingData");
var PingListItem_1 = __importDefault(require("../PingListItem"));
var ProjectsListing = function (_a) {
    var project = _a.project;
    var _b = (0, ProjectsListingData_1.useProjectListingData)(project.id), status = _b.status, data = _b.data;
    return (react_1.default.createElement("div", { className: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" },
        react_1.default.createElement("div", { className: "border-b border-gray-200 px-4 py-5 sm:px-6" },
            react_1.default.createElement("div", { className: "-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap" },
                react_1.default.createElement("div", { className: "ml-4 mt-2" },
                    react_1.default.createElement("h3", { className: "text-base font-semibold leading-6 text-gray-900" }, "Pings in this project")),
                react_1.default.createElement("div", { className: "ml-4 mt-2 flex-shrink-0" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/pings", className: "relative inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" }, "View All Pings \u2192")))),
        (function () {
            if (status === 'loading') {
                return (react_1.default.createElement("div", { className: "w-full overflow-hidden opacity-75 flex flex-col items-center justify-center", style: { height: '120px' } },
                    react_1.default.createElement("div", { className: "loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" })));
            }
            if (data.length < 1) {
                return (react_1.default.createElement("div", { className: "p-4" },
                    react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { headline: "No pings in this project" })));
            }
            return (react_1.default.createElement("div", { className: "shadow-sm px-4" },
                react_1.default.createElement("ul", { className: "divide-y divide-gray-100" }, data.map(function (item) { return (react_1.default.createElement(PingListItem_1.default, { key: item.id, isArchive: !item.isActive, item: item, projectPageSlug: project.slug })); }))));
        })()));
};
exports.default = ProjectsListing;
