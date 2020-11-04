import express, { Application, Request, Response } from 'express';

// Boot express
const app: Application = express();
const port = 8080;

// Application routing
app.use('/hello', (req: Request, res: Response): void => {
  res.status(200).send({ data: 'Hello' });
});

app.get('/coucou', (req: Request, res: Response): void => {
  res.json({ coucou: 'Romain Jaldo' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
