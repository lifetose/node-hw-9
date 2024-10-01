import { CronJob } from "cron";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString("10 seconds");
    const date = timeHelper.subtractByParams(value, unit);
    console.log("date", date);

    const inactiveUsers = await tokenRepository.findUsersWithOldTokens(date);

    for (const user of inactiveUsers) {
      await emailService.sendMail(EmailTypeEnum.OLD_VISIT, user._userId.email, {
        name: user._userId.name,
      });
    }

    console.log(`Sent emails to ${inactiveUsers.length} inactive users.`);
  } catch (error) {
    console.error(error);
  }
};

export const sendInactiveUsersReminderCronJob = new CronJob(
  "0,5,10,20,40 * * * * *",
  handler,
);
