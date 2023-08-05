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
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var EditPingOverlay_1 = __importDefault(require("./EditPingOverlay"));
var PingEditButton = function (_a) {
    var item = _a.item;
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        (function () {
            if (!isOpen) {
                return null;
            }
            return (0, buzzingpixel_mission_control_frontend_core_1.createPortal)(react_1.default.createElement(EditPingOverlay_1.default, { item: item, setIsOpen: setIsOpen }));
        })(),
        react_1.default.createElement("button", { type: "button", className: "inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600", onClick: function () {
                setIsOpen(true);
            } }, "Edit")));
};
exports.default = PingEditButton;
