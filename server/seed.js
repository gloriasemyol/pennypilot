import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Transaction from "./models/Transaction.js";

// Force Node.js to use public DNS resolvers to bypass MongoDB SRV lookup issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.log("Usage: node seed.js your@email.com");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const user = await User.findOne({ email: email.toLowerCase() });
if (!user) {
  console.log("❌ No user with that email. Register in the app first.");
  process.exit(1);
}

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const expenseCats = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health"];
const docs = [];

for (let m = 0; m < 6; m++) {
  const base = new Date();
  base.setDate(1);
  base.setMonth(base.getMonth() - m);

  const add = (type, category, amount, day) =>
    docs.push({
      user: user._id,
      type,
      category,
      amount,
      note: "Sample",
      date: new Date(base.getFullYear(), base.getMonth(), day, 12),
    });

  add("income", "Salary", rand(45000, 60000), 1);
  add("expense", "Rent", rand(9000, 12000), 3);
  for (let i = 0; i < 8; i++) {
    add("expense", expenseCats[rand(0, expenseCats.length - 1)], rand(150, 3500), rand(4, 27));
  }
}

await Transaction.insertMany(docs);
console.log(`✅ Added ${docs.length} sample transactions for ${email}`);
process.exit(0);