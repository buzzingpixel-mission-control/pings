import {
    MinutesToMilliseconds,
    RequestMethod,
    useAllProjectsData,
    useApiMutation,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import { useQueryClient } from '@tanstack/react-query';
import {
    Ping, Pings, PingsSchema, PingsWithViewOptions, transformPings,
} from './Pings';
import PingFormValues from './PingFormValues';

export const usePingData = (archive = false): {
    status: 'loading' | 'error' | 'success';
    data: PingsWithViewOptions;
} => {
    const uri = archive
        ? '/pings/list/archived'
        : '/pings/list';

    const response = useApiQueryWithSignInRedirect<Pings>(
        [uri],
        { uri },
        {
            zodValidator: PingsSchema,
            staleTime: MinutesToMilliseconds(1),
            refetchInterval: MinutesToMilliseconds(1),
        },
    );

    const projects = useAllProjectsData();

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
        data: transformPings(response.data, projects.data),
    };
};

export const useAddPingMutation = () => useApiMutation({
    invalidateQueryKeysOnSuccess: [
        '/pings/list',
        '/pings/list/archived',
    ],
    prepareApiParams: (data) => ({
        uri: '/pings/add',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: data,
        method: RequestMethod.POST,
    }),
});

export const useArchivePingMutation = (
    pingId: string,
    isArchive: boolean,
    projectId?: string | undefined | null,
) => {
    const queryClient = useQueryClient();

    const invalidateQueryKeysOnSuccess = [
        '/pings/list',
        '/pings/list/archived',
    ];

    if (projectId) {
        invalidateQueryKeysOnSuccess.push(
            `/pings/list/project/${projectId}`,
        );
    }

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/pings/${isArchive ? 'un-archive' : 'archive'}/${pingId}`,
            method: RequestMethod.PATCH,
        }),
        options: {
            onMutate: async () => {
                await queryClient.cancelQueries({
                    queryKey: [['/pings/list']],
                });

                await queryClient.cancelQueries({
                    queryKey: [['/pings/list/archived']],
                });

                const previousPings = queryClient.getQueryData(
                    [['/pings/list']],
                ) as Pings;

                const previousPingsArchives = queryClient.getQueryData(
                    [['/pings/list/archived']],
                ) as Pings;

                const pingMapper = (ping: Ping) => {
                    if (ping.id === pingId) {
                        ping.isActive = isArchive;
                    }

                    return ping;
                };

                if (previousPings) {
                    const newPings = previousPings.map(
                        pingMapper,
                    );

                    queryClient.setQueryData([['/pings/list']], newPings);
                }

                if (previousPingsArchives) {
                    const newPingsArchive = previousPingsArchives.map(
                        pingMapper,
                    );

                    queryClient.setQueryData([['/pings/list/archived']], newPingsArchive);
                }

                return {
                    previousPings,
                    previousPingsArchives,
                };
            },
        },
    });
};

export const useEditPingMutation = (pingId: string, slug: string) => {
    const queryClient = useQueryClient();

    return useApiMutation<unknown, PingFormValues>({
        invalidateQueryKeysOnSuccess: [
            `/pings/${slug}`,
            '/pings/list',
            '/pings/list/archived',
        ],
        prepareApiParams: (data) => ({
            uri: `/pings/edit/${pingId}`,
            payload: data,
            method: RequestMethod.PATCH,
        }),
        options: {
            onMutate: async (data) => {
                const formValues = data as unknown as PingFormValues;

                await queryClient.cancelQueries({
                    queryKey: [['/pings/list']],
                });

                await queryClient.cancelQueries({
                    queryKey: [['/pings/list/archived']],
                });

                const previousPings = queryClient.getQueryData(
                    [['/pings/list']],
                ) as Pings;

                const previousPingsArchived = queryClient.getQueryData(
                    [['/pings/list/archived']],
                ) as Pings;

                const pingMapper = (ping: Ping) => {
                    if (ping.id === pingId) {
                        ping.title = formValues.title;
                        ping.expectEvery = formValues.expect_every;
                        ping.warnAfter = formValues.warn_after;
                        ping.projectId = formValues.project_id;
                    }

                    return ping;
                };

                if (previousPings) {
                    const newPings = previousPings.map(
                        pingMapper,
                    );

                    queryClient.setQueryData([['/pings/list']], newPings);
                }

                if (previousPingsArchived) {
                    const newPingsArchive = previousPingsArchived.map(
                        pingMapper,
                    );

                    queryClient.setQueryData([['/pings/list/archived']], newPingsArchive);
                }

                return {
                    previousPings,
                    previousPingsArchived,
                };
            },
        },
    });
};

export const useArchiveSelectedPingsMutation = (
    pings: Pings,
    isArchive: boolean,
) => {
    const pingIds = pings.map((ping) => ping.id);

    const invalidateQueryKeysOnSuccess = [
        '/pings/list',
        '/pings/list/archived',
    ];

    pings.forEach((ping) => {
        invalidateQueryKeysOnSuccess.push(`/pings/${ping.slug}`);

        if (!ping.projectId) {
            return;
        }

        const projectListingUrl = `/pings/list/project/${ping.projectId}`;

        if (invalidateQueryKeysOnSuccess.indexOf(projectListingUrl) > -1) {
            return;
        }

        invalidateQueryKeysOnSuccess.push(projectListingUrl);
    });

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/pings/${isArchive ? 'un-archive' : 'archive'}`,
            method: RequestMethod.PATCH,
            payload: { pingIds },
        }),
    });
};
