import express from 'express';
import path from 'path'
import rootRouter from './routes/root.js';
const app = express();
const PORT = process.env.PORT || 3500
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', rootRouter)
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 not found' })
  } else {
    res.type('txt').send('404 not found')
  }
})

app.listen(PORT, () => console.log(`SERVER runnin on ${PORT}`))



