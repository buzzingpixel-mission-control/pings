<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

use MissionControlPings\Pings\Ping;

interface UpdateStatus
{
    public function update(CheckPingResults $results): Ping;
}
