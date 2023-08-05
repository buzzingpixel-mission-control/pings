"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePingDetailsData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var Pings_1 = require("../Pings");
// eslint-disable-next-line import/prefer-default-export
var usePingDetailsData = function (slug) {
    var uri = "/pings/".concat(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: Pings_1.PingSchema,
        staleTime: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
        refetchInterval: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
        };
    }
    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'error',
        };
    }
    return {
        status: 'success',
        data: (0, Pings_1.transformPing)(response.data, projects.data),
    };
};
exports.usePingDetailsData = usePingDetailsData;
