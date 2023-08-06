<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Checkin;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\PingRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class PingCheckinAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any('/pings/checkin/{id}', self::class);
    }

    public function __construct(
        private PingRepository $repository,
        private PingCheckinResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $id = $request->getAttribute('id');
        assert(is_string($id));

        $ping = $this->repository->findOneOrNull(
            FindPingParameters::create()
                ->withPingId($id),
        );

        return $this->responderFactory->create($ping)->respond(
            $request,
            $response,
            $ping,
        );
    }
}
