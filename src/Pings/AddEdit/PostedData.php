<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\AddEdit;

use MissionControlPings\Pings\AddEdit\ValueObjects\ExpectEvery;
use MissionControlPings\Pings\AddEdit\ValueObjects\ProjectId;
use MissionControlPings\Pings\AddEdit\ValueObjects\Title;
use MissionControlPings\Pings\AddEdit\ValueObjects\WarnAfter;

readonly class PostedData
{
    /** @param string[] $data */
    public static function fromRawPostData(array $data): self
    {
        return new self(
            Title::fromNative($data['title'] ?? ''),
            ExpectEvery::fromNative(
                $data['expect_every'] ?? '',
            ),
            WarnAfter::fromNative($data['warn_after'] ?? ''),
            ProjectId::fromNative($data['project_id'] ?? ''),
        );
    }

    public function __construct(
        public Title $title,
        public ExpectEvery $expectEvery,
        public WarnAfter $warnAfter,
        public ProjectId $projectId,
    ) {
    }
}
