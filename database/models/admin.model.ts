import { randomBytes } from 'crypto';
import mongoose, { type InferSchemaType } from 'mongoose';

const REF_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// 8 random alphanumeric characters, used as the non-guessable dashboard reference
function generateRef(length = 8): string {
  const bytes = randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i++) out += REF_ALPHABET[bytes[i] % REF_ALPHABET.length];
  return out;
}

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // non-guessable reference used in the dashboard url so the route is not enumerable
    ref: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => generateRef(),
    },
  },
  { timestamps: true },
);

export type Admin = InferSchemaType<typeof adminSchema>;

// reuse an existing compiled model to survive tsx watch reloads
export const AdminModel = mongoose.models.Admin ?? mongoose.model('Admin', adminSchema);
