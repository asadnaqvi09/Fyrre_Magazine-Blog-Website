import cron from 'node-cron';
import Blogs from '../models/blogs.model.js';
import SendEmail from '../utilis/sendEmail.js';

export const startRejectedBlogCleaner = () => {
  cron.schedule('0 * * * *', async () => { // har ghante run karega
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const blogsToDelete = await Blogs.find({
      blogStatus: 'rejected',
      rejectedAt: { $lte: oneDayAgo }
    }).populate('blogAuthor', 'email userName');
    for (const blog of blogsToDelete) {
      await SendEmail({
        to: blog.blogAuthor.email,
        subject: 'Blog Deleted Automatically',
        html: `<p>Your rejected blog <b>${blog.blogTitle}</b> was deleted automatically as no edits were made within 24 hours.</p>`
      });
      await blog.deleteOne();
    }
    if (blogsToDelete.length > 0) {
      console.log(`${blogsToDelete.length} rejected blogs auto-deleted`);
    }
  }, {
    timezone: 'Asia/Karachi'
  });
};
