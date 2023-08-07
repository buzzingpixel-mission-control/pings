import {
    MinutesToMilliseconds,
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    Pings, PingsSchema, PingsWithViewOptions, transformPings,
} from '../Pings';

// eslint-disable-next-line import/prefer-default-export
export const useProjectListingData = (projectId: string): {
    status: 'loading' | 'error' | 'success';
    data: PingsWithViewOptions;
} => {
    const uri = `/pings/list/project/${projectId}`;

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
