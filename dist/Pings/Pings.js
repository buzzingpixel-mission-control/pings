"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPings = exports.transformPing = exports.PingsSchema = exports.PingSchema = exports.mapPingStatusToReadable = exports.pingStatusList = exports.PingStatus = void 0;
var zod_1 = require("zod");
var PingStatus;
(function (PingStatus) {
    PingStatus["unknown"] = "";
    PingStatus["healthy"] = "healthy";
    PingStatus["pendingMissing"] = "pendingMissing";
    PingStatus["missing"] = "missing";
})(PingStatus = exports.PingStatus || (exports.PingStatus = {}));
exports.pingStatusList = [
    {
        name: 'All',
        value: '',
    },
    {
        name: 'Healthy',
        value: 'healthy',
    },
    {
        name: 'Pending Missing',
        value: 'pendingMissing',
    },
    {
        name: 'Missing',
        value: 'missing',
    },
];
var mapPingStatusToReadable = function (status) {
    switch (status) {
        case PingStatus.healthy:
            return 'Healthy';
        case PingStatus.pendingMissing:
            return 'Pending Missing';
        case PingStatus.missing:
            return 'Missing';
        default:
            return 'Unknown';
    }
};
exports.mapPingStatusToReadable = mapPingStatusToReadable;
exports.PingSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    projectId: zod_1.z.string().nullable(),
    pingId: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean(),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    status: zod_1.z.nativeEnum(PingStatus),
    expectEvery: zod_1.z.number(),
    warnAfter: zod_1.z.number(),
    lastPingAt: zod_1.z.string().nullable(),
    lastNotificationAt: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    checkInUrl: zod_1.z.string(),
});
exports.PingsSchema = zod_1.z.array(exports.PingSchema);
var transformPing = function (ping, projects) {
    projects = projects || [];
    var project;
    var filteredProjects = projects.filter(function (p) { return p.id === ping.projectId; });
    if (filteredProjects[0]) {
        // eslint-disable-next-line prefer-destructuring
        project = filteredProjects[0];
    }
    var lastPingAtDate = null;
    if (ping.lastPingAt) {
        lastPingAtDate = new Date(ping.lastPingAt);
    }
    var lastNotificationAtDate = null;
    if (ping.lastNotificationAt) {
        lastNotificationAtDate = new Date(ping.lastNotificationAt);
    }
    return (__assign(__assign({}, ping), { href: "/pings/".concat(ping.slug), lastPingAtDate: lastPingAtDate, lastNotificationAtDate: lastNotificationAtDate, createdAtDate: new Date(ping.createdAt), statusReadable: (0, exports.mapPingStatusToReadable)(ping.status), activeOrArchivedText: ping.isActive ? 'Active' : 'Archive', project: project }));
};
exports.transformPing = transformPing;
var transformPings = function (pings, projects) { return pings.map(function (ping) { return (0, exports.transformPing)(ping, projects); }); };
exports.transformPings = transformPings;
