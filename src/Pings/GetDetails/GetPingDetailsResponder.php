<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\GetDetails;

use Psr\Http\Message\ResponseInterface;

interface GetPingDetailsResponder
{
    public function respond(): ResponseInterface;
}
