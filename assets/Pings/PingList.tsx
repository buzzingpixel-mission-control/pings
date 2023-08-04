import React, { useState } from 'react';
import { NoResultsAddItem } from 'buzzingpixel-mission-control-frontend-core';
import { SignalIcon } from '@heroicons/react/20/solid';
import { PingsWithViewOptions } from './Pings';
import PingListItem from './PingListItem';

const PingList = (
    {
        isArchive,
        items,
    }: {
        isArchive: boolean;
        items: PingsWithViewOptions;
    },
) => {
    if (items.length < 1) {
        return (
            <NoResultsAddItem
                icon={<SignalIcon />}
                headline="No Pings match your filters"
            />
        );
    }

    return (
        <div className="bg-white rounded-md shadow-sm px-4">
            <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                    <PingListItem
                        key={item.id}
                        isArchive={isArchive}
                        item={item}
                    />
                ))}
            </ul>
        </div>
    );
};

export default PingList;
