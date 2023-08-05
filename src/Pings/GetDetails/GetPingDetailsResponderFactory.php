<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\GetDetails;

use MissionControlPings\Pings\Ping;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetPingDetailsResponderFactory
{
    public function createResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Ping|null $ping,
    ): GetPingDetailsResponder {
        if ($ping === null) {
            return new GetPingDetailsResponderNotFound($request);
        }

        return new GetPingDetailsResponderFound(
            $ping,
            $response,
        );
    }
}
