<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\UpdateLastNotificationAt;

use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\LastNotificationAt;
use Psr\Clock\ClockInterface;

readonly class UpdateLastNotificationAtWithCurrentTime implements UpdateLastNotificationAt
{
    public function __construct(
        private ClockInterface $clock,
        private PingRepository $pingRepository,
    ) {
    }

    public function update(Ping $ping): void
    {
        $this->pingRepository->savePing(
            $ping->with(lastNotificationAt: new LastNotificationAt(
                $this->clock->now(),
            )),
        );
    }
}
