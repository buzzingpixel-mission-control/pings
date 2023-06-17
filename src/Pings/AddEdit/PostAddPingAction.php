<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlPings\Pings\NewPing;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\ExpectEvery;
use MissionControlPings\Pings\ValueObjects\NullValue;
use MissionControlPings\Pings\ValueObjects\ProjectId;
use MissionControlPings\Pings\ValueObjects\Title;
use MissionControlPings\Pings\ValueObjects\WarnAfter;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class PostAddPingAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->post('/pings/add', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private PingRepository $repository,
        private JsonResponder $jsonResponder,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $rawPostData = $request->getParsedBody();

        $postData = PostedData::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        if ($postData->projectId->toNative() === '') {
            $projectId = new NullValue();
        } else {
            $projectId = ProjectId::fromNative(
                $postData->projectId->toNative(),
            );
        }

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->createPing(
                    new NewPing(
                        Title::fromNative(
                            $postData->title->toNative(),
                        ),
                        ExpectEvery::fromNative(
                            $postData->expectEvery->toNative(),
                        ),
                        WarnAfter::fromNative(
                            $postData->warnAfter->toNative(),
                        ),
                        $projectId,
                    ),
                ),
            ),
        );
    }
}
