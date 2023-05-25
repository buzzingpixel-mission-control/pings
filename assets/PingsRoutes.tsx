import React from 'react';
import { Route } from 'react-router-dom';
import PingsPage from './Pings/PingsPage';

const PingsRoutes = () => (
    <>
        <Route path="/pings" element={<PingsPage />} />
        <Route path="/pings/archived" element={<PingsPage isArchive />} />
    </>
);

export default PingsRoutes;
