<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings;

use BuzzingPixel\Scheduler\Frequency;
use BuzzingPixel\Scheduler\ScheduleItem;
use MissionControlBackend\Scheduler\ApplyScheduleEvent;

readonly class AddPingsToQueueAction
{
    public static function registerEvent(ApplyScheduleEvent $event): void
    {
        $event->addScheduleItem(new ScheduleItem(
            Frequency::ALWAYS,
            self::class,
        ));
    }

    public function __construct(private AddPingsToQueueFactory $factory)
    {
    }

    public function __invoke(): void
    {
        $this->factory->create()->add();
    }
}
