<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings;

class AddPingsToQueueNoOp implements AddPingsToQueue
{
    public function add(): void
    {
    }
}
