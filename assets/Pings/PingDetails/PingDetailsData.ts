import {
    MinutesToMilliseconds,
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    Ping, PingSchema, PingWithViewOptions, transformPing,
} from '../Pings';

// eslint-disable-next-line import/prefer-default-export
export const usePingDetailsData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data?: PingWithViewOptions;
} => {
    const uri = `/pings/${slug}`;

    const response = useApiQueryWithSignInRedirect<Ping>(
        [uri],
        { uri },
        {
            zodValidator: PingSchema,
            staleTime: MinutesToMilliseconds(1),
            refetchInterval: MinutesToMilliseconds(1),
        },
    );

    const projects = useAllProjectsData();

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
        data: transformPing(response.data, projects.data),
    };
};
