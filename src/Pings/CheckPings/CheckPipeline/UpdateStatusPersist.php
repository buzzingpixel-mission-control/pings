<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\Status;

readonly class UpdateStatusPersist implements UpdateStatus
{
    public function __construct(private PingRepository $repository)
    {
    }

    public function update(CheckPingResults $results): Ping
    {
        $ping = $results->ping->with(status: Status::from(
            $results->status->value,
        ));

        $this->repository->savePing($ping);

        return $ping;
    }
}
