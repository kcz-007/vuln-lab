import { createLogger, format, transports } from "winston";
import winston from "winston";
import { config } from "../config";

const { combine, timestamp, printf, colorize } = format;

//when use logFormat, it will input these three values 
// in and output `${timestamp}[${level}]: ${message}`

//there was an error I made: if you define the format here,
//it would output the params here, and it has two default params which are level and message, 
//if you do nothing, just logger.info("hello"), you actually input all params here one is info and "hello" to message.
//but if you input a json data(it needs printf's param is json too),
//for example printf(({name}) => { return ${name}})
//and you input logger.info({id: "23"}), it would output nothing.
const devFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta} = info;
        return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta): ""
        }`;
    })
)

const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors.apply({stack: true}),
    winston.format.json()
)

const isProd = process.env.nodeEnv === "production";

export const logger = winston.createLogger({
    level: "info",
    format: isProd ? prodFormat : devFormat,
    transports: [new winston.transports.Console()],
})