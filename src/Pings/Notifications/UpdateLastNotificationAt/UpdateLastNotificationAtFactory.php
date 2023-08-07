<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\UpdateLastNotificationAt;

use MissionControlPings\Pings\Notifications\Adapters\SendStatus;
use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\ValueObjects\Status;

readonly class UpdateLastNotificationAtFactory
{
    public function __construct(
        private UpdateLastNotificationAtNoOp $noOp,
        private UpdateLastNotificationAtWithNull $withNull,
        private UpdateLastNotificationAtWithCurrentTime $withCurrentTime,
    ) {
    }

    public function create(SendStatus $sendStatus, Ping $ping): UpdateLastNotificationAt
    {
        $sent = $sendStatus->notificationsWereSent;

        if ($sent && $ping->status === Status::MISSING) {
            return $this->withCurrentTime;
        }

        if ($sent && $ping->status !== Status::MISSING) {
            return $this->withNull;
        }

        return $this->noOp;
    }
}
