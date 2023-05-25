import { MenuItem } from 'buzzingpixel-mission-control-frontend-core';
import { SignalIcon } from '@heroicons/react/24/outline';

const PingsMenuItems = (): Array<MenuItem> => [
    {
        name: 'Pings',
        href: '/pings',
        icon: SignalIcon,
    },
];

export default PingsMenuItems;
