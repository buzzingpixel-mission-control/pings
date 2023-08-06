<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

use DateTimeImmutable;
use League\Pipeline\StageInterface;
use MissionControlPings\Pings\ValueObjects\Status;
use Psr\Clock\ClockInterface;

use function assert;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingAnyTypeHint

readonly class CheckPing implements StageInterface
{
    public function __construct(private ClockInterface $clock)
    {
    }

    public function __invoke($payload): CheckPingResults
    {
        assert($payload instanceof PipelinePayload);

        return $this->runCheck($payload);
    }

    public function runCheck(PipelinePayload $pipelinePayload): CheckPingResults
    {
        $current = $this->clock->now();

        $lastPingAt = $pipelinePayload->ping->lastPingAtOrCreatedAt();

        $diff = $lastPingAt->getDate()->diff($current);

        $diffInSeconds = (new DateTimeImmutable())
            ->setTimestamp(0)
            ->add($diff)
            ->getTimestamp();

        $diffInMinutes = (int) ($diffInSeconds / 60);

        $status = Status::HEALTHY;

        if ($diffInMinutes > $pipelinePayload->ping->expectEvery->toNative()) {
            $status = Status::PENDING_MISSING;
        }

        if ($diffInMinutes > $pipelinePayload->ping->warnAfter->toNative()) {
            $status = Status::MISSING;
        }

        return new CheckPingResults(
            $pipelinePayload->ping,
            $status,
        );
    }
}
