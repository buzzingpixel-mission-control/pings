<?php

declare(strict_types=1);

namespace MissionControlPings\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlPings\Pings\AddEdit\PatchArchivePingAction;
use MissionControlPings\Pings\AddEdit\PatchEditPingAction;
use MissionControlPings\Pings\AddEdit\PatchUnArchivePingAction;
use MissionControlPings\Pings\AddEdit\PostAddPingAction;
use MissionControlPings\Pings\Checkin\PingCheckinAction;
use MissionControlPings\Pings\GetDetails\GetPingDetailsBySlugAction;
use MissionControlPings\Pings\GetPingsListAction;
use MissionControlPings\Pings\GetPingsListArchivedAction;
use MissionControlPings\Pings\GetPingsListForProjectAction;
use MissionControlPings\Pings\PatchPingsArchiveAction;
use MissionControlPings\Pings\PatchPingsUnArchiveAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        GetPingsListAction::registerRoute($event);
        GetPingsListArchivedAction::registerRoute($event);
        PostAddPingAction::registerRoute($event);
        PatchEditPingAction::registerRoute($event);
        PatchPingsArchiveAction::registerRoute($event);
        PatchPingsUnArchiveAction::registerRoute($event);
        PatchArchivePingAction::registerRoute($event);
        PatchUnArchivePingAction::registerRoute($event);
        GetPingDetailsBySlugAction::registerRoute($event);
        PingCheckinAction::registerRoute($event);
        GetPingsListForProjectAction::registerRoute($event);
    }
}
