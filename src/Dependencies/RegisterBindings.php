<?php

declare(strict_types=1);

namespace MissionControlPings\Dependencies;

use MissionControlBackend\ContainerBindings;
use MissionControlPings\Pings\Config\PingConfig;
use MissionControlPings\Pings\Config\PingConfigFactory;
use MissionControlPings\Pings\Notifications\Adapters\Mailer\PingMailerConfig;
use MissionControlPings\Pings\Notifications\Adapters\Mailer\PingMailerConfigFactory;
use MissionControlPings\Pings\Notifications\Adapters\Slack\PingSlackConfig;
use MissionControlPings\Pings\Notifications\Adapters\Slack\PingSlackConfigFactory;
use Psr\Container\ContainerInterface;

use function assert;

class RegisterBindings
{
    public static function register(ContainerBindings $containerBindings): void
    {
        $containerBindings->addBinding(
            PingConfig::class,
            static function (ContainerInterface $di): PingConfig {
                $factory = $di->get(PingConfigFactory::class);

                assert($factory instanceof PingConfigFactory);

                return $factory->create();
            },
        );

        $containerBindings->addBinding(
            PingMailerConfig::class,
            static function (ContainerInterface $di): PingMailerConfig {
                $factory = $di->get(PingMailerConfigFactory::class);

                assert($factory instanceof PingMailerConfigFactory);

                return $factory->create();
            },
        );

        $containerBindings->addBinding(
            PingSlackConfig::class,
            static function (ContainerInterface $di): PingSlackConfig {
                $factory = $di->get(PingSlackConfigFactory::class);

                assert($factory instanceof PingSlackConfigFactory);

                return $factory->create();
            },
        );
    }
}
