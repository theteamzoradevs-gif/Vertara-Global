import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/CaseStudy";
import { seedTestimonials } from "@/data/seed-content";
import {
  TestimonialsManager,
  TestimonialItemData,
} from "@/components/admin/TestimonialsManager";

export const metadata = {
  title: "Testimonials Management | Veratara Global Admin",
};

export default async function AdminTestimonialsPage() {
  const conn = await connectDB();
  let testimonials: TestimonialItemData[] = [];

  if (conn) {
    try {
      const docs = await Testimonial.find().lean();
      if (docs.length > 0) {
        testimonials = JSON.parse(JSON.stringify(docs));
      } else {
        testimonials = seedTestimonials.map((s, idx) => ({
          _id: `seed-${idx}`,
          ...s,
        }));
      }
    } catch {
      testimonials = seedTestimonials.map((s, idx) => ({
        _id: `seed-${idx}`,
        ...s,
      }));
    }
  } else {
    testimonials = seedTestimonials.map((s, idx) => ({
      _id: `seed-${idx}`,
      ...s,
    }));
  }

  return (
    <TestimonialsManager
      initialTestimonials={testimonials}
      isDbConnected={!!conn}
    />
  );
}
