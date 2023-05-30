<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use MissionControlBackend\Persistence\Record;

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
