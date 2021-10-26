import Sequelize from 'sequelize'

const URI = process.env.POSTGRE_URI

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
})

export default sequelize
