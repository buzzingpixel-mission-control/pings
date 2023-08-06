<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Config;

class ApplyPingConfigEvent
{
    public function __construct(public PingConfig|null $config = null)
    {
    }

    public function addConfig(PingConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}
