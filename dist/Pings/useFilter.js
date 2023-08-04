"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var useFilterText_1 = __importDefault(require("./useFilterText"));
var FilterInput = function (_a) {
    var filterText = _a.filterText, setFilterText = _a.setFilterText;
    return (react_1.default.createElement("input", { key: "use-filter-ping-input", type: "text", name: "filter", id: "filter", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", placeholder: "Filter results", value: filterText, onChange: function (e) {
            setFilterText(e.target.value);
        } }));
};
var useFilter = function () {
    var _a = (0, useFilterText_1.default)(), filterText = _a[0], setFilterText = _a[1];
    return {
        filterText: filterText,
        FilterInput: react_1.default.createElement(FilterInput, { key: "use-filter-ping-input-component", filterText: filterText, setFilterText: setFilterText }),
        setFilterText: setFilterText,
    };
};
exports.default = useFilter;
