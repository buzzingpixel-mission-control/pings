import React from 'react';
import {
    NoResultsAddItem,
    ProjectWithViewOptions,
} from 'buzzingpixel-mission-control-frontend-core';
import { Link } from 'react-router-dom';
import { useProjectListingData } from './ProjectsListingData';
import PingListItem from '../PingListItem';

const ProjectsListing = (
    {
        project,
    }: {
        project: ProjectWithViewOptions;
    },
) => {
    const {
        status,
        data,
    } = useProjectListingData(project.id);

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Pings in this project
                        </h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <Link
                            to="/pings"
                            className="relative inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                        >
                            View All Pings &rarr;
                        </Link>
                    </div>
                </div>
            </div>
            {(() => {
                if (status === 'loading') {
                    return (
                        <div
                            className="w-full overflow-hidden opacity-75 flex flex-col items-center justify-center"
                            style={{ height: '120px' }}
                        >
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
                        </div>
                    );
                }

                if (data.length < 1) {
                    return (
                        <div className="p-4">
                            <NoResultsAddItem headline="No pings in this project" />
                        </div>
                    );
                }

                return (
                    <div className="shadow-sm px-4">
                        <ul className="divide-y divide-gray-100">
                            {data.map((item) => (
                                <PingListItem
                                    key={item.id}
                                    isArchive={!item.isActive}
                                    item={item}
                                    projectPageSlug={project.slug}
                                />
                            ))}
                        </ul>
                    </div>
                );
            })()}
        </div>
    );
};

export default ProjectsListing;
