<?php

declare(strict_types=1);

namespace MissionControlPings\EventListeners;

use MissionControlBackend\Scheduler\ApplyScheduleEvent;
use MissionControlPings\Pings\CheckPings\AddPingsToQueueAction as CheckPingsAddPingsToQueueActionAlias;
use MissionControlPings\Pings\Notifications\AddPingsToQueueAction as CheckPingNotificationsAddPingsToQueueActionAlias;

class Schedule
{
    public function onApplySchedule(ApplyScheduleEvent $event): void
    {
        CheckPingsAddPingsToQueueActionAlias::registerEvent($event);
        CheckPingNotificationsAddPingsToQueueActionAlias::registerEvent($event);
    }
}
