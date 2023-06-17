<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlPings\Pings\NewPing;
use MissionControlPings\Pings\Ping;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PingRecord extends Record
{
    public static function getTableName(): string
    {
        return PingsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return PingsTable::TABLE_NAME;
    }

    public static function fromNewEntity(NewPing $entity): self
    {
        $record = new self();

        $record->title = $entity->title->toNative();

        $record->expect_every = $entity->expectEvery->toNative();

        $record->warn_after = $entity->warnAfter->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->slug = $entity->slug->toNative();

        if (! $entity->pingId->isNull()) {
            /** @phpstan-ignore-next-line */
            $record->ping_id = $entity->pingId->toNative();
        }

        return $record;
    }

    public static function fromEntity(Ping $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->ping_id = $entity->pingId->toNative();

        $record->is_active = $entity->isActive->toNative();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->status = $entity->status->value;

        $record->expect_every = $entity->expectEvery->toNative();

        $record->warn_after = $entity->warnAfter->toNative();

        $record->last_ping_at = $entity->lastPingAt->toNative();

        $record->last_notification_at = $entity->lastNotificationAt->toNative();

        $record->created_at = $entity->createdAt->toNative();

        return $record;
    }

    /** Primary key */
    public string $id = '';

    public string|null $project_id = null;

    public string $ping_id = '';

    public bool $is_active = true;

    public string $title = '';

    public string $slug = '';

    public string $status = '';

    public int $expect_every = 0;

    public int $warn_after = 0;

    public string|null $last_ping_at = null;

    public string|null $last_notification_at = null;

    public string $created_at = '';
}
