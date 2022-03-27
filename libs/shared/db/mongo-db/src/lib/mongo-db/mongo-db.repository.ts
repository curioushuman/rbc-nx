import { Document, FilterQuery, Model } from 'mongoose';

import { Loggable, LoggableError } from '@curioushuman/loggable';

@Loggable('MongoDb')
export abstract class MongoDbRepository<D extends Document, M> {
  constructor(protected readonly entityModel: Model<D>) {}

  @LoggableError()
  async findOne(
    entityFilterQuery: FilterQuery<D>,
    projection?: Record<string, unknown>
  ): Promise<D | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  @LoggableError()
  async find(entityFilterQuery: FilterQuery<D>): Promise<D[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  @LoggableError()
  async save(entityObj: M): Promise<D> {
    const entity = new this.entityModel(entityObj);
    return entity.save();
  }

  @LoggableError()
  async deleteMany(entityFilterQuery: FilterQuery<D>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
