<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

use MissionControlPings\Pings\Ping;

class UpdateStatusNoOp implements UpdateStatus
{
    public function update(CheckPingResults $results): Ping
    {
        return $results->ping;
    }
}
