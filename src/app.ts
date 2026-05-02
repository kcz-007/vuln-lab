import dotenv from "dotenv";
import express from 'express';
import router from './routes';
import { errorHandler } from './middlewares/error.middlewares';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { requestId } from './middlewares/requestId';
import { validate } from './middlewares/zodValidate.middleware';
import { logContext } from './middlewares/loggerContext.middleware'
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
//使用request id，通過id來跟蹤特定客戶端id
app.use(requestId);
//使用日志中間件記錄請求，方便攻擊溯源和調試
app.use(logContext);
app.use(requestLogger);

app.use('/api', router);

//404 routes error在routes之後，捕獲路由error,注冊中間件
app.use(notFoundHandler);

app.use(validate);

//錯誤處理需要放在所有的路由匹配語句之後，捕獲服務器内部錯誤
app.use(errorHandler);
export default app;