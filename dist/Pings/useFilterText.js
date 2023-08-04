"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var useFilterText = function () {
    var _a;
    var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
    var _b = (0, react_1.useState)((_a = searchParams.get('filter')) !== null && _a !== void 0 ? _a : ''), filterText = _b[0], setFilterText = _b[1];
    (0, buzzingpixel_mission_control_frontend_core_1.useUpdateQueryStringValueWithoutNav)('filter', filterText);
    return [
        filterText,
        setFilterText,
    ];
};
exports.default = useFilterText;
