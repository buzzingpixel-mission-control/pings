<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters;

readonly class SendStatus
{
    public function __construct(public bool $notificationsWereSent)
    {
    }
}
