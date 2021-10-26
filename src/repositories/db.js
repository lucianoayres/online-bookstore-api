import Sequelize from 'sequelize'

const URI =
  'postgres://ubpavdqn:9YKtBULQmcDqaB0eoWJd0YM9yZ7Vls-O@tuffi.db.elephantsql.com/ubpavdqn'

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
})

export default sequelize
