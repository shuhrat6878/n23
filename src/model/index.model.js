import Maktab from './maktab.model.js';
import Sinf from './sinf.model.js';
import User from './user.model.js';


Maktab.hasMany(Sinf, { 
  foreignKey: 'maktabId', onDelete: 'CASCADE', onUpdate: 'CASCADE' 
});
Sinf.belongsTo(Maktab, { 
  foreignKey: 'maktabId' 
});


Sinf.hasMany(User, { 
  foreignKey: 'sinfId', onDelete: 'CASCADE', onUpdate: 'CASCADE' 
});
User.belongsTo(Sinf, { 
  foreignKey: 'sinfId' 
});

export { Maktab, Sinf, User };
