<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\ValueObjects;

use Funeralzone\ValueObjects\Scalars\BooleanTrait;
use Funeralzone\ValueObjects\ValueObject;

class IsActive implements ValueObject
{
    use BooleanTrait;
}
