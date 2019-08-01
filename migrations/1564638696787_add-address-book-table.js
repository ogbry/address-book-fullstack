exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('address_book', {
    	id: {
            type: 'serial',
            primaryKey: true,
        },
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
        },
        contactId: {
            type: 'integer',
            notNull: true,
            references: '"contacts"',
        },

  });
};

exports.down = (pgm) => {

};
