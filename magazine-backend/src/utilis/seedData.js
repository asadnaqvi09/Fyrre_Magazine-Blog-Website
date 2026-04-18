import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import Blog from '../models/blogs.model.js';
import Category from '../models/category.model.js';
import Tag from '../models/tags.model.js'; 

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // 1. Cleanup
    await Blog.deleteMany();
    console.log('--- Database Blogs Cleared ---');
    // 2. Requirements Check
    const admin = await User.findOne({ role: 'Admin' });
    const categories = await Category.find();
    const tags = await Tag.find();
    if (!admin) throw new Error("Admin not found! Please register/login first.");
    if (categories.length === 0) throw new Error("No categories found! Create them via Postman first.");
    if (tags.length === 0) throw new Error("No tags found! Create them via Postman first.")
    console.log(`Seeding for Admin: ${admin.userName}`);
    console.log(`Distributing across ${categories.length} categories...`);
    console.log(`Distributing across ${tags.length} tags...`);
    const tagIds = tags.map(t => t._id);
    // 3. 15 Blogs Generation Logic
    const dummyBlogs = [];
    for (let i = 1; i <= 15; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      dummyBlogs.push({
        blogTitle: `The Future of ${randomCategory.categoryName}: Part ${i}`,
        blogSlug: `future-of-${randomCategory.categoryName.toLowerCase()}-${i}-${Math.floor(Math.random() * 1000)}`,
        blogContent: `<h1>Modern Insights</h1><p>This is a detailed exploration of ${randomCategory.name}. As we move further into 2026, the trends in this field are evolving rapidly.</p>`,
        blogExcerpt: `Stay ahead of the curve with our latest deep dive into ${randomCategory.name} trends and professional tips.`,
        blogAuthor: admin._id,
        blogCategory: randomCategory._id,
        blogStatus: 'published',
        blogViews: Math.floor(Math.random() * 1000), // Real testing ke liye views
        blogCoverImage: {
          url: `https://picsum.photos/seed/${randomCategory.name}${i}/1200/800`,
          public_id: `seed_img_${i}`
        },
        blogTags: tagIds,
        publishedAt: new Date()
      });
    }
    await Blog.insertMany(dummyBlogs);
    console.log('✅ 15 Blogs Seeded Successfully with Category Mapping!');
    process.exit();
    
  } catch (error) {
    console.error('❌ Seeding Failed:', error.message);
    process.exit(1);
  }
};

seedData();