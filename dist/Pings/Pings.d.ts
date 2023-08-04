import { z } from 'zod';
import { ProjectsWithViewOptions, ProjectWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';
export declare enum PingStatus {
    unknown = "",
    healthy = "healthy",
    pendingMissing = "pendingMissing",
    missing = "missing"
}
export declare const pingStatusList: {
    name: string;
    value: string;
}[];
export declare const mapPingStatusToReadable: (status: PingStatus) => "Healthy" | "Pending Missing" | "Missing" | "Unknown";
export declare const PingSchema: z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodNullable<z.ZodString>;
    pingId: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    status: z.ZodNativeEnum<typeof PingStatus>;
    expectEvery: z.ZodNumber;
    warnAfter: z.ZodNumber;
    lastPingAt: z.ZodNullable<z.ZodString>;
    lastNotificationAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    projectId?: string;
    pingId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    status?: PingStatus;
    expectEvery?: number;
    warnAfter?: number;
    lastPingAt?: string;
    lastNotificationAt?: string;
    createdAt?: string;
}, {
    id?: string;
    projectId?: string;
    pingId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    status?: PingStatus;
    expectEvery?: number;
    warnAfter?: number;
    lastPingAt?: string;
    lastNotificationAt?: string;
    createdAt?: string;
}>;
export type Ping = z.infer<typeof PingSchema>;
export declare const PingsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodNullable<z.ZodString>;
    pingId: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    status: z.ZodNativeEnum<typeof PingStatus>;
    expectEvery: z.ZodNumber;
    warnAfter: z.ZodNumber;
    lastPingAt: z.ZodNullable<z.ZodString>;
    lastNotificationAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    projectId?: string;
    pingId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    status?: PingStatus;
    expectEvery?: number;
    warnAfter?: number;
    lastPingAt?: string;
    lastNotificationAt?: string;
    createdAt?: string;
}, {
    id?: string;
    projectId?: string;
    pingId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    status?: PingStatus;
    expectEvery?: number;
    warnAfter?: number;
    lastPingAt?: string;
    lastNotificationAt?: string;
    createdAt?: string;
}>, "many">;
export type Pings = z.infer<typeof PingsSchema>;
export type PingWithViewOptions = Ping & {
    href: string;
    lastPingAtDate: Date | null;
    lastNotificationAtDate: Date | null;
    createdAtDate: Date;
    statusReadable: string;
    activeOrArchivedText: string;
    project?: ProjectWithViewOptions;
};
export type PingsWithViewOptions = Array<PingWithViewOptions>;
export declare const transformPing: (ping: Ping, projects?: ProjectsWithViewOptions) => PingWithViewOptions;
export declare const transformPings: (pings: {
    id?: string;
    projectId?: string;
    pingId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    status?: PingStatus;
    expectEvery?: number;
    warnAfter?: number;
    lastPingAt?: string;
    lastNotificationAt?: string;
    createdAt?: string;
}[], projects?: ProjectsWithViewOptions) => PingsWithViewOptions;
