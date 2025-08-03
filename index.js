import express from 'express';
import uploadRouter from './upload.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/upload', uploadRouter);

app.listen(PORT, () => {
    console.log(`Server http://localhost: ${PORT} serverda ishlamoqda`);
});