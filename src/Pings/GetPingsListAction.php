<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

class GetPingsListAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any('/pings/list', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            [],
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
