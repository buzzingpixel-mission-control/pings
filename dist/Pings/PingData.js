"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAddPingMutation = exports.usePingData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var usePingData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive
        ? '/pings/list/archived'
        : '/pings/list';
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        staleTime: Infinity,
    });
};
exports.usePingData = usePingData;
var useAddPingMutation = function () { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        '/pings/list',
        '/pings/list/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: '/pings/add',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.POST,
    }); },
}); };
exports.useAddPingMutation = useAddPingMutation;
