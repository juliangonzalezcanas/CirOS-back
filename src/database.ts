
const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('ciros', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

export async function connect() {
    try {
      await sequelize.sync({force: true});
      console.log('all good');
    } catch (error) {      
      console.error('Unable to sinc:', error);
    }
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}