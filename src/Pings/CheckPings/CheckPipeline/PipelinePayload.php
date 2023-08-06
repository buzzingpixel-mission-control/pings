<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

use MissionControlPings\Pings\Ping;

readonly class PipelinePayload
{
    public function __construct(public Ping $ping)
    {
    }
}
