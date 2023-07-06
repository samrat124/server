import { Request, Response } from 'express';
import { Book } from '../models/book';

export const createBook = (req: Request, res: Response) => {
  const { title, author } = req.body;

  const book = new Book({
    title,
    author,
    createdAt: new Date()
  });

  book.save()
    .then(() => {
      res.status(201).json({ message: 'Book created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
};

export const getBooks = (req: Request, res: Response) => {
  const { token } = req.body;
  const { new: isNew, old: isOld } = req.query;

  const findOptions: any = {};

  if (isNew) {
    findOptions.createdAt = { $gte: new Date(Date.now() - 10 * 60 * 1000) };
  } else if (isOld) {
    findOptions.createdAt = { $lt: new Date(Date.now() - 10 * 60 * 1000) };
  }

  if (token.roles.includes('CREATOR')) {
    findOptions.creator = token.userId;
  } else if (token.roles.includes('VIEWER')) {
    findOptions.viewer = token.userId;
  }

  Book.find(findOptions)
    .then((books) => {
      res.status(200).json({ books });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
};
