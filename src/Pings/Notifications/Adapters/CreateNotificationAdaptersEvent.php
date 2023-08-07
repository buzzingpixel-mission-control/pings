<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters;

use Psr\Container\ContainerInterface;

class CreateNotificationAdaptersEvent
{
    public function __construct(
        public readonly ContainerInterface $container,
        public SendNotificationAdapterCollection|null $adapters = null,
    ) {
    }

    public function addAdapters(
        SendNotificationAdapterCollection $adapters,
    ): self {
        $this->adapters = $adapters;

        return $this;
    }

    public function addAdapter(SendNotification $adapter): self
    {
        $this->adapters ??= new SendNotificationAdapterCollection();

        $this->adapters = $this->adapters->withAdapter($adapter);

        return $this;
    }

    /**
     * @param class-string<SendNotification> $adapterClass
     *
     * @noinspection PhpDocMissingThrowsInspection
     */
    public function addAdapterFromContainer(string $adapterClass): self
    {
        /** @noinspection PhpUnhandledExceptionInspection */
        $adapter = $this->container->get($adapterClass);

        /** @phpstan-ignore-next-line */
        $this->addAdapter($adapter);

        return $this;
    }
}
