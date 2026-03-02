import 'dotenv/config'
import Fastify from 'fastify';
import app from './app';

const start = async () => {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(app);

  const port = Number(process.env.PORT) || 3000;
  const host = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();