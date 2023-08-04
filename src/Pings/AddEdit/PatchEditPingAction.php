<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\ExpectEvery;
use MissionControlPings\Pings\ValueObjects\NullValue;
use MissionControlPings\Pings\ValueObjects\ProjectId;
use MissionControlPings\Pings\ValueObjects\Title;
use MissionControlPings\Pings\ValueObjects\WarnAfter;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_array;
use function is_string;

readonly class PatchEditPingAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/pings/edit/{id}', self::class)
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
            (new FindPingParameters())
                ->withId($id),
        );

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
                $this->repository->savePing(
                    $ping->with(title: Title::fromNative(
                        $postData->title->toNative(),
                    ))->with(expectEvery: ExpectEvery::fromNative(
                        $postData->expectEvery->toNative(),
                    ))->with(warnAfter: WarnAfter::fromNative(
                        $postData->warnAfter->toNative(),
                    ))->with(projectId: $projectId),
                ),
            ),
        );
    }
}
