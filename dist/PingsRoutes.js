"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var PingsPage_1 = __importDefault(require("./Pings/PingsPage"));
var PingsRoutes = function () { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pings", element: react_1.default.createElement(PingsPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/pings/archived", element: react_1.default.createElement(PingsPage_1.default, { isArchive: true }) }))); };
exports.default = PingsRoutes;
