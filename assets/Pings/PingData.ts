import { RequestMethod, useApiMutation, useApiQueryWithSignInRedirect } from 'buzzingpixel-mission-control-frontend-core';

export const usePingData = (archive = false) => {
    const uri = archive
        ? '/pings/list/archived'
        : '/pings/list';

    return useApiQueryWithSignInRedirect(
        [uri],
        { uri },
        {
            staleTime: Infinity,
        },
    );
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
