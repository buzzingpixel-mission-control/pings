import { PingsWithViewOptions } from '../Pings';
export declare const useProjectListingData: (projectId: string) => {
    status: 'loading' | 'error' | 'success';
    data: PingsWithViewOptions;
};
