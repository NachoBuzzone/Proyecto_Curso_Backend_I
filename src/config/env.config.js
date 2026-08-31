import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export const config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV
};

if (!config.port || !config.nodeEnv){
    console.error('Invalid configuration: Check the .env file. PORT/NODE_ENV are missing or are not formatted correctly.');
    process.exit(1);
}