<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Checkin;

use MissionControlPings\Pings\Ping;

readonly class PingCheckinResponderFactory
{
    public function __construct(
        private PingCheckInResponderPersist $persist,
        private PingCheckInResponderNotFound $notFound,
    ) {
    }

    public function create(Ping|null $ping): PingCheckInResponder
    {
        if ($ping === null) {
            return $this->notFound;
        }

        return $this->persist;
    }
}
