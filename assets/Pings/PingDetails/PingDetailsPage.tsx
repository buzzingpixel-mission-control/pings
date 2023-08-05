import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { usePingDetailsData } from './PingDetailsData';
import PageHeader from './PageHeader';

const PingDetailsPage = () => {
    const { slug } = useParams();

    const [searchParams] = useSearchParams();

    useHidePageTitle(true);

    const [
        pageNameState,
        setPageNameState,
    ] = useState(
        'Loading Ping Details…',
    );

    const [
        isArchive,
        setIsArchive,
    ] = useState(false);

    usePageTitle(pageNameState);

    useBreadcrumbs([
        {
            name: 'Pings',
            href: isArchive ? '/pings/archived' : '/pings',
        },
        {
            name: pageNameState,
            href: `/pings/${slug}`,
        },
    ]);

    const {
        status,
        data,
    } = usePingDetailsData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pageName = `Ping: ${data.title}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }

    const fromProjectPageSlug = searchParams.get('fromProjectPageSlug');

    return (
        <>
            <PageHeader data={data} fromProjectPageSlug={fromProjectPageSlug} />
        </>
    );
};

export default PingDetailsPage;
