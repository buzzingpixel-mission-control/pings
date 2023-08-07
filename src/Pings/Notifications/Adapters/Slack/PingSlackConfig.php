<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Slack;

class PingSlackConfig
{
    public function __construct(public string|null $slackChannel = null)
    {
    }
}
