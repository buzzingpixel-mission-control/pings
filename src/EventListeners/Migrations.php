<?php

declare(strict_types=1);

namespace MissionControlPings\EventListeners;

use MissionControlBackend\Persistence\Migrations\AddMigrationPathsEvent;
use MissionControlPings\PingsSrc;

class Migrations
{
    public function onAddMigrationPaths(AddMigrationPathsEvent $event): void
    {
        $event->paths->addPathFromString(
            PingsSrc::path() . '/Migrations',
        );
    }
}
