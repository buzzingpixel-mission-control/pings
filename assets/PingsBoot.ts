import { addProjectDetailsSection } from 'buzzingpixel-mission-control-frontend-core';
import ProjectsListing from './Pings/ProjectsListing/ProjectsListing';

const PingsBoot = () => {
    addProjectDetailsSection({
        uniqueKey: 'pings',
        render: ProjectsListing,
    });
};

export default PingsBoot;
