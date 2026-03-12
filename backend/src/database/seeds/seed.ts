import { db } from '../data-source';

async function seed() {
  console.warn('Seeding database...');
  // Add seed logic here
  console.warn('Seeding complete.');
  process.exit(0);
}

seed().catch(console.error);
