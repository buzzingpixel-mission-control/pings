<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

readonly class UpdateStatusFactory
{
    public function __construct(
        private UpdateStatusNoOp $noOp,
        private UpdateStatusPersist $persist,
    ) {
    }

    public function create(CheckPingResults $results): UpdateStatus
    {
        if ($results->status->value === $results->ping->status->value) {
            return $this->noOp;
        }

        return $this->persist;
    }
}
