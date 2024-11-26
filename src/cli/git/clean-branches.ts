import {
  cancel,
  confirm,
  group,
  intro,
  log,
  multiselect,
  outro,
  spinner,
} from '@clack/prompts';
import { Command } from 'commander';
import $git from 'simple-git';
import { greet } from '@/utils/greet';

export const clean = new Command()
  .name('clean-branches')
  .description('Delete selected loca branches')
  .action(async () => {
    intro();
    log.message(await greet('Clean branches'));

    const git = $git();

    const localBranches = Object.entries((await git.branchLocal()).branches);

    const branches = localBranches
      .filter(([_, details]) => !details.current)
      .map(([branch, details]) => ({
        label: branch,
        value: branch,
        hint: details.label,
      }));

    const { selectedBranches, confirmation } = await group(
      {
        selectedBranches: () =>
          multiselect({
            message: 'Local branches',
            options: branches,
            initialValues: branches.map(({ value }) => value),
          }),
        confirmation: () =>
          confirm({
            message:
              'Are you sure you want to delete the selected branches forcefully?',
          }),
      },
      {
        onCancel: () => {
          cancel('Operation cancelled');
          process.exit(0);
        },
      },
    );

    if (!confirmation) {
      cancel('Operation cancelled.');
      process.exit(0);
    }
    const s = spinner();

    s.start('Forcefully deleting branches...');

    const attemptedBranches = Object.entries(
      (await git.deleteLocalBranches(selectedBranches, true)).branches,
    );

    attemptedBranches.forEach(([branch, details]) => {
      if (details.success) {
        log.success(branch);
        return;
      }

      log.error(`${branch} failed!`);
    });

    s.stop();

    outro("You're all set!");
  });
