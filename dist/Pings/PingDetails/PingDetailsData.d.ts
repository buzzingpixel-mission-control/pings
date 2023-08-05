import { PingWithViewOptions } from '../Pings';
export declare const usePingDetailsData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data?: PingWithViewOptions;
};
