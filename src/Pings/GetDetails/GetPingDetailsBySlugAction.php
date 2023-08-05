<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\GetDetails;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\PingRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class GetPingDetailsBySlugAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any('/pings/{slug}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private PingRepository $repository,
        private GetPingDetailsResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $slug = $request->getAttribute('slug');

        assert(is_string($slug));

        return $this->responderFactory->createResponder(
            $request,
            $response,
            $this->repository->findOneOrNull(
                FindPingParameters::create()->withSlug($slug),
            ),
        )->respond();
    }
}
