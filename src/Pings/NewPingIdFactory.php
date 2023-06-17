<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;

class NewPingIdFactory
{
    public function __construct(
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function addPingId(NewPing $entity): NewPing
    {
        if (! $entity->pingId->isNull()) {
            return $entity;
        }

        return $entity->withPingIdFromUuid($this->uuidFactory->uuid4());
    }
}
