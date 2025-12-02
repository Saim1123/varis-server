import "dotenv/config"

const config = {
    PORT: process.env.PORT || 4000,
    HOST: process.env.HOST || 'localhost',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || '',
    USERNAME: process.env.USERNAME || '',
    PASSWORD: process.env.PASSWORD || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
}

Object.freeze(config);

export { config }