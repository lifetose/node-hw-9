import { IOldPassword } from "../interfaces/old-password.interface";
import { OldPassword } from "../models/old-password.model";

class OldPasswordRepository {
  public async create(dto: Partial<IOldPassword>): Promise<IOldPassword> {
    return await OldPassword.create(dto);
  }

  public async getByUserId(userId: string): Promise<IOldPassword[]> {
    return await OldPassword.find({ _userId: userId });
  }

  public async getByPassword(password: string): Promise<IOldPassword | null> {
    return await OldPassword.findOne({ password });
  }

  public async deleteManyByParams(
    params: Partial<IOldPassword>,
  ): Promise<void> {
    await OldPassword.deleteMany(params);
  }

  public async deleteBeforeDate(date: Date): Promise<number> {
    const { deletedCount } = await OldPassword.deleteMany({
      createdAt: { $lt: date },
    });
    return deletedCount;
  }
}

export const oldPasswordRepository = new OldPasswordRepository();
