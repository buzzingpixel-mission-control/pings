import { Link } from 'react-router-dom';
import React from 'react';
import { PingWithViewOptions } from '../Pings';
import PingEditButton from './PingEditButton';

const archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

const statusClasses = {
    Unknown: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    Healthy: 'text-green-700 bg-green-50 ring-green-600/20',
    'Pending Missing': 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    Missing: 'text-red-700 bg-red-50 ring-red-600/20',
};

function classNames (...classes: Array<string>) {
    return classes.filter(Boolean).join(' ');
}

const PageHeader = ({
    data,
    fromProjectPageSlug,
}: {
    data: PingWithViewOptions;
    fromProjectPageSlug?: string | undefined | null;
}) => (
    <div className="mb-8">
        <div className="border-b border-gray-200 pb-4">
            <div className="md:flex md:items-center md:justify-between md:space-x-5">
                <div className="flex items-start space-x-5 overflow-hidden">
                    {/*
                      Use vertical padding to simulate center alignment when both lines of text are one line,
                      but preserve the same layout if the text wraps without making the image jump around.
                    */}
                    <div className="pt-1.5">
                        {(() => {
                            if (!fromProjectPageSlug) {
                                return null;
                            }

                            return (
                                <Link
                                    to={`/projects/${fromProjectPageSlug}`}
                                    className="relative inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mb-2"
                                >
                                    &larr; Back to Project
                                </Link>
                            );
                        })()}
                        <h1 className="text-2xl font-bold text-gray-900">
                            {data.title}
                        </h1>
                        <div className="flex items-start gap-x-3">
                            <p
                                className={classNames(
                                    archiveActiveStatuses[data.activeOrArchivedText],
                                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                )}
                            >
                                {data.activeOrArchivedText}
                            </p>
                            {(() => {
                                if (!data.isActive) {
                                    return null;
                                }

                                return (
                                    <p
                                        className={classNames(
                                            statusClasses[data.statusReadable],
                                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                        )}
                                    >
                                        {data.statusReadable}
                                    </p>
                                );
                            })()}
                            {(() => {
                                if (!data.project) {
                                    return null;
                                }

                                return (
                                    <Link
                                        to={data.project.href}
                                        className={classNames(
                                            'text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800',
                                            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                        )}
                                    >
                                        Project:
                                        {' '}
                                        {data.project.title}
                                    </Link>
                                );
                            })()}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                    <PingEditButton item={data} />
                </div>
            </div>
        </div>
    </div>
);

PageHeader.defaultProps = {
    fromProjectPageSlug: undefined,
};

export default PageHeader;
