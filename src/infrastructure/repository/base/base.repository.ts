import { HydratedDocument, Model } from 'mongoose';
import { IBaseRepository } from './base.interface';
import { IBaseSchemaCommon } from '../../../domain/schema/base';

export class BaseRepository<M extends IBaseSchemaCommon>
  implements IBaseRepository<M>
{
  protected myId: number;

  constructor(protected model: Model<M>) {}

  async count(): Promise<number> {
    return this.model.countDocuments();
  }

  async find(): Promise<Array<HydratedDocument<M>>> {
    return this.model.find({});
  }

  async findBy(condition: Partial<M>) {
    return this.model.find(condition);
  }

  async findById(id: number): Promise<HydratedDocument<M>> {
    return this.model.findById(id);
  }

  async findOne(condition: Partial<M>): Promise<HydratedDocument<M>> {
    return this.model.findOne(condition);
  }

  async create(data: Partial<M>) {
    return this.model.create(data);
  }

  async createMany(data: Partial<M>[]): Promise<number[]> {
    const payload = data.map((document: M) => {
      return {
        insertOne: {
          document: document as HydratedDocument<M>,
        },
      };
    });

    const res = await this.model.bulkWrite(payload);

    return Object.values(res.insertedIds);
  }

  async update(condition: Partial<M>, data: Partial<M>) {
    return this.model.findOneAndUpdate(condition, data, {
      new: true,
    });
  }

  async updateById(id: number, data: Partial<M>): Promise<HydratedDocument<M>> {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteBy(condition: Partial<M>): Promise<boolean> {
    await this.model.deleteMany(condition);

    return true;
  }

  async deleteById(id: number) {
    await this.model.deleteOne({
      _id: id,
    });

    return true;
  }

  /**
   * Delete by condition
   * @param condition
   * @returns document has deleted
   */
  async delete(condition: Partial<M>): Promise<HydratedDocument<M>> {
    const data = await this.model.findOneAndDelete(condition);

    return data;
  }

  async deleteByIds(ids: number[]): Promise<boolean> {
    await this.model.deleteMany({ _id: { $in: ids } });
    return true;
  }

  async checkExistBy(condition: Partial<M>): Promise<boolean> {
    const result = await this.model.countDocuments(condition);
    return result > 0;
  }
}
