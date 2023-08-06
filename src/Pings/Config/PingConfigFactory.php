<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Config;

use Psr\EventDispatcher\EventDispatcherInterface;
use RuntimeException;

use function implode;

readonly class PingConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): PingConfig
    {
        $event = new ApplyPingConfigEvent();

        $this->eventDispatcher->dispatch($event);

        if ($event->config === null) {
            throw new RuntimeException(
                implode(' ', [
                    'You must listen for the event',
                    ApplyPingConfigEvent::class,
                    'and set up a PingConfig',
                ]),
            );
        }

        return $event->config;
    }
}
