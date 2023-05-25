"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var useQuickStatusFilter = function () {
    var _a;
    var _b = (0, react_router_dom_1.useSearchParams)(), searchParams = _b[0], setSearchParams = _b[1];
    var quickStatusFilter = (_a = searchParams.get('status')) !== null && _a !== void 0 ? _a : '';
    var setQuickStatusFilter = function (val) {
        setSearchParams(function (params) {
            if (!val) {
                params.delete('status');
            }
            else {
                params.set('status', val);
            }
            return params;
        });
    };
    return [
        quickStatusFilter,
        setQuickStatusFilter,
    ];
};
exports.default = useQuickStatusFilter;
