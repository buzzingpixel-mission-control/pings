import { PingsWithViewOptions } from './Pings';
import PingFormValues from './PingFormValues';
export declare const usePingData: (archive?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data: PingsWithViewOptions;
};
export declare const useAddPingMutation: () => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchivePingMutation: (pingId: string, isArchive: boolean, projectId?: string | undefined | null) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useEditPingMutation: (pingId: string, slug: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, PingFormValues>;
