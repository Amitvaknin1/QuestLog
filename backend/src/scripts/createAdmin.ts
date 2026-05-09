import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "admin@questlog.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin2302!";

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log(`Promoted existing user "${existing.username}" (${existing.email}) to admin.`);
  } else {
    await User.create({
      username: ADMIN_USERNAME,
      email:    ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role:     "admin",
    });
    console.log(`Admin created successfully!`);
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
