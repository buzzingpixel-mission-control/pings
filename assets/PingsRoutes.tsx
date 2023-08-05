import React from 'react';
import { Route } from 'react-router-dom';
import PingsPage from './Pings/PingsPage';
import PingDetailsPage from './Pings/PingDetails/PingDetailsPage';

const PingsRoutes = () => (
    <>
        <Route path="/pings" element={<PingsPage />} />
        <Route path="/pings/archived" element={<PingsPage isArchive />} />
        <Route path="/pings/:slug" element={<PingDetailsPage />} />
    </>
);

export default PingsRoutes;
