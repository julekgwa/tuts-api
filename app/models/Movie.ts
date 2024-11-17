import mongoose, { Document, Schema } from 'mongoose';

type Rating = {
  source: string;
  value: number
}

export interface IMovie extends Document {
  title: string;
  releaseDate: string;
  ratings: [Rating];
  genre: string[];
  director: string;
  description?: string;
}

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  ratings: { type: [{ source: String, value: Number }], required: false },
  genre: { type: [String], required: false },
  director: { type: String, required: true },
  description: { type: String, required: false },
}, {
  timestamps: true,
});

export const Movie = mongoose.model<IMovie>('Movie', MovieSchema);