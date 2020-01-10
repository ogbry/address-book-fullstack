exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('address_book', {
    	id: {
            type: 'serial',
            primaryKey: true,
        },
        userid: {
            type: 'integer',
            notNull: true,
            references: '"users"',
        },
        contactid: {
            type: 'integer',
            notNull: true,
            references: '"contacts"',
            onDelete: 'cascade'
        },
        groupid: {
        	type: 'integer',
        	notNull: false,
        	references: '"groups"',
        },
  });
};