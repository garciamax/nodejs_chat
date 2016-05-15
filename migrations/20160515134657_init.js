exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('chats', function (table) {
            table.increments('chats_id').primary();
            table.string('chat_name');
        }),
        knex.schema.createTable('messages', function (table) {
            table.increments('messages_id').primary();
            table.bigInteger('user_id');
            table.integer('nickname');
            table.text('message');
            table.integer('chats_id')
                .references('chats_id')
                .inTable('chats')
                .onDelete('CASCADE');

        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('chats'),
        knex.schema.dropTable('messages')
    ])
};
