<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlBackend\ActionResult;
use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_merge;
use function json_decode;

readonly class PatchPingsUnArchiveAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/pings/un-archive', self::class)
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
        /**
         * @var string[] $pingIds
         * @phpstan-ignore-next-line
         */
        $pingIds = json_decode(
            (string) $request->getBody(),
            true,
        )['pingIds'] ?? [];

        $pings = $this->repository->findAll(
            FindPingParameters::create()
                ->withIds($pingIds),
        );

        /** @var ActionResult[] $results */
        $results = $pings->map(function (Ping $ping) {
            return $this->repository->savePing(
                $ping->with(isActive: IsActive::fromNative(
                    true,
                )),
            );
        });

        $result = new ActionResult();

        foreach ($results as $intermediateResult) {
            if ($intermediateResult->success) {
                continue;
            }

            $result = new ActionResult(
                false,
                array_merge(
                    $result->message,
                    $intermediateResult->message,
                ),
            );
        }

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $result,
            ),
        );
    }
}
