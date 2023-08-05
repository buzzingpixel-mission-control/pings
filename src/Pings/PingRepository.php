<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use Cocur\Slugify\Slugify;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Url\ApiUrlGenerator;
use MissionControlPings\Pings\Persistence\CreatePing;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\Persistence\FindPings;
use MissionControlPings\Pings\Persistence\PingRecord;
use MissionControlPings\Pings\Persistence\SavePing;

readonly class PingRepository
{
    public function __construct(
        private Slugify $slugify,
        private SavePing $savePing,
        private FindPings $findPings,
        private CreatePing $createPing,
        private ApiUrlGenerator $apiUrlGenerator,
        private NewPingIdFactory $newPingIdFactory,
    ) {
    }

    public function createPing(NewPing $entity): ActionResult
    {
        return $this->createPing->create(
            PingRecord::fromNewEntity(
                $this->newPingIdFactory->addPingId(
                    $entity->withSlugFromString(
                        $this->slugify->slugify(
                            $entity->title->toNative(),
                        ),
                    ),
                ),
            ),
        );
    }

    public function savePing(Ping $entity): ActionResult
    {
        return $this->savePing->save(
            PingRecord::fromEntity(
                $entity->withSlugFromString(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                ),
            ),
        );
    }

    public function findOne(FindPingParameters|null $parameters = null): Ping
    {
        return Ping::fromRecord(
            $this->findPings->findOne($parameters),
            $this->apiUrlGenerator,
        );
    }

    public function findOneOrNull(
        FindPingParameters|null $parameters = null,
    ): Ping|null {
        $record = $this->findPings->findOneOrNull($parameters);

        if ($record === null) {
            return null;
        }

        return Ping::fromRecord(
            $record,
            $this->apiUrlGenerator,
        );
    }

    public function findAll(
        FindPingParameters|null $parameters = null,
    ): PingCollection {
        $records = $this->findPings->findAll($parameters);

        /** @phpstan-ignore-next-line */
        return new PingCollection($records->map(
            fn (PingRecord $record) => Ping::fromRecord(
                $record,
                $this->apiUrlGenerator,
            )
        ));
    }
}
