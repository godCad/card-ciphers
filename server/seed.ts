import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDb } from '../database/connect';
import { AdminModel } from '../database/models/admin.model';
import { CardModel } from '../database/models/card.model';

const SEED_CARDS = [
  { number: '1234567890124821', status: 'pending' },
  { number: '2043778155201937', status: 'needs_review' },
  { number: '9981224066717510', status: 'confirmed', amount: 100 },
  { number: '7725118044336023', status: 'pending' },
  { number: '3310908776123187', status: 'declined' },
  { number: '6654220188909045', status: 'confirmed', amount: 50 },
  { number: '1120667833454762', status: 'pending' },
  { number: '8842112399801298', status: 'confirmed', amount: 250 },
  { number: '4471225566136734', status: 'needs_review' },
  { number: '5538776122909576', status: 'pending' },
  { number: '2206998144732240', status: 'confirmed', amount: 75 },
  { number: '7781334011278814', status: 'confirmed', amount: 500 },
];

async function run() {
  await connectDb();
  await AdminModel.deleteMany({});
  await CardModel.deleteMany({});
  // reconcile indexes so the old global-unique on number is replaced by the per-admin one
  await CardModel.syncIndexes();

  const admin = await AdminModel.create({ name: 'Demo Admin' });
  await CardModel.insertMany(SEED_CARDS.map((card) => ({ ...card, admin_id: admin._id })));

  console.log('Seeded database.');
  console.log(`  admin name:    ${admin.name}`);
  console.log(`  admin ref:     ${admin.ref}`);
  console.log(`  dashboard:     http://localhost:5173/admin/${admin.ref}`);
  console.log(`  client submit: http://localhost:5173/submit/${admin.ref}`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
