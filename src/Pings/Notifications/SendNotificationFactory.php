<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

use DateTimeImmutable;
use MissionControlPings\Pings\Notifications\Adapters\SendNotification;
use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\ValueObjects\LastNotificationAt;
use MissionControlPings\Pings\ValueObjects\Status;
use Psr\Clock\ClockInterface;

use function assert;

readonly class SendNotificationFactory
{
    public function __construct(
        private ClockInterface $clock,
        private SendNotificationNoOp $noOp,
        private SendNotificationWithConfiguredAdapters $withConfiguredAdapters,
    ) {
    }

    public function create(Ping $ping): SendNotification
    {
        /**
         * If we haven't sent a notification yet and the status is missing, we
         * need to send a missing notification
         */
        if ($ping->lastNotificationAt->isNull() && $ping->status === Status::MISSING) {
            return $this->withConfiguredAdapters;
        }

        /**
         * If we have sent a notification and the status is no longer missing,
         * we need to send a healthy notification
         */
        if (! $ping->lastNotificationAt->isNull() && $ping->status !== Status::MISSING) {
            return $this->withConfiguredAdapters;
        }

        /**
         * If the status is not missing, we don't need to send a notification
         * at this point
         */
        if ($ping->status !== Status::MISSING) {
            return $this->noOp;
        }

        /**
         * Now we know that the status of the ping is "missing" and we've
         * already sent a notification. So, if it's been more than 1 hour since
         * the last notification, we should send another one
         */

        $lastNotificationAt = $ping->lastNotificationAt;
        assert($lastNotificationAt instanceof LastNotificationAt);

        $current = $this->clock->now();

        $diff = $lastNotificationAt->getDate()->diff($current);

        $diffInSeconds = (new DateTimeImmutable())
            ->setTimestamp(0)
            ->add($diff)
            ->getTimestamp();

        $diffInMinutes = (int) ($diffInSeconds / 60);

        /**
         * It's been more than 1 hour, send a notification
         */
        if ($diffInMinutes > 60) {
            return $this->withConfiguredAdapters;
        }

        /**
         * It's been less than 1 hour, we don't need to send a notification
         */
        return $this->noOp;
    }
}
