<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings\CheckPipeline;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingAnyTypeHint

use League\Pipeline\StageInterface;

use function assert;

readonly class CheckPingResultsProcessor implements StageInterface
{
    public function __construct(
        private UpdateStatusFactory $updateStatusFactory,
    ) {
    }

    public function __invoke($payload): CheckPingResults
    {
        assert($payload instanceof CheckPingResults);

        return $this->runProcessor($payload);
    }

    public function runProcessor(CheckPingResults $results): CheckPingResults
    {
        return new CheckPingResults(
            $this->updateStatusFactory->create($results)->update(
                $results,
            ),
            $results->status,
        );
    }
}
