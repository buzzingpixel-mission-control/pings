<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Mailer;

use Psr\EventDispatcher\EventDispatcherInterface;
use RuntimeException;

use function implode;

readonly class PingMailerConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): PingMailerConfig
    {
        $event = new ApplyPingMailerConfigEvent();

        $this->eventDispatcher->dispatch($event);

        if ($event->config === null) {
            throw new RuntimeException(
                implode(' ', [
                    'You must listen for the event',
                    ApplyPingMailerConfigEvent::class,
                    'and add a config',
                ]),
            );
        }

        return $event->config;
    }
}
