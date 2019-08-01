exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('contacts', {
    	id: {
            type: 'serial',
            primaryKey: true,
        },
        first_name: {
            type: 'text',
            notNull: true,
        },
        last_name: {
            type: 'text',
        },
        home_phone: {
            type: 'integer',
        },
        mobile_phone: {
            type: 'integer',
        },
        work_phone: {
            type: 'integer',
        },
        email: {
            type: 'text',
        },
        city: {
            type: 'text',
        },
        state_or_province: {
            type: 'text',
        },
        postal_code: {
            type: 'integer',
        },
        country: {
            type: 'text',
        },
  });
};

exports.down = (pgm) => {

};
