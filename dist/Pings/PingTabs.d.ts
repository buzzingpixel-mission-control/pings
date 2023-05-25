import React, { MouseEventHandler } from 'react';
declare const PingTabs: {
    ({ activeHref, addPingOnClick, }: {
        activeHref?: string;
        addPingOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    }): React.JSX.Element;
    defaultProps: {
        activeHref: any;
        addPingOnClick: any;
    };
};
export default PingTabs;
