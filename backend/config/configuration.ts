export default () => ({
    port: Number(process.env.PORT) || 3000,
    isDev: Boolean(process.env.NODE_ENV == 'dev'),
    database: {
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      host: process.env.POSTGRES_HOST || 'localhost',
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DATABASE || 'postgres',
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    },
  });
  