<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\GetDetails;

use MissionControlPings\Pings\Ping;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetPingDetailsResponderFound implements GetPingDetailsResponder
{
    public function __construct(
        private Ping $ping,
        private ResponseInterface $response,
    ) {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $this->ping->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
