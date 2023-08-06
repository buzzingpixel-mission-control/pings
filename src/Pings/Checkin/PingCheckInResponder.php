<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Checkin;

use MissionControlPings\Pings\Ping;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

interface PingCheckInResponder
{
    public function respond(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Ping|null $ping,
    ): ResponseInterface;
}
