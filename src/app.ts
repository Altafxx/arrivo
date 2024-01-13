import express, { Request, Response } from 'express';
import * as users from './controllers/usersController';;

require('dotenv').config();

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.get('/users', users.get);
app.post('/users', users.post);
app.get('/users/:id', users.view);
app.put('/users/:id', users.put);
app.patch('/users/:id', users.patch);
app.delete('/users/:id', users.remove);

// app.get('/posts', posts.get);
// app.post('/posts', posts.post);
// app.get('/posts/:id', posts.view);
// app.put('/posts/:id', posts.put);
// app.patch('/posts/:id', posts.patch);
// app.delete('/posts/:id', posts.remove);
// app.get('/posts/:id/comments', comments.get);
// app.get('/posts/:id/comments?postId=1', comments.view);
// app.put('/posts/:id/comments?postId=1', comments.put);
// app.patch('/posts/:id/comments?postId=1', comments.patchh);
// app.delete('/posts/:id/comments?postId=1', comments.delete);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
