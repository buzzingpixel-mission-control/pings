"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var solid_1 = require("@heroicons/react/20/solid");
var PingListItem_1 = __importDefault(require("./PingListItem"));
var PingList = function (_a) {
    var isArchive = _a.isArchive, items = _a.items;
    if (items.length < 1) {
        return (react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(solid_1.SignalIcon, null), headline: "No Pings match your filters" }));
    }
    return (react_1.default.createElement("div", { className: "bg-white rounded-md shadow-sm px-4" },
        react_1.default.createElement("ul", { className: "divide-y divide-gray-100" }, items.map(function (item) { return (react_1.default.createElement(PingListItem_1.default, { key: item.id, isArchive: isArchive, item: item })); }))));
};
exports.default = PingList;
