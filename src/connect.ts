import mongoose from 'mongoose';

export type MongoDsn = string;

export default (db: MongoDsn): void => {
  const connect = (): void => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then((): void => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((error): void => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
