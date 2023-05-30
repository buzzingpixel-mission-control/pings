<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlPings\Pings\Persistence\PingsTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreatePingsTable extends ChangeMigration
{
    public function change(): void
    {
        PingsTable::createSchema($this)->create();
    }
}
