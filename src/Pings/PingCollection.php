<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use RuntimeException;

use function array_map;
use function array_values;

class PingCollection
{
    /** @var Ping[] */
    public array $pings;

    /** @param Ping[] $pings */
    public function __construct(array $pings = [])
    {
        $this->pings = array_values(array_map(
            static fn (Ping $p) => $p,
            $pings,
        ));
    }

    public function first(): Ping
    {
        $ping = $this->firstOrNull();

        if ($ping === null) {
            throw new RuntimeException('No ping found');
        }

        return $ping;
    }

    public function firstOrNull(): Ping|null
    {
        return $this->pings[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->pings,
        ));
    }

    /** @return array<array-key, array<string, scalar|null>> */
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (Ping $p) => $p->asArray(),
        );
    }
}
