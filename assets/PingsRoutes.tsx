import React from 'react';
import { Route } from 'react-router-dom';
import PingsPage from './Pings/PingsPage';

const PingsRoutes = () => (
    <>
        <Route path="/pings" element={<PingsPage />} />
    </>
);

export default PingsRoutes;
