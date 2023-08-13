import React from 'react';
import phpDateFormat from 'locutus/php/datetime/date';
import { PingWithViewOptions } from '../Pings';

const PingDetails = (
    {
        data,
    }: {
        data: PingWithViewOptions;
    },
) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="max-w-6xl">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Check In URL
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    value={data.checkInUrl}
                                    readOnly
                                />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Expect Every
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.expectEvery}
                                {' '}
                                Minutes
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Warn After
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.warnAfter}
                                {' '}
                                Minutes
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Last Ping At
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.lastPingAtDate
                                    ? `${phpDateFormat('Y-m-d g:i:s A', data.lastPingAtDate)} (${timezone})`
                                    : 'N/A'}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Created
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {`${phpDateFormat('Y-m-d g:i:s A', data.createdAtDate)} (${timezone})`}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default PingDetails;
