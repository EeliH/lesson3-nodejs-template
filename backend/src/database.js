var Sequelize = require('sequelize');

/** INIT DATABASE **/

const sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: './db/chat.sqlite',
});

/** INIT CHAT TABLE WITH MESSAGE **/

const Chat = sequelize.define('chats', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  room: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nickname: {
    type: Sequelize.TEXT,
    allowNull: false
  },
}, {
  timestamps: true,
  instanceMethods: {
    toJSON: async function () {
      return {
        // Id and timestamps are generated automatically
        id: this.id,
        createdAt: this.createdAt,

        room: this.room,
        nickname: this.nickname,

        // Message was added on the POST request
        message: this.message,
      };
    },
  },
});

/** EXPORT CHAT OBJECT **/

exports.sync = (options) => {
  return sequelize.sync(options);
};

exports.Chat = Chat;
