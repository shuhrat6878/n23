import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import routerUser from './routes/users.route.js';
import routerCountry from './routes/country.route.js';
import routerCity from './routes/city.route.js';
import { errorHendle } from './middlewares/error.middlewares.js';

const app = new Koa();
app.use(bodyParser());

app.use(routerUser.routes());
app.use(routerCountry.routes());
app.use(routerCity.routes())

app.use(errorHendle);

app.listen(3000, console.log('server running on port', 3000))