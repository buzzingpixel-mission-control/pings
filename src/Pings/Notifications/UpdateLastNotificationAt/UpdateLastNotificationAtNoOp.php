<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\UpdateLastNotificationAt;

use MissionControlPings\Pings\Ping;

class UpdateLastNotificationAtNoOp implements UpdateLastNotificationAt
{
    public function update(Ping $ping): void
    {
    }
}
