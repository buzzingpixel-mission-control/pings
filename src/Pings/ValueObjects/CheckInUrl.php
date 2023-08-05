<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\ValueObjects;

use Funeralzone\ValueObjectExtensions\ComplexScalars\UriTrait;
use Funeralzone\ValueObjects\ValueObject;

class CheckInUrl implements ValueObject
{
    use UriTrait;
}
