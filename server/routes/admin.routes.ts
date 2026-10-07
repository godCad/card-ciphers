import { Router } from 'express';
import { AdminModel } from '../../database/models/admin.model';
import { CardModel } from '../../database/models/card.model';
import { asyncHandler } from '../utils/asyncHandler';

export const adminRouter = Router();

// create an admin; the returned ref is what opens the dashboard route
adminRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const name = String(req.body?.name ?? '').trim();
    if (!name) return res.status(400).json({ message: 'name is required' });
    const admin = await AdminModel.create({ name });
    res.status(201).json({ _id: admin._id, name: admin.name, ref: admin.ref });
  }),
);

// dashboard load: the admin plus all of its cards, newest first
adminRouter.get(
  '/:ref',
  asyncHandler(async (req, res) => {
    const admin = await AdminModel.findById(req.params.ref);
    if (!admin) return res.status(404).json({ message: 'admin not found' });
    const cards = await CardModel.find({ admin_id: admin._id }).sort({ createdAt: -1 });
    res.json({ _id: admin._id, name: admin.name, ref: admin.ref, cards });
  }),
);
