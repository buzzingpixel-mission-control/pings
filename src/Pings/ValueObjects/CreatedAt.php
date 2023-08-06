<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\ValueObjects;

use DateTimeImmutable;
use Funeralzone\ValueObjects\ValueObject;
use MissionControlBackend\Persistence\ValueObjects\DbDateTime;

class CreatedAt implements ValueObject
{
    use DbDateTime;

    public function getDate(): DateTimeImmutable
    {
        return $this->date;
    }
}
