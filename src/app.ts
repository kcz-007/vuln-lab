import express from 'express';
import router from './routes';
import { errorHandler } from './middlewares/error.middlewares';
import { notFoundHandler } from './middlewares/notFound.middleware';

const app = express();

app.use(express.json());

app.use('/api', router);

//404 routes error在routes之後，捕獲路由error
app.use(notFoundHandler);

//錯誤處理需要放在所有的路由匹配語句之後，捕獲服務器内部錯誤
app.use(errorHandler);
export default app;