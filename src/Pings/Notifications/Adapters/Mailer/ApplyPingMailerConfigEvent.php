<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Mailer;

class ApplyPingMailerConfigEvent
{
    public function __construct(public PingMailerConfig|null $config = null)
    {
    }

    public function addConfig(PingMailerConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}
