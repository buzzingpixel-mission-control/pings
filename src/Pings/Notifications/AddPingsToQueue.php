<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

interface AddPingsToQueue
{
    public function add(): void;
}
