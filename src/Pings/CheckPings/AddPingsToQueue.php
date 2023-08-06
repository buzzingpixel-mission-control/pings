<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings;

interface AddPingsToQueue
{
    public function add(): void;
}
