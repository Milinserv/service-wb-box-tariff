import pino from 'pino';

const dest = pino.destination({
    dest: './src/log/app.log',
    sync: true
});

const logger = pino(dest);

export default logger;