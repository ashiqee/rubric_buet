import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}


interface IUserModel extends Model<IUser> {
    hashPassword(password: string): Promise<string>;
    comparePassword(enteredPassword: string, hashedPassword: string): Promise<boolean>;
  }
  

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


userSchema.statics.comparePassword = async function (
    enteredPassword: string,
    hashedPassword: string
  ) {
    return bcrypt.compare(enteredPassword, hashedPassword);
  };
  

// Static method to hash password
userSchema.statics.hashPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

const User = mongoose.models.User as IUserModel || mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
