import Logger from './loaders/logger';
import config from './config';
import app from './server';
import loaders from './loaders';

async function startServer() {
  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      Server listening on port: ${config.port}
      ################################################
    `);
  });
}

startServer();