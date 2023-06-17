<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlPings\Pings\Persistence\PingRecord;
use MissionControlPings\Pings\ValueObjects\CreatedAt;
use MissionControlPings\Pings\ValueObjects\ExpectEvery;
use MissionControlPings\Pings\ValueObjects\Id;
use MissionControlPings\Pings\ValueObjects\IsActive;
use MissionControlPings\Pings\ValueObjects\LastNotificationAt;
use MissionControlPings\Pings\ValueObjects\LastPingAt;
use MissionControlPings\Pings\ValueObjects\NullValue;
use MissionControlPings\Pings\ValueObjects\PingId;
use MissionControlPings\Pings\ValueObjects\ProjectId;
use MissionControlPings\Pings\ValueObjects\Slug;
use MissionControlPings\Pings\ValueObjects\Status;
use MissionControlPings\Pings\ValueObjects\Title;
use MissionControlPings\Pings\ValueObjects\WarnAfter;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class Ping
{
    use Cloneable;

    public static function fromRecord(PingRecord $record): self
    {
        if ($record->project_id === null) {
            $projectId = new NullValue();
        } else {
            $projectId = ProjectId::fromNative($record->project_id);
        }

        if ($record->last_ping_at === null) {
            $lastPingAt = new NullValue();
        } else {
            $lastPingAt = LastPingAt::fromNative($record->last_ping_at);
        }

        if ($record->last_notification_at === null) {
            $lastNotificationAt = new NullValue();
        } else {
            $lastNotificationAt = LastNotificationAt::fromNative(
                $record->last_notification_at,
            );
        }

        return new self(
            Id::fromNative($record->id),
            $projectId,
            PingId::fromNative($record->ping_id),
            IsActive::fromNative($record->is_active),
            Title::fromNative($record->title),
            Slug::fromNative($record->slug),
            Status::from($record->status),
            ExpectEvery::fromNative($record->expect_every),
            WarnAfter::fromNative($record->warn_after),
            $lastPingAt,
            $lastNotificationAt,
            CreatedAt::fromNative($record->created_at),
        );
    }

    public function __construct(
        public Id $id,
        public ProjectId|NullValue $projectId,
        public PingId $pingId,
        public IsActive $isActive,
        public Title $title,
        public Slug $slug,
        public Status $status,
        public ExpectEvery $expectEvery,
        public WarnAfter $warnAfter,
        public LastPingAt|NullValue $lastPingAt,
        public LastNotificationAt|NullValue $lastNotificationAt,
        public CreatedAt $createdAt,
    ) {
    }

    /** @return array<string, scalar|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'projectId' => $this->projectId->toNative(),
            'pingId' => $this->pingId->toNative(),
            'isActive' => $this->isActive->toNative(),
            'title' => $this->title->toNative(),
            'slug' => $this->slug->toNative(),
            'status' => $this->status->value,
            'expectEvery' => $this->expectEvery->toNative(),
            'warnAfter' => $this->warnAfter->toNative(),
            'lastPingAt' => $this->lastPingAt->toNative(),
            'lastNotificationAt' => $this->lastNotificationAt->toNative(),
            'createdAt' => $this->createdAt->toNative(),
        ];
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }
}
