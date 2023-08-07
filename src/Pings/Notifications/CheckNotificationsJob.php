<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications;

use JetBrains\PhpStorm\ArrayShape;
use MissionControlPings\Pings\Notifications\UpdateLastNotificationAt\UpdateLastNotificationAtFactory;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\PingRepository;

readonly class CheckNotificationsJob
{
    public function __construct(
        private PingRepository $repository,
        private SendNotificationFactory $sendNotificationFactory,
        private UpdateLastNotificationAtFactory $updateLastNotificationAtFactory,
    ) {
    }

    /**
     * This job is only added to the queue if notification is set as missing
     *
     * @param string[] $context
     */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape(['pingId' => 'string'])]
        array $context,
    ): void {
        $id = $context['pingId'];

        $ping = $this->repository->findOne(
            FindPingParameters::create()->withId($id),
        );

        $sendStatus = $this->sendNotificationFactory->create($ping)
            ->send($ping);

        $this->updateLastNotificationAtFactory->create(
            $sendStatus,
            $ping,
        )->update($ping);
    }
}
