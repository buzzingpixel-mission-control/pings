<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;
use MissionControlBackend\Persistence\ValueObjects\DbDateTime;

class LastPingAt implements ValueObject
{
    use DbDateTime;
}
