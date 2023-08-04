"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Pings_1 = require("./Pings");
var PingQuickStatusFilterSelect = function (_a) {
    var quickStatusFilter = _a.quickStatusFilter, setQuickStatusFilter = _a.setQuickStatusFilter;
    console.log('here');
    return (react_1.default.createElement("select", { id: "statusFilter", name: "statusFilter", className: "block w-full rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500", defaultValue: quickStatusFilter, value: quickStatusFilter, onChange: function (e) {
            setQuickStatusFilter(e.target.value);
        } }, Pings_1.pingStatusList.map(function (filterStatus) { return (react_1.default.createElement("option", { key: filterStatus.value, value: filterStatus.value }, filterStatus.name)); })));
};
exports.default = PingQuickStatusFilterSelect;
