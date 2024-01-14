import express from 'express';
import * as auth from './controllers/authController';
import * as users from './controllers/usersController';
import * as posts from './controllers/postsController';
import * as cats from './controllers/categoryController';
import * as subs from './controllers/subscriptionController';
import * as payment from './controllers/paymentContoller';

import * as jwt from './middleware/jwt';

require('dotenv').config();

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Public route
app.get('/login', auth.login)
app.get('/payment/success', payment.success);

// Protected route
app.use(jwt.check)
app.get('/users', users.get);
app.post('/users', users.post);
app.get('/users/:id', users.view);
app.put('/users/:id', users.put);
app.patch('/users/:id', users.patch);
app.delete('/users/:id', users.remove);

app.get('/posts', posts.get);
app.post('/posts', posts.post);
app.get('/posts/:id', posts.view);
app.put('/posts/:id', posts.put);
app.patch('/posts/:id', posts.patch);
app.delete('/posts/:id', posts.remove);

app.get('/categories', cats.get);
app.post('/categories', cats.post);
app.get('/categories/:id', cats.view);
app.put('/categories/:id', cats.put);
app.patch('/categories/:id', cats.patch);
app.delete('/categories/:id', cats.remove);

app.get('/subs/premium/:id', subs.premium);
app.get('/subs/normal/:id', subs.normal);

app.get('/payment/submit', payment.submit);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
