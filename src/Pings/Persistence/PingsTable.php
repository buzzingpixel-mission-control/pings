<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class PingsTable
{
    public const TABLE_NAME = 'pings';

    public static function createSchema(MigrationInterface $migration): Table
    {
        return $migration->table(
            self::TABLE_NAME,
            [
                'id' => false,
                'primary_key' => ['id'],
            ],
        )->addColumn(
            'id',
            'uuid',
        )->addColumn(
            'project_id',
            'uuid',
            ['null' => true],
        )->addColumn(
            'ping_id',
            'uuid',
        )->addColumn(
            'is_active',
            'boolean',
            ['default' => 1],
        )->addColumn(
            'title',
            'string',
        )->addColumn(
            'slug',
            'string',
        )->addColumn(
            'status',
            'string',
        )->addColumn(
            'expect_every',
            'biginteger',
        )->addColumn(
            'warn_after',
            'biginteger',
        )->addColumn(
            'last_ping_at',
            'datetime',
            ['null' => true],
        )->addColumn(
            'last_notification_at',
            'datetime',
            ['null' => true],
        )->addColumn(
            'created_at',
            'datetime',
        )
            ->addIndex(['project_id'])
            ->addIndex(['ping_id'])
            ->addIndex(['title'])
            ->addIndex(['slug'])
            ->addIndex(['status'])
            ->addIndex(['last_ping_at'])
            ->addIndex(['last_notification_at'])
            ->addIndex(['created_at']);
    }
}
