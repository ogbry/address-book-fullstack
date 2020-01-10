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
            type: 'text',
        },
        mobile_phone: {
            type: 'text',
        },
        work_phone: {
            type: 'text',
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
            type: 'text',
        },
        country: {
            type: 'text',
        },
  });
};