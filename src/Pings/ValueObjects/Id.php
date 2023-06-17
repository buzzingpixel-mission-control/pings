<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\ValueObjects;

use Funeralzone\ValueObjectExtensions\ComplexScalars\UUIDTrait;
use Funeralzone\ValueObjects\ValueObject;

class Id implements ValueObject
{
    use UUIDTrait;
}
