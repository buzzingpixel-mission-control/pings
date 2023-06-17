<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Persistence;

use Assert\Assert;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use Throwable;

use function count;
use function implode;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class SavePing
{
    public function __construct(
        private FindPings $findPings,
        private MissionControlPdo $pdo,
    ) {
    }

    public function save(PingRecord $record): ActionResult
    {
        $validationResult = $this->validateRecord($record);

        if (! $validationResult->success) {
            return $validationResult;
        }

        $statement = $this->pdo->prepare(implode(' ', [
            'UPDATE',
            $record->tableName(),
            'SET',
            $record->columnsAsUpdateSetPlaceholders(),
            'WHERE id = :id',
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

        $existingPing = $this->findPings->findOneOrNull(
            (new FindPingParameters())->withSlug(
                $record->slug,
            )->withNotId($record->id),
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
