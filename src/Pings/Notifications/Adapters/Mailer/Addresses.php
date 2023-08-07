<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Mailer;

use Symfony\Component\Mime\Address;

use function array_map;
use function array_values;

// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

class Addresses
{
    /** @var Address[] */
    public array $addresses;

    /** @param Address[] $addresses */
    public function __construct(array $addresses)
    {
        $this->addresses = array_values(array_map(
            static fn (Address $a) => $a,
            $addresses,
        ));
    }

    /** @phpstan-ignore-next-line */
    public function map(callable $callback): array
    {
        return array_map($callback, $this->addresses);
    }
}
