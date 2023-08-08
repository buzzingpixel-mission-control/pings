import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import phpDateFormat from 'locutus/php/datetime/date';
import { useArchivePingMutation } from './PingData';
import { PingWithViewOptions } from './Pings';
import PingListItemEditor from './PingListItemEditor';

const archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

const statuses = {
    Unknown: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    Healthy: 'text-green-700 bg-green-50 ring-green-600/20',
    'Pending Missing': 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    Missing: 'text-red-700 bg-red-50 ring-red-600/20',
};

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

const PingListItem = (
    {
        isArchive,
        item,
        projectPageSlug,
        selectedItemsManager,
    }: {
        isArchive: boolean;
        item: PingWithViewOptions;
        projectPageSlug?: string | null | undefined;
        selectedItemsManager?: undefined | null | {
            selectedItems?: Array<string> | null | undefined;
            addSelectedItem?: (id: string) => void;
            removeSelectedItem?: (id: string) => void;
        };
    },
) => {
    const [
        editIsOpen,
        setEditIsOpen,
    ] = useState<boolean>(false);

    const archiveMutation = useArchivePingMutation(
        item.id,
        isArchive,
        item.projectId,
    );

    let viewDetailsLink = item.href;

    if (projectPageSlug) {
        viewDetailsLink += `?fromProjectPageSlug=${projectPageSlug}`;
    }

    let isSelected = false;

    if (selectedItemsManager?.selectedItems.indexOf(item.id) > -1) {
        isSelected = true;
    }

    return (
        <li>
            <div className="sm:flex items-center justify-between gap-x-6 py-5">
                <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            {item.title}
                        </p>
                        <p
                            className={classNames(
                                archiveActiveStatuses[item.activeOrArchivedText],
                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                            )}
                        >
                            {item.activeOrArchivedText}
                        </p>
                        {(() => {
                            if (isArchive) {
                                return null;
                            }

                            return (
                                <p
                                    className={classNames(
                                        statuses[item.statusReadable],
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    {item.statusReadable}
                                </p>
                            );
                        })()}
                        {(() => {
                            if (!item.project || projectPageSlug) {
                                return null;
                            }

                            return (
                                <Link
                                    to={item.project.href}
                                    className={classNames(
                                        'text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800',
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    Project:
                                    {' '}
                                    {item.project.title}
                                </Link>
                            );
                        })()}
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 truncate">
                        <p>
                            Last Ping:
                            {' '}
                            <strong>
                                {item.lastPingAtDate
                                    ? `${phpDateFormat('Y-m-d g:i A', item.lastPingAtDate)}`
                                    : 'N/A'}
                            </strong>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p>
                            Expect Every:
                            {' '}
                            <strong>{item.expectEvery}</strong>
                            {' '}
                            <em>minutes</em>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p>
                            Warn After:
                            {' '}
                            <strong>{item.warnAfter}</strong>
                            {' '}
                            <em>minutes</em>
                        </p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p>
                            Created
                            {' '}
                            {item.createdAtDate.toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-none items-center gap-x-4">
                    <Link
                        to={viewDetailsLink}
                        className="block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        View Details
                        <span className="sr-only">
                            ,
                            {item.title}
                        </span>
                    </Link>
                    <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900',
                                            )}
                                            onClick={() => {
                                                setEditIsOpen(true);
                                            }}
                                        >
                                            Edit
                                            <span className="sr-only">
                                                ,
                                                {item.title}
                                            </span>
                                        </span>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900',
                                            )}
                                            onClick={() => {
                                                archiveMutation.mutate(undefined);
                                            }}
                                        >
                                            {isArchive ? 'Un-archive' : 'Archive'}
                                            <span className="sr-only">
                                                ,
                                                {item.title}
                                            </span>
                                        </span>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {(() => {
                        if (!selectedItemsManager) {
                            return null;
                        }

                        return (
                            <input
                                id={`select_${item.id}`}
                                name="ping_select[]"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                                checked={isSelected}
                                onChange={(e) => {
                                    if (e.currentTarget.checked) {
                                        selectedItemsManager.addSelectedItem(
                                            item.id,
                                        );

                                        return;
                                    }

                                    selectedItemsManager.removeSelectedItem(
                                        item.id,
                                    );
                                }}
                            />
                        );
                    })()}
                </div>
            </div>
            {(() => {
                if (!editIsOpen) {
                    return null;
                }

                return (
                    <PingListItemEditor
                        item={item}
                        setEditorIsOpen={setEditIsOpen}
                    />
                );
            })()}
        </li>
    );
};

PingListItem.defaultProps = {
    projectPageSlug: undefined,
    selectedItemsManager: undefined,
};

export default PingListItem;
