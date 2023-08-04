<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class PatchUnArchivePingAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/pings/un-archive/{id}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private PingRepository $repository,
        private JsonResponder $jsonResponder,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $id = $request->getAttribute('id');
        assert(is_string($id));

        $ping = $this->repository->findOne(
            (new FindPingParameters())->withId($id),
        );

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->savePing(
                    $ping->with(isActive: IsActive::fromNative(
                        true,
                    )),
                ),
            ),
        );
    }
}
