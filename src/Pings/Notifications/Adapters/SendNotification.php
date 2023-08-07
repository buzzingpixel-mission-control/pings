<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters;

use MissionControlPings\Pings\Ping;

interface SendNotification
{
    public function send(Ping $ping): SendStatus;
}
