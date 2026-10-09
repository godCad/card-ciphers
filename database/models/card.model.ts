import mongoose, { type InferSchemaType } from 'mongoose';

export const CARD_STATUSES = ['pending', 'needs_review', 'confirmed', 'declined'] as const;

const cardSchema = new mongoose.Schema(
  {
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true, index: true },
    number: { type: String, required: true },
    amount: { type: Number },
    status: { type: String, enum: CARD_STATUSES, default: 'pending' },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

// a card number is unique within one admin, not globally
cardSchema.index({ admin_id: 1, number: 1 }, { unique: true });

export type Card = InferSchemaType<typeof cardSchema>;

// reuse an existing compiled model to survive tsx watch reloads
export const CardModel = mongoose.models.Card ?? mongoose.model('Card', cardSchema);
