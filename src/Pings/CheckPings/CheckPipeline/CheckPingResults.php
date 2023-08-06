<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\ValueObjects\Status;

readonly class CheckPingResults
{
    public function __construct(
        public Ping $ping,
        public Status $status,
    ) {
    }
}
