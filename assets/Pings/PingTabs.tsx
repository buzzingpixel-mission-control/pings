import React, { MouseEventHandler } from 'react';
import { PageTabs, Tab } from 'buzzingpixel-mission-control-frontend-core';
import {
    ArchiveBoxIcon,
    FolderIcon,
    PlusIcon,
} from '@heroicons/react/20/solid';

const tabs = [
    {
        name: 'Active Pings',
        href: '/pings',
        icon: FolderIcon,
    },
    {
        name: 'Archived Pings',
        href: '/pings/archived',
        icon: ArchiveBoxIcon,
    },
] as Array<Tab>;

const PingTabs = (
    {
        activeHref,
        addPingOnClick,
    }: {
        activeHref?: string;
        addPingOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    },
) => {
    activeHref = activeHref || '/pings';

    return (
        <PageTabs
            tabs={tabs.map((tab) => ({
                ...tab,
                current: tab.href === activeHref,
            }))}
            rightHandButtons={[{
                key: 'add-new-ping',
                text: (
                    <>
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add New Ping
                    </>
                ),
                onClick: addPingOnClick,
            }]}
        />
    );
};

PingTabs.defaultProps = {
    activeHref: undefined,
    addPingOnClick: undefined,
};

export default PingTabs;
