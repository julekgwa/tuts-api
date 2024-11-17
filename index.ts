import 'dotenv/config';
import IP from 'ip';
import { Api } from './app/app';
import { connectDB } from './app/helpers/db';

const PORT = process.env.PORT || 8080;

connectDB().then(() => console.log('Connected to DB')).catch(error => console.error('Error connecting to DB: ', error));

Api().then(app => app.listen(PORT)).then(() => console.log(`Server running on http://${IP.address()}:${PORT}`));