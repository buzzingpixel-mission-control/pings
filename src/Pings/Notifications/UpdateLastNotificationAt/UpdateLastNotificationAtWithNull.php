<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\UpdateLastNotificationAt;

use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\PingRepository;
use MissionControlPings\Pings\ValueObjects\NullValue;

class UpdateLastNotificationAtWithNull implements UpdateLastNotificationAt
{
    public function __construct(private PingRepository $pingRepository)
    {
    }

    public function update(Ping $ping): void
    {
        $this->pingRepository->savePing(
            $ping->with(lastNotificationAt: new NullValue()),
        );
    }
}
