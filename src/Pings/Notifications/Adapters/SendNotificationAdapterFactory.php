<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters;

use Psr\Container\ContainerInterface;
use Psr\EventDispatcher\EventDispatcherInterface;
use RuntimeException;

use function implode;

readonly class SendNotificationAdapterFactory
{
    public function __construct(
        private ContainerInterface $container,
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): SendNotificationAdapterCollection
    {
        $event = new CreateNotificationAdaptersEvent(
            $this->container,
        );

        $this->eventDispatcher->dispatch($event);

        if ($event->adapters === null) {
            throw new RuntimeException(
                implode(' ', [
                    'You must listen for the event',
                    CreateNotificationAdaptersEvent::class,
                    'and add desired adapters',
                ]),
            );
        }

        return $event->adapters;
    }
}
