import React, { useState } from 'react';
import {
    createPortal,
    NoResultsAddItem,
    PartialPageLoading,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { SignalIcon } from '@heroicons/react/20/solid';
import PingTabs from './PingTabs';
import useQuickStatusFilter from './useQuickStatusFilter';
import useFilterText from './useFilterText';
import { usePingData } from './PingData';
import AddPingOverlay from './AddPingOverlay';

const PingsPage = (
    {
        isArchive = false,
    }: {
        isArchive?: boolean;
    },
) => {
    const [
        pageNameState,
        setPageNameState,
    ] = useState('');

    const [
        quickStatusFilter,
        setQuickStatusFilter,
    ] = useQuickStatusFilter();

    if (isArchive && pageNameState !== 'Archived Pings') {
        setPageNameState('Archived Pings');
    } else if (!isArchive && pageNameState !== 'Pings') {
        setPageNameState('Pings');
    }

    usePageTitle(pageNameState);

    const [
        filterText,
        setFilterText,
    ] = useFilterText();

    const [
        addPingIsOpen,
        setAddPingIsOpen,
    ] = useState<boolean>(false);

    const {
        status,
        data,
    } = usePingData(isArchive);

    const Tabs = (
        <PingTabs
            activeHref={isArchive ? '/pings/archived' : '/pings'}
            addPingOnClick={() => { setAddPingIsOpen(true); }}
        />
    );

    if (status === 'loading') {
        return (
            <>
                {Tabs}
                <PartialPageLoading />
            </>
        );
    }

    const portals = () => {
        if (addPingIsOpen) {
            return createPortal(<AddPingOverlay setIsOpen={setAddPingIsOpen} />);
        }

        return null;
    };

    const pings = data;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (pings.length < 1) {
        if (isArchive) {
            return (
                <>
                    {portals()}
                    {Tabs}
                    <NoResultsAddItem
                        icon={<SignalIcon />}
                        headline="No Archived Pings"
                    />
                </>
            );
        }

        return (
            <>
                {portals()}
                {Tabs}
                <NoResultsAddItem
                    icon={<SignalIcon />}
                    headline="No Pings"
                    content="Would you like to create a Ping?"
                    actionText="Add New Ping"
                    actionUsesPlusIcon
                    actionButtonOnClick={() => { setAddPingIsOpen(true); }}
                />
            </>
        );
    }

    return <>TODO</>;
};

PingsPage.defaultProps = {
    isArchive: false,
};

export default PingsPage;
