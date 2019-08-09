exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        userid: {
            type: 'integer',
            notNull: true,
            references: '"users"',
        },
        group_name: {
            type: 'text',
            notNull: true,
        }
        
    })
};
