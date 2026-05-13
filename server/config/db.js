const mongoose = require('mongoose');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Connect to MongoDB with retries.
 * - Development: keeps retrying so Express does not exit when Atlas IP / network is wrong.
 * - Production: exits after maxAttempts so the host can restart a broken deploy.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is missing in .env');
    process.exit(1);
  }

  const isProd = process.env.NODE_ENV === 'production';
  const maxAttemptsProd = 25;
  let attempt = 0;

  while (true) {
    try {
      if (mongoose.connection.readyState === 1) {
        return;
      }
      attempt += 1;
      const conn = await mongoose.connect(uri);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`❌ MongoDB (attempt ${attempt}): ${error.message}`);
      if (isProd && attempt >= maxAttemptsProd) {
        console.error('Giving up after max retries. Check MONGO_URI and Atlas Network Access.');
        process.exit(1);
      }
      const delayMs = Math.min(15000, 2000 * Math.min(attempt, 5));
      if (isProd) {
        console.log(`⏳ Retrying in ${delayMs / 1000}s (${attempt}/${maxAttemptsProd})…`);
      } else {
        console.log(
          `⏳ Retrying in ${delayMs / 1000}s… API stays up; fix Atlas → Network Access (your IP) or MONGO_URI.`
        );
      }
      await sleep(delayMs);
    }
  }
};

module.exports = connectDB;
