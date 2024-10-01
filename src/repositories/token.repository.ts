import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }

  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

  public async deleteManyByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteMany(params);
  }

  public async deleteBeforeDate(date: Date): Promise<number> {
    const { deletedCount } = await Token.deleteMany({
      createdAt: { $lt: date },
    });
    return deletedCount;
  }

  public async findUsersWithOldTokens(date: Date): Promise<any[]> {
    const usersWithOldTokens = await Token.find({ createdAt: { $lt: date } })
      .populate("_userId", "name email")
      .exec();

    console.log(usersWithOldTokens);

    return usersWithOldTokens;
  }
}

export const tokenRepository = new TokenRepository();
