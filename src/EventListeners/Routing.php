<?php

declare(strict_types=1);

namespace MissionControlPings\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlPings\Pings\AddEdit\PatchEditPingAction;
use MissionControlPings\Pings\AddEdit\PostAddPingAction;
use MissionControlPings\Pings\GetPingsListAction;
use MissionControlPings\Pings\GetPingsListArchivedAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        GetPingsListAction::registerRoute($event);
        GetPingsListArchivedAction::registerRoute($event);
        PostAddPingAction::registerRoute($event);
        PatchEditPingAction::registerRoute($event);
    }
}
