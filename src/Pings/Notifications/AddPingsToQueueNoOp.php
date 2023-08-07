<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

class AddPingsToQueueNoOp implements AddPingsToQueue
{
    public function add(): void
    {
    }
}
