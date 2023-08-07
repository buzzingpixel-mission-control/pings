<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

use MissionControlPings\Pings\Notifications\Adapters\SendNotification;
use MissionControlPings\Pings\Notifications\Adapters\SendNotificationAdapterFactory;
use MissionControlPings\Pings\Notifications\Adapters\SendStatus;
use MissionControlPings\Pings\Ping;

readonly class SendNotificationWithConfiguredAdapters implements SendNotification
{
    public function __construct(
        private SendNotificationAdapterFactory $sendNotificationAdapterFactory,
    ) {
    }

    public function send(Ping $ping): SendStatus
    {
        $this->sendNotificationAdapterFactory->create()->send($ping);

        return new SendStatus(true);
    }
}
