"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var ProjectsListing_1 = __importDefault(require("./Pings/ProjectsListing/ProjectsListing"));
var PingsBoot = function () {
    (0, buzzingpixel_mission_control_frontend_core_1.addProjectDetailsSection)({
        uniqueKey: 'pings',
        render: ProjectsListing_1.default,
    });
};
exports.default = PingsBoot;
