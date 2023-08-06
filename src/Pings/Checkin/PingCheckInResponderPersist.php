<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Checkin;

use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\LastPingAt;
use Psr\Clock\ClockInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function json_encode;

readonly class PingCheckInResponderPersist implements PingCheckInResponder
{
    public function __construct(
        private ClockInterface $clock,
        private PingRepository $repository,
    ) {
    }

    public function respond(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Ping|null $ping,
    ): ResponseInterface {
        assert($ping instanceof Ping);

        $this->repository->savePing(
            $ping->with(lastPingAt: new LastPingAt(
                $this->clock->now(),
            )),
        );

        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(['status' => 'OK']));

        return $response;
    }
}
