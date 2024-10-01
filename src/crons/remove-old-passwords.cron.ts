import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString("90 days");

    const date = timeHelper.subtractByParams(value, unit);
    const deletedCount = await oldPasswordRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deletedCount} old passwords`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldPasswordsCronJob = new CronJob("0 0 * * *", handler);
