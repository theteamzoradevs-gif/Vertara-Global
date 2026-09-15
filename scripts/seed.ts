import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { SiteSettings } from "../src/models/SiteSettings";
import { Service } from "../src/models/Service";
import { EngagementModel } from "../src/models/EngagementModel";
import { Insight } from "../src/models/Insight";
import {
  CaseStudy,
  Testimonial,
  ClientLogo,
} from "../src/models/CaseStudy";
import { Faq } from "../src/models/Faq";
import { AdminUser } from "../src/models/AdminUser";
import {
  seedSettings,
  seedServices,
  seedEngagementModels,
  seedInsights,
  seedCaseStudies,
  seedTestimonials,
  seedClientLogos,
  seedFaqs,
} from "../src/data/seed-content";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Promise.all([
    SiteSettings.deleteMany({}),
    Service.deleteMany({}),
    EngagementModel.deleteMany({}),
    Insight.deleteMany({}),
    CaseStudy.deleteMany({}),
    Testimonial.deleteMany({}),
    ClientLogo.deleteMany({}),
    Faq.deleteMany({}),
  ]);

  await SiteSettings.create(seedSettings);
  await Service.insertMany(seedServices);
  await EngagementModel.insertMany(seedEngagementModels);
  await Insight.insertMany(
    seedInsights.map((i) => ({ ...i, publishedAt: new Date() })),
  );
  await CaseStudy.insertMany(seedCaseStudies);
  await Testimonial.insertMany(seedTestimonials);
  await ClientLogo.insertMany(seedClientLogos);
  await Faq.insertMany(seedFaqs);

  const email = (process.env.ADMIN_EMAIL || "admin@gccadvisor.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);
  await AdminUser.findOneAndUpdate(
    { email },
    { email, passwordHash, name: "Admin" },
    { upsert: true },
  );

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / ${password}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
