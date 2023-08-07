<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Slack;

use MissionControlBackend\Slack\SlackClient;
use MissionControlPings\Pings\Notifications\Adapters\SendNotification;
use MissionControlPings\Pings\Notifications\Adapters\SendStatus;
use MissionControlPings\Pings\Ping;

readonly class SendNotificationWithSlack implements SendNotification
{
    public function __construct(
        private SlackClient $slackClient,
        private MessageFactory $messageFactory,
    ) {
    }

    public function send(Ping $ping): SendStatus
    {
        $this->slackClient->chat->postMessage(
            $this->messageFactory->createFromPing($ping),
        );

        return new SendStatus(true);
    }
}
