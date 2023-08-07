<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Mailer;

use MissionControlBackend\Mailer\QueueMailer;
use MissionControlPings\Pings\Notifications\Adapters\SendNotification;
use MissionControlPings\Pings\Notifications\Adapters\SendStatus;
use MissionControlPings\Pings\Ping;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

readonly class SendNotificationWithMailer implements SendNotification
{
    public function __construct(
        private QueueMailer $queueMailer,
        private EmailFactory $emailFactory,
    ) {
    }

    /** @throws TransportExceptionInterface */
    public function send(Ping $ping): SendStatus
    {
        $this->queueMailer->send(
            $this->emailFactory->createFromPing($ping),
        );

        return new SendStatus(true);
    }
}
