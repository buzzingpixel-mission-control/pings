<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlPings\Pings\ValueObjects\ExpectEvery;
use MissionControlPings\Pings\ValueObjects\NullValue;
use MissionControlPings\Pings\ValueObjects\PingId;
use MissionControlPings\Pings\ValueObjects\ProjectId;
use MissionControlPings\Pings\ValueObjects\Slug;
use MissionControlPings\Pings\ValueObjects\Title;
use MissionControlPings\Pings\ValueObjects\WarnAfter;
use Ramsey\Uuid\UuidInterface;
use Spatie\Cloneable\Cloneable;

class NewPing
{
    use Cloneable;

    public function __construct(
        public Title $title,
        public ExpectEvery $expectEvery,
        public WarnAfter $warnAfter,
        public ProjectId|NullValue $projectId = new NullValue(),
        public PingId|NullValue $pingId = new NullValue(),
        public Slug $slug = new Slug(''),
    ) {
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }

    public function withPingIdFromUuid(UuidInterface $uuid): static
    {
        return $this->with(pingId: new PingId($uuid));
    }
}
