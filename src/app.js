import express from 'express'
import config from './config'

import userRoutes from './routes/user.routes';
import contactRoutes from './routes/contact.routes';

const app = express()

// settings
app.set('port', config.port)

// middlerwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(userRoutes)
app.use(contactRoutes)

export default app;