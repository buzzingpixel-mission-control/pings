<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

use MissionControlPings\Pings\Notifications\Adapters\SendNotification;
use MissionControlPings\Pings\Notifications\Adapters\SendStatus;
use MissionControlPings\Pings\Ping;

class SendNotificationNoOp implements SendNotification
{
    public function send(Ping $ping): SendStatus
    {
        return new SendStatus(false);
    }
}
