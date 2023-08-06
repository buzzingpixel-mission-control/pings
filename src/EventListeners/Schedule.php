<?php

declare(strict_types=1);

namespace MissionControlPings\EventListeners;

use MissionControlBackend\Scheduler\ApplyScheduleEvent;
use MissionControlPings\Pings\CheckPings\AddPingsToQueueAction;

class Schedule
{
    public function onApplySchedule(ApplyScheduleEvent $event): void
    {
        AddPingsToQueueAction::registerEvent($event);
    }
}
