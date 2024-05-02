import { HydratedDocument } from 'mongoose';

export interface IBaseRepository<M> {
  find(): Promise<Array<HydratedDocument<M>>>;
  findBy(condition: Partial<M>): Promise<Array<HydratedDocument<M>>>;
  findById(id: number): Promise<HydratedDocument<M>>;
  findOne(condition: Partial<M>): Promise<HydratedDocument<M>>;
  create(data: Partial<M>): Promise<HydratedDocument<M>>;
  createMany(data: Partial<M>[]): Promise<number[]>;
  update(condition: Partial<M>, data: Partial<M>): Promise<HydratedDocument<M>>;
  updateById(id: number, data: Partial<M>): Promise<HydratedDocument<M>>;
  deleteById(id: number): Promise<boolean>;
  deleteBy(condition: Partial<M>): Promise<boolean>;
  delete(condition: Partial<M>): Promise<HydratedDocument<M>>;
  deleteByIds(ids: number[]): Promise<boolean>;
  count(): Promise<number>;
  checkExistBy(condition: Partial<M>): Promise<boolean>;
}
