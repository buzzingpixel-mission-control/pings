<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Slack;

use MissionControlBackend\Slack\Chat\Attachment;
use MissionControlBackend\Slack\Chat\AttachmentAction;
use MissionControlBackend\Slack\Chat\Message;
use MissionControlBackend\Url\AppUrlGenerator;
use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\ValueObjects\Status;
use Psr\Clock\ClockInterface;

use function implode;

readonly class MessageFactory
{
    public function __construct(
        private ClockInterface $clock,
        private PingSlackConfig $config,
        private AppUrlGenerator $urlGenerator,
    ) {
    }

    public function createFromPing(Ping $ping): Message
    {
        $text = [];

        if (! $ping->lastNotificationAt->isNull() && $ping->status === Status::MISSING) {
            $subject[] = 'Reminder:';
        }

        if ($ping->status !== Status::MISSING) {
            $text[] = 'The Ping';
            $text[] = $ping->title->toNative();
            $text[] = 'is now healthy';
        } else {
            $text[] = 'The Ping';
            $text[] = $ping->title->toNative();
            $text[] = 'is missing';
        }

        $textString = implode(' ', $text);

        $viewPingDetailsUrl = $this->urlGenerator->generate(
            '/pings/' . $ping->slug->toNative(),
        );

        $viewPingDetails = new AttachmentAction(
            'View Ping Details',
            $viewPingDetailsUrl,
        );

        $ts = (string) $this->clock->now()->getTimestamp();

        $message = (new Message());

        if ($this->config->slackChannel !== null) {
            $message = $message->withChannel(
                $this->config->slackChannel,
            );
        }

        if ($ping->status !== Status::MISSING) {
            $preText = implode(' ', [
                ':simple_smile:',
                $textString,
            ]);

            return $message->withAttachment(
                (new Attachment())
                    ->withFallback($preText)
                    ->withColor('#3c763d')
                    ->withPretext($preText)
                    ->withText($textString)
                    ->withAction($viewPingDetails)
                    ->withTs($ts),
            );
        }

        $preText = implode(' ', [
            ':disappointed:',
            $textString,
        ]);

        return $message->withAttachment(
            (new Attachment())
                ->withFallback($preText)
                ->withColor('#a94442')
                ->withPretext($preText)
                ->withText($textString)
                ->withAction($viewPingDetails)
                ->withTs($ts),
        );
    }
}
