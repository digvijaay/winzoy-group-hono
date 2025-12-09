// src/config/db.ts
import { connect, disconnect } from 'mongoose';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

const db = {
  connect: async () => {
    try {
      await connect(mongoUri);
      console.log('✅ MongoDB connected successfully.');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  },

  disconnect: async () => {
    try {
      await disconnect();
      console.log('🔌 MongoDB disconnected.');
    } catch (error) {
      console.error('❌ Error disconnecting MongoDB:', error);
    }
  },
};

export default db;
