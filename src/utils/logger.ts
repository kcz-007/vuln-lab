import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

//when use logFormat, it will input these three values 
// in and output `${timestamp}[${level}]: ${message}`
const logFormat = printf(({ level, message, timestamp}) => {
    return `${timestamp}[${level}]: ${message}`;
})

export const logger = createLogger({
    level: "debug",
    //format decide the log's look like.
    format: combine(
        timestamp(),
        logFormat
    ),
    //transports decide where the log be printed to .
    transports: [
        new transports.Console({
            format: combine(colorize(), timestamp(), logFormat),
        }),
    ],
});