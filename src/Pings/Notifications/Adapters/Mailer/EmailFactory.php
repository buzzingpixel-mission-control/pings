<?php

declare(strict_types=1);

namespace MissionControlPings\Pings\Notifications\Adapters\Mailer;

use BuzzingPixel\Templating\TemplateEngineFactory;
use MissionControlBackend\Mailer\EmailBuilderFactory;
use MissionControlBackend\Url\AppUrlGenerator;
use MissionControlPings\Pings\Ping;
use MissionControlPings\Pings\ValueObjects\Status;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

use function implode;

readonly class EmailFactory
{
    public function __construct(
        private PingMailerConfig $config,
        private AppUrlGenerator $urlGenerator,
        private EmailBuilderFactory $emailBuilderFactory,
        private TemplateEngineFactory $templateEngineFactory,
    ) {
    }

    public function createFromPing(Ping $ping): Email
    {
        $subject = [];

        if (! $ping->lastNotificationAt->isNull() && $ping->status === Status::MISSING) {
            $subject[] = 'Reminder:';
        }

        if ($ping->status !== Status::MISSING) {
            $subject[] = '🙂 The Ping';
            $subject[] = $ping->title->toNative();
            $subject[] = 'is now healthy';
        } else {
            $subject[] = '😞 The Ping';
            $subject[] = $ping->title->toNative();
            $subject[] = 'is missing';
        }

        $subjectString = implode(' ', $subject);

        $viewPingDetailsUrl = $this->urlGenerator->generate(
            '/pings/' . $ping->slug->toNative(),
        );

        $text = implode("\n", [
            $subjectString,
            '',
            '',
            '',
            'Ping Details: ' . $viewPingDetailsUrl,
        ]);

        $html = $this->templateEngineFactory->create()
            ->templatePath(__DIR__ . '/email-html.phtml')
            ->addVar('title', $subjectString)
            ->addVar('viewPingDetailsUrl', $viewPingDetailsUrl)
            ->render();

        $email = $this->emailBuilderFactory->create()
            ->subject($subjectString)
            ->text($text)
            ->html($html)
            ->getEmail();

        $this->config->toAddresses->map(
            static fn (Address $a) => $email->addTo($a),
        );

        return $email;
    }
}
