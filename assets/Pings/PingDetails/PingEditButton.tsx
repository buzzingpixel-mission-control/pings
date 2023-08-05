import React, { useState } from 'react';
import { createPortal } from 'buzzingpixel-mission-control-frontend-core';
import { Ping } from '../Pings';
import EditPingOverlay from './EditPingOverlay';

const PingEditButton = (
    {
        item,
    }: {
        item: Ping;
    },
) => {
    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    return (
        <>
            {(() => {
                if (!isOpen) {
                    return null;
                }

                return createPortal(
                    <EditPingOverlay item={item} setIsOpen={setIsOpen} />,
                );
            })()}
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Edit
            </button>
        </>
    );
};

export default PingEditButton;
