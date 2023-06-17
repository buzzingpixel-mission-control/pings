<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\AddEdit\ValueObjects;

use Assert\Assert;
use Funeralzone\ValueObjects\Scalars\IntegerTrait;
use Funeralzone\ValueObjects\ValueObject;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingNativeTypeHint

class WarnAfter implements ValueObject
{
    use IntegerTrait;

    public function __construct(string|int $stringOrInt)
    {
        Assert::that($stringOrInt)->notEmpty(
            'Warn After is required',
        )->integerish(
            'Warn After must be a whole number',
        );

        $this->int = (int) $stringOrInt;
    }

    /**
     * @param string|int $native
     *
     * @phpstan-ignore-next-line
     */
    public static function fromNative($native): self
    {
        return new self($native);
    }
}
