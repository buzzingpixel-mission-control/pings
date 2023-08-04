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
import { pingStatusList } from './Pings';
import PingList from './PingList';

function classNames (...classes) {
    return classes.filter(Boolean).join(' ');
}

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

    let pings = data;

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

    if (filterText !== '') {
        pings = pings.filter((ping) => ping.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || ping.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || ping.pingId.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    }

    if (filterText !== '') {
        pings = pings.filter((
            ping,
        ) => ping.status === quickStatusFilter);
    }

    return (
        <>
            {portals()}
            {Tabs}
            <div>
                <div className="sm:flex sm:mb-4">
                    <div className="mb-4 sm:mb-0 sm:mr-4">
                        <div>
                            <div className="sm:hidden">
                                <label htmlFor="statusFilter" className="sr-only">
                                    Select a status filter
                                </label>
                                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                <select
                                    id="statusFilter"
                                    name="statusFilter"
                                    className="block w-full rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                                    defaultValue={quickStatusFilter}
                                    onChange={(e) => {
                                        setQuickStatusFilter(e.target.value);
                                    }}
                                >
                                    {pingStatusList.map((filterStatus) => (
                                        <option key={filterStatus.value} value={filterStatus.value}>{filterStatus.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="flex space-x-4" aria-label="Status Filter">
                                    {pingStatusList.map((filterStatus) => {
                                        const isCurrent = filterStatus.value === quickStatusFilter;

                                        return (
                                            <a
                                                key={filterStatus.value}
                                                href="#"
                                                className={classNames(
                                                    isCurrent ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                                aria-current={isCurrent ? 'page' : undefined}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setQuickStatusFilter(filterStatus.value);
                                                }}
                                            >
                                                {filterStatus.name}
                                            </a>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 sm:mb-0 grow">
                        <input
                            type="text"
                            name="filter"
                            id="filter"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            placeholder="Filter results"
                            value={filterText}
                            onChange={(e) => {
                                setFilterText(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <PingList isArchive={isArchive} items={pings} />
        </>
    );
};

PingsPage.defaultProps = {
    isArchive: false,
};

export default PingsPage;
