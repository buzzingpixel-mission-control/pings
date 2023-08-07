"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectListingData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var Pings_1 = require("../Pings");
// eslint-disable-next-line import/prefer-default-export
var useProjectListingData = function (projectId) {
    var uri = "/pings/list/project/".concat(projectId);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: Pings_1.PingsSchema,
        staleTime: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
        refetchInterval: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }
    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }
    return {
        status: 'success',
        data: (0, Pings_1.transformPings)(response.data, projects.data),
    };
};
exports.useProjectListingData = useProjectListingData;
