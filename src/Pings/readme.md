# Flow

## Checking

### Schedule

`\MissionControlPings\Pings\CheckPings\AddPingsToQueueAction` runs every minute on the schedule (`\BuzzingPixel\Scheduler\Frequency::ALWAYS`) and adds all active Pings to the queue to be checked if the ping queue is empty (we don't want to get behind and get backed up) `\MissionControlPings\Pings\CheckPings\CheckPingJob`

### Queue

Once the CheckPingJob is in the queue, it gets the Ping by ID from persistence. The it uses a pipeline to check the ping's status and process the results of the check.

Process results updates the ping's status based on the last ping date and the expectations set in expect_every and warn_after.
