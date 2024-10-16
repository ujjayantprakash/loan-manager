import mongoose, { Schema, Document } from 'mongoose';

// Interface to define the structure
export interface IUser extends Document {
  name: string;
  email: string;
  loanAmount: number;
  status: string;  // e.g., "pending", "approved", "rejected"
}

// Define schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },
});

// Export mongoose model
export default mongoose.model<IUser>('User', UserSchema);

