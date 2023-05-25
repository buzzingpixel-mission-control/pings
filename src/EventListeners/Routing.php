<?php

declare(strict_types=1);

namespace MissionControlPings\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlPings\Pings\GetPingsListAction;
use MissionControlPings\Pings\GetPingsListArchivedAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        GetPingsListAction::registerRoute($event);
        GetPingsListArchivedAction::registerRoute($event);
    }
}
