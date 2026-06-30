import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Baby from '../models/Baby';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const updateDisplayIds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected');

    const babies = await Baby.find({});
    let updatedCount = 0;

    for (const baby of babies) {
      if (baby.displayId) {
        const oldId = baby.displayId;
        const newId = oldId.replace(/(-[MF])(\d+W)/, '$1-$2');
        
        if (oldId !== newId) {
          baby.displayId = newId;
          await baby.save();
          console.log(`Updated: ${oldId} -> ${newId}`);
          updatedCount++;
        }
      }
    }

    console.log(`Update complete. ${updatedCount} babies updated.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateDisplayIds();
