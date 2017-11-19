export const resolvers = {
    Query: {
      user: (root, params, ctx, options) => {
        let projection = getProjection(options);
    
        let items = UserMongo
          .find(params)
          .select(projection)
          .exec();
  
        return items;
      },
      student: (root, params, ctx, options) => {
        let projection = getProjection(options);
    
        return StudentMongo
          .find(params)
          .select(projection)
          .exec();
      },
      implementation: (root, params, ctx, options) => {
        let projection = getProjection(options);
    
        return ImplementationMongo
          .find(params)
          .select(projection)
          .exec();
      },
    },
    Student: {
      implementations: (root, params, ctx, options) => {
        let projection = getProjection(options);
        
            return ImplementationMongo
              .find({student_id : root.id})
              .select(projection)
              .exec();
      }
    }
  }