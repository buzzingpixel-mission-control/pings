<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Slack;

use Psr\EventDispatcher\EventDispatcherInterface;

readonly class PingSlackConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): PingSlackConfig
    {
        $event = new ApplyPingSlackConfigEvent();

        $this->eventDispatcher->dispatch($event);

        return $event->config ?? new PingSlackConfig();
    }
}
