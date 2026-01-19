import mongoose from 'mongoose';
import { RoleEnum } from '../types/role';
export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { 
          type: String, 
          enum: Object.values(RoleEnum),
          default: RoleEnum.user,
          required: true 
        },
    },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model('User', UserSchema);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, createdAt, updatedAt, ...rest } = ret;
    return {
      id: _id.toString(),
      ...rest,
    };
  },
});
