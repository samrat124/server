import { Schema, model, Document } from 'mongoose';

interface BookModel extends Document {
  title: string;
  author: string;
  createdAt: Date;
  creator?: string;
  viewer?: string;
}

const bookSchema = new Schema<BookModel>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  creator: {
    type: String,
    default: null
  },
  viewer: {
    type: String,
    default: null
  }
});

export const Book = model<BookModel>('Book', bookSchema);
