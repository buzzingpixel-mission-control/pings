<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Config;

readonly class PingConfig
{
    public function __construct(public string $queueName)
    {
    }
}
