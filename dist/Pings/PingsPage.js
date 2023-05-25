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
var solid_1 = require("@heroicons/react/20/solid");
var PingTabs_1 = __importDefault(require("./PingTabs"));
var useQuickStatusFilter_1 = __importDefault(require("./useQuickStatusFilter"));
var useFilterText_1 = __importDefault(require("./useFilterText"));
var PingData_1 = require("./PingData");
var AddPingOverlay_1 = __importDefault(require("./AddPingOverlay"));
var PingsPage = function (_a) {
    var _b = _a.isArchive, isArchive = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(''), pageNameState = _c[0], setPageNameState = _c[1];
    var _d = (0, useQuickStatusFilter_1.default)(), quickStatusFilter = _d[0], setQuickStatusFilter = _d[1];
    if (isArchive && pageNameState !== 'Archived Pings') {
        setPageNameState('Archived Pings');
    }
    else if (!isArchive && pageNameState !== 'Pings') {
        setPageNameState('Pings');
    }
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    var _e = (0, useFilterText_1.default)(), filterText = _e[0], setFilterText = _e[1];
    var _f = (0, react_1.useState)(false), addPingIsOpen = _f[0], setAddPingIsOpen = _f[1];
    var _g = (0, PingData_1.usePingData)(isArchive), status = _g.status, data = _g.data;
    var Tabs = (react_1.default.createElement(PingTabs_1.default, { activeHref: isArchive ? '/pings/archived' : '/pings', addPingOnClick: function () { setAddPingIsOpen(true); } }));
    if (status === 'loading') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            Tabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null)));
    }
    var portals = function () {
        if (addPingIsOpen) {
            return (0, buzzingpixel_mission_control_frontend_core_1.createPortal)(react_1.default.createElement(AddPingOverlay_1.default, { setIsOpen: setAddPingIsOpen }));
        }
        return null;
    };
    var pings = data;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (pings.length < 1) {
        if (isArchive) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                portals(),
                Tabs,
                react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(solid_1.SignalIcon, null), headline: "No Archived Pings" })));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            portals(),
            Tabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(solid_1.SignalIcon, null), headline: "No Pings", content: "Would you like to create a Ping?", actionText: "Add New Ping", actionUsesPlusIcon: true, actionButtonOnClick: function () { setAddPingIsOpen(true); } })));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, "TODO");
};
PingsPage.defaultProps = {
    isArchive: false,
};
exports.default = PingsPage;
