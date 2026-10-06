import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export const config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGODB_URL
};

if (!config.port || !config.nodeEnv || !config.mongoUri){
    console.error('Invalid configuration: Check the .env file. PORT/NODE_ENV/MONGODB_URL are missing or are not formatted correctly.');
    process.exit(1);
}