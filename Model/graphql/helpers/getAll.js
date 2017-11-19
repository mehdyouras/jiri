import getProjection from './getProjection'

export default function (schema, root, params, ctx, options) {
    let projection = getProjection(options);
        let items = schema
          .find(params)
          .select(projection)
          .exec();
  
        return items;
  }