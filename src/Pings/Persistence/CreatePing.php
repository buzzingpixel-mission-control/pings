<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use Assert\Assert;
use DateTimeInterface;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;
use Psr\Clock\ClockInterface;
use Throwable;

use function count;
use function implode;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class CreatePing
{
    public function __construct(
        private FindPings $findPings,
        private ClockInterface $clock,
        private MissionControlPdo $pdo,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function create(PingRecord $record): ActionResult
    {
        $validationResult = $this->validateRecord($record);

        if (! $validationResult->success) {
            return $validationResult;
        }

        $record->id = $this->uuidFactory->uuid4()->toString();

        $record->created_at = $this->clock->now()->format(
            DateTimeInterface::ATOM,
        );

        $statement = $this->pdo->prepare(implode(' ', [
            'INSERT INTO',
            $record->tableName(),
            $record->columnsAsInsertIntoString(),
            'VALUES',
            $record->columnsAsValuePlaceholders(),
        ]));

        if (! $statement->execute($record->asParametersArray())) {
            return new ActionResult(
                false,
                $this->pdo->errorInfo(),
                $this->pdo->errorCode(),
            );
        }

        return new ActionResult();
    }

    private function validateRecord(PingRecord $record): ActionResult
    {
        $errors = [];

        try {
            Assert::that($record->ping_id)->notEmpty(
                'Ping ID must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        try {
            Assert::that($record->title)->notEmpty(
                'Title must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        try {
            Assert::that($record->slug)->notEmpty(
                'Slug must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        $existingPing = $this->findPings->findOneOrNull(
            (new FindPingParameters())->withSlug(
                $record->slug,
            ),
        );

        if ($existingPing !== null) {
            $errors[] = 'Slug must be unique';
        }

        try {
            Assert::that($record->expect_every)->greaterThan(
                0,
                'Expect Every must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        try {
            Assert::that($record->warn_after)->greaterThan(
                0,
                'Warn After must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        return new ActionResult(
            count($errors) < 1,
            $errors,
        );
    }
}
