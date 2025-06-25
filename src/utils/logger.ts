import dayjs from 'dayjs';
import pino from 'pino';

const logger = pino({
    transport: {target: 'pino-pretty', options: {colorize: true}},
    base: {pid: false},
    timestamp: () => `,"time":"${dayjs().format('DD/MM/YYYY HH:mm:ss')}"`
});

export default logger;
