<?php

declare(strict_types=1);

namespace MissionControlPings\Pings;

use MissionControlPings\Pings\Config\PingConfig;
use ReflectionProperty;
use Symfony\Component\Cache\Adapter\AbstractAdapter;
use Symfony\Component\Cache\Adapter\RedisAdapter;

use function is_string;

readonly class QueueKey
{
    public function __construct(
        private PingConfig $config,
        private RedisAdapter $cachePool,
    ) {
    }

    public function getKey(string $key = ''): string
    {
        $queueName = $this->config->queueName;

        $redisNamespaceProperty = new ReflectionProperty(
            AbstractAdapter::class,
            'namespace',
        );

        /** @noinspection PhpExpressionResultUnusedInspection */
        $redisNamespaceProperty->setAccessible(true);

        $namespace = $redisNamespaceProperty->getValue(
            $this->cachePool,
        );

        $namespace = is_string($namespace) ? $namespace : '';

        return $namespace . 'queue_' . $queueName . '_' . $key;
    }
}
