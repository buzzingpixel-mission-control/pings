<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;
use PDOException;

readonly class FindPings
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindPingParameters|null $parameters = null,
    ): PingRecord {
        $parameters ??= new FindPingParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindPingParameters|null $parameters = null,
    ): PingRecord|null {
        $parameters ??= new FindPingParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindPingParameters|null $parameters = null,
    ): PingRecordCollection {
        try {
            $parameters ??= new FindPingParameters();

            $customQuery = $parameters->buildQuery();

            $statement = $this->pdo->prepare($customQuery->query);

            $statement->execute($customQuery->params);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                PingRecord::class,
            );

            return new PingRecordCollection(
                $results !== false ? $results : [],
            );
        } catch (PDOException) {
            // Annoyingly, an invalidly formatted UUID will cause a PDO
            // exception
            return new PingRecordCollection();
        }
    }
}
