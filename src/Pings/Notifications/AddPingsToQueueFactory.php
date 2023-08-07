<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

use MissionControlPings\Pings\QueueKey;
use Redis;

use function count;

readonly class AddPingsToQueueFactory
{
    public function __construct(
        private Redis $redis,
        private QueueKey $queueKey,
        private AddPingsToQueueNoOp $noOp,
        private AddPingsToQueueFromRepository $fromRepository,
    ) {
    }

    public function create(): AddPingsToQueue
    {
        $enqueuedKeys = $this->redis->keys(
            $this->queueKey->getKey(
                '*_check_ping_notifications_*',
            ),
        );

        if (count($enqueuedKeys) > 0) {
            return $this->noOp;
        }

        return $this->fromRepository;
    }
}
