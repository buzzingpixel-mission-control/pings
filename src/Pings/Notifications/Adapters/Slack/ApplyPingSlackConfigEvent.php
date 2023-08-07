<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Slack;

class ApplyPingSlackConfigEvent
{
    public function __construct(public PingSlackConfig|null $config = null)
    {
    }

    public function addConfig(PingSlackConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}
