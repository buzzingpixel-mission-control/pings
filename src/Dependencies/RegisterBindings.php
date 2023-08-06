<?php

declare(strict_types=1);

namespace MissionControlPings\Dependencies;

use MissionControlBackend\ContainerBindings;
use MissionControlPings\Pings\Config\PingConfig;
use MissionControlPings\Pings\Config\PingConfigFactory;
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
    }
}
