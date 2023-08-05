import { z } from 'zod';
import { ProjectsWithViewOptions, ProjectWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';

export enum PingStatus {
    unknown = '',
    healthy = 'healthy',
    pendingMissing = 'pendingMissing',
    missing = 'missing',
}

export const pingStatusList = [
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

export const mapPingStatusToReadable = (status: PingStatus) => {
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

export const PingSchema = z.object({
    id: z.string().min(1),
    projectId: z.string().nullable(),
    pingId: z.string().nullable(),
    isActive: z.boolean(),
    title: z.string().min(1),
    slug: z.string().min(1),
    status: z.nativeEnum(PingStatus),
    expectEvery: z.number(),
    warnAfter: z.number(),
    lastPingAt: z.string().nullable(),
    lastNotificationAt: z.string().nullable(),
    createdAt: z.string(),
    checkInUrl: z.string(),
});

export type Ping = z.infer<typeof PingSchema>;

export const PingsSchema = z.array(
    PingSchema,
);

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

export const transformPing = (
    ping: Ping,
    projects?: ProjectsWithViewOptions,
): PingWithViewOptions => {
    projects = projects || [];

    let project;

    const filteredProjects = projects.filter(
        (p) => p.id === ping.projectId,
    );

    if (filteredProjects[0]) {
        // eslint-disable-next-line prefer-destructuring
        project = filteredProjects[0];
    }

    let lastPingAtDate = null;

    if (ping.lastPingAt) {
        lastPingAtDate = new Date(ping.lastPingAt);
    }

    let lastNotificationAtDate = null;

    if (ping.lastNotificationAt) {
        lastNotificationAtDate = new Date(ping.lastNotificationAt);
    }

    return ({
        ...ping,
        href: `/pings/${ping.slug}`,
        lastPingAtDate,
        lastNotificationAtDate,
        createdAtDate: new Date(ping.createdAt),
        statusReadable: mapPingStatusToReadable(ping.status),
        activeOrArchivedText: ping.isActive ? 'Active' : 'Archive',
        project,
    });
};

export const transformPings = (
    pings: Pings,
    projects?: ProjectsWithViewOptions,
): PingsWithViewOptions => pings.map((
    ping,
) => transformPing(ping, projects));
