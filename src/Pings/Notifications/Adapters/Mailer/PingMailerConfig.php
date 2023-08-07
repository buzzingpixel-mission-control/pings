<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Mailer;

class PingMailerConfig
{
    public function __construct(public Addresses $toAddresses)
    {
    }
}
