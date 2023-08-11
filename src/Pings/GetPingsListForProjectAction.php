<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlBackend\Projects\Persistence\FindProjectParameters;
use MissionControlBackend\Projects\ProjectRepository;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

use function assert;
use function is_string;
use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetPingsListForProjectAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get(
            '/pings/list/project/{projectId}',
            self::class,
        )->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private PingRepository $repository,
        private ProjectRepository $projectRepository,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $projectId = $request->getAttribute('projectId');

        assert(is_string($projectId));

        // Validate that it's a valid project ID
        $project = $this->projectRepository->findOneOrNull(
            (new FindProjectParameters())
                ->withId($projectId),
        );

        if ($project === null) {
            throw new HttpNotFoundException($request);
        }

        $items = $this->repository->findAll(
            FindPingParameters::create()
                ->withProjectId($projectId)
                ->withOrderBy('title')
                ->withSort(Sort::ASC),
        );

        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $items->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
