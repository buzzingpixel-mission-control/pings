import { useSearchParams } from 'react-router-dom';

const useQuickStatusFilter = (): [
    string,
    (val: string) => void,
] => {
    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const quickStatusFilter = searchParams.get('status') ?? '';

    const setQuickStatusFilter = (val: string | null | undefined) => {
        setSearchParams((params) => {
            if (!val) {
                params.delete('status');
            } else {
                params.set('status', val);
            }

            return params;
        });
    };

    return [
        quickStatusFilter,
        setQuickStatusFilter,
    ];
};

export default useQuickStatusFilter;
