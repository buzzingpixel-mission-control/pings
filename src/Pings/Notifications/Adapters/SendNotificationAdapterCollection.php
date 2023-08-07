<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters;

use MissionControlPings\Pings\Ping;
use Spatie\Cloneable\Cloneable;

use function array_map;
use function array_merge;
use function array_values;

class SendNotificationAdapterCollection implements SendNotification
{
    use Cloneable;

    /** @var SendNotification[] */
    public array $adapters;

    /** @param SendNotification[] $adapters */
    public function __construct(array $adapters = [])
    {
        $this->adapters = array_values(array_map(
            static fn (SendNotification $s) => $s,
            $adapters,
        ));
    }

    public function withAdapter(SendNotification $adapter): static
    {
        return $this->with(adapters: array_merge(
            $this->adapters,
            [$adapter],
        ));
    }

    public function send(Ping $ping): SendStatus
    {
        array_map(
            static fn (SendNotification $s) => $s->send($ping),
            $this->adapters,
        );

        return new SendStatus(true);
    }
}
