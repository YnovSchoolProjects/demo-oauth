import mongoose, { Schema, Document } from 'mongoose';
import { OAuth } from '@/types/resources';

export interface User extends Document {
  emails: string[];
  githubId: string;
  displayName: string;
  username: string;
  oauthProviders: OAuth[];
}

const UserSchema: Schema = new Schema({
  githubId: { type: String, required: true, unique: true },
  emails: { type: Array, required: true },
  displayName: { type: String, required: true },
  username: { type: String, required: true },
  oauthProviders: { type: Array, required: false },
});

// Export the model and return your IUser interface
export default mongoose.model<User>('User', UserSchema);
