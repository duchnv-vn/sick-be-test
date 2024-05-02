export interface IBaseSchemaCommon {
  _id: number;
}

export interface IBaseSchema extends IBaseSchemaCommon {
  createdAt: Date;
  updatedAt: Date;
}
