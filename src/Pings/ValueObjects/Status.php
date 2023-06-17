<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\ValueObjects;

enum Status: string
{
    case UNKNOWN         = '';
    case HEALTHY         = 'healthy';
    case PENDING_MISSING = 'pendingMissing';
    case MISSING         = 'missing';
}
