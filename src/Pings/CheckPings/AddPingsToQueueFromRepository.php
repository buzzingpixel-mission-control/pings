<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItem;
use BuzzingPixel\Queue\QueueItemJob;
use BuzzingPixel\Queue\QueueItemJobCollection;
use MissionControlPings\Pings\Config\PingConfig;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\PingRepository;

readonly class AddPingsToQueueFromRepository implements AddPingsToQueue
{
    public function __construct(
        private PingConfig $config,
        private QueueHandler $queueHandler,
        private PingRepository $repository,
    ) {
    }

    public function add(): void
    {
        $pings = $this->repository->findAll(
            FindPingParameters::create()
                ->withIsActive(true),
        );

        $pings->map(function (Ping $ping): void {
            $this->queueHandler->enqueue(
                new QueueItem(
                    'check_pings_' . $ping->id->toNative(),
                    'Check Ping: ' . $ping->title->toNative(),
                    new QueueItemJobCollection([
                        new QueueItemJob(
                            CheckPingJob::class,
                            context: ['pingId' => $ping->id->toNative()],
                        ),
                    ]),
                ),
                $this->config->queueName,
            );
        });
    }
}
