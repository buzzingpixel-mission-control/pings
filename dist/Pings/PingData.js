"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArchiveSelectedPingsMutation = exports.useEditPingMutation = exports.useArchivePingMutation = exports.useAddPingMutation = exports.usePingData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var react_query_1 = require("@tanstack/react-query");
var Pings_1 = require("./Pings");
var usePingData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive
        ? '/pings/list/archived'
        : '/pings/list';
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
var useArchivePingMutation = function (pingId, isArchive, projectId) {
    var queryClient = (0, react_query_1.useQueryClient)();
    var invalidateQueryKeysOnSuccess = [
        '/pings/list',
        '/pings/list/archived',
    ];
    if (projectId) {
        invalidateQueryKeysOnSuccess.push("/pings/list/project/".concat(projectId));
    }
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/pings/".concat(isArchive ? 'un-archive' : 'archive', "/").concat(pingId),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
        options: {
            onMutate: function () { return __awaiter(void 0, void 0, void 0, function () {
                var previousPings, previousPingsArchives, pingMapper, newPings, newPingsArchive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryClient.cancelQueries({
                                queryKey: [['/pings/list']],
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryClient.cancelQueries({
                                    queryKey: [['/pings/list/archived']],
                                })];
                        case 2:
                            _a.sent();
                            previousPings = queryClient.getQueryData([['/pings/list']]);
                            previousPingsArchives = queryClient.getQueryData([['/pings/list/archived']]);
                            pingMapper = function (ping) {
                                if (ping.id === pingId) {
                                    ping.isActive = isArchive;
                                }
                                return ping;
                            };
                            if (previousPings) {
                                newPings = previousPings.map(pingMapper);
                                queryClient.setQueryData([['/pings/list']], newPings);
                            }
                            if (previousPingsArchives) {
                                newPingsArchive = previousPingsArchives.map(pingMapper);
                                queryClient.setQueryData([['/pings/list/archived']], newPingsArchive);
                            }
                            return [2 /*return*/, {
                                    previousPings: previousPings,
                                    previousPingsArchives: previousPingsArchives,
                                }];
                    }
                });
            }); },
        },
    });
};
exports.useArchivePingMutation = useArchivePingMutation;
var useEditPingMutation = function (pingId, slug) {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: [
            "/pings/".concat(slug),
            '/pings/list',
            '/pings/list/archived',
        ],
        prepareApiParams: function (data) { return ({
            uri: "/pings/edit/".concat(pingId),
            payload: data,
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
        options: {
            onMutate: function (data) { return __awaiter(void 0, void 0, void 0, function () {
                var formValues, previousPings, previousPingsArchived, pingMapper, newPings, newPingsArchive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formValues = data;
                            return [4 /*yield*/, queryClient.cancelQueries({
                                    queryKey: [['/pings/list']],
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryClient.cancelQueries({
                                    queryKey: [['/pings/list/archived']],
                                })];
                        case 2:
                            _a.sent();
                            previousPings = queryClient.getQueryData([['/pings/list']]);
                            previousPingsArchived = queryClient.getQueryData([['/pings/list/archived']]);
                            pingMapper = function (ping) {
                                if (ping.id === pingId) {
                                    ping.title = formValues.title;
                                    ping.expectEvery = formValues.expect_every;
                                    ping.warnAfter = formValues.warn_after;
                                    ping.projectId = formValues.project_id;
                                }
                                return ping;
                            };
                            if (previousPings) {
                                newPings = previousPings.map(pingMapper);
                                queryClient.setQueryData([['/pings/list']], newPings);
                            }
                            if (previousPingsArchived) {
                                newPingsArchive = previousPingsArchived.map(pingMapper);
                                queryClient.setQueryData([['/pings/list/archived']], newPingsArchive);
                            }
                            return [2 /*return*/, {
                                    previousPings: previousPings,
                                    previousPingsArchived: previousPingsArchived,
                                }];
                    }
                });
            }); },
        },
    });
};
exports.useEditPingMutation = useEditPingMutation;
var useArchiveSelectedPingsMutation = function (pings, isArchive) {
    var pingIds = pings.map(function (ping) { return ping.id; });
    var invalidateQueryKeysOnSuccess = [
        '/pings/list',
        '/pings/list/archived',
    ];
    pings.forEach(function (ping) {
        invalidateQueryKeysOnSuccess.push("/pings/".concat(ping.slug));
        if (!ping.projectId) {
            return;
        }
        var projectListingUrl = "/pings/list/project/".concat(ping.projectId);
        if (invalidateQueryKeysOnSuccess.indexOf(projectListingUrl) > -1) {
            return;
        }
        invalidateQueryKeysOnSuccess.push(projectListingUrl);
    });
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: invalidateQueryKeysOnSuccess,
        prepareApiParams: function () { return ({
            uri: "/pings/".concat(isArchive ? 'un-archive' : 'archive'),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
            payload: { pingIds: pingIds },
        }); },
    });
};
exports.useArchiveSelectedPingsMutation = useArchiveSelectedPingsMutation;
