import { Router } from 'express';
import { AdminModel } from '../../database/models/admin.model';
import { CARD_STATUSES, CardModel } from '../../database/models/card.model';
import { asyncHandler } from '../utils/asyncHandler';

export const cardRouter = Router();

// admin action: update a card's status, and its amount when confirming
cardRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const { status, amount } = req.body ?? {};
    if (status && !CARD_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'invalid status' });
    }
    const update: Record<string, unknown> = {};
    if (status) update.status = status;
    if (amount !== undefined) update.amount = amount;
    const card = await CardModel.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!card) return res.status(404).json({ message: 'card not found' });
    res.json(card);
  }),
);

// client action: submit a number to a specific admin; the first entry stores it as pending
cardRouter.post(
  '/verify',
  asyncHandler(async (req, res) => {
    const ref = String(req.body?.ref ?? '').trim();
    const number = String(req.body?.number ?? '').replace(/\D/g, '');
    if (!ref) return res.status(400).json({ result: 'error', message: 'Missing submission link.' });
    if (number.length !== 16) {
      return res.status(400).json({ result: 'error', message: 'Enter a valid 16-digit code.' });
    }

    const admin = await AdminModel.findOne({ ref });
    if (!admin) return res.status(404).json({ result: 'error', message: 'Invalid submission link.' });

    const card = await CardModel.findOne({ admin_id: admin._id, number });
    if (!card) {
      await CardModel.create({ admin_id: admin._id, number });
      return res.json({ result: 'pending' });
    }

    if (card.status === 'confirmed') return res.json({ result: 'confirmed', amount: card.amount });
    if (card.status === 'declined') return res.json({ result: 'declined' });
    return res.json({ result: 'pending' });
  }),
);
