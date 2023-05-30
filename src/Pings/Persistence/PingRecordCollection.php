<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use RuntimeException;

use function array_map;
use function array_values;
use function count;

class PingRecordCollection
{
    /** @var PingRecord[] */
    public array $records;

    /** @param PingRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (PingRecord $r) => $r,
            $records,
        ));
    }

    public function first(): PingRecord
    {
        $record = $this->firstOrNull();

        if ($record === null) {
            throw new RuntimeException('No record found');
        }

        return $record;
    }

    public function firstOrNull(): PingRecord|null
    {
        return $this->records[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->records,
        ));
    }

    public function count(): int
    {
        return count($this->records);
    }
}
