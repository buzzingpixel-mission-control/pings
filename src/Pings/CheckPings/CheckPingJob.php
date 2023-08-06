<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\CheckPings;

use JetBrains\PhpStorm\ArrayShape;
use League\Pipeline\Pipeline;
use League\Pipeline\PipelineBuilder;
use MissionControlPings\Pings\CheckPings\CheckPipeline\CheckPing;
use MissionControlPings\Pings\CheckPings\CheckPipeline\CheckPingResultsProcessor;
use MissionControlPings\Pings\CheckPings\CheckPipeline\PipelinePayload;
use MissionControlPings\Pings\Persistence\FindPingParameters;
use MissionControlPings\Pings\PingRepository;

use function assert;

readonly class CheckPingJob
{
    public function __construct(
        private CheckPing $checkPing,
        private PingRepository $repository,
        private PipelineBuilder $pipelineBuilder,
        private CheckPingResultsProcessor $checkPingResultsProcessor,
    ) {
    }

    /** @param string[] $context */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape(['pingId' => 'string'])]
        array $context,
    ): void {
        $id = $context['pingId'];

        $ping = $this->repository->findOne(
            FindPingParameters::create()->withId($id),
        );

        $pipeline = $this->pipelineBuilder
            ->add($this->checkPing)
            ->add($this->checkPingResultsProcessor)
            ->build();

        assert($pipeline instanceof Pipeline);

        $pipeline->process(new PipelinePayload($ping));
    }
}
