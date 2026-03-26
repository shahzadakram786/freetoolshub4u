import { Router, type IRouter } from "express";
import { GetBlogPostsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

const BLOG_POSTS = [
  {
    slug: "how-to-remove-background-from-image-free",
    title: "How to Remove Background from Image for Free Online",
    excerpt: "Learn how to remove image backgrounds instantly using AI-powered tools without installing any software. Perfect for product photos, profile pictures, and more.",
    category: "Image Tools",
    author: "ToolsHub Team",
    publishedAt: "2026-03-20",
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    tags: ["background remover", "image editing", "AI tools", "free tools"],
    content: `<h2>Why Remove Image Backgrounds?</h2>
<p>Removing the background from an image is one of the most common tasks in photo editing. Whether you're creating product listings for your ecommerce store, making professional profile pictures, or designing marketing materials, a clean transparent background can make your images look polished and professional.</p>
<h2>Traditional vs AI-Powered Background Removal</h2>
<p>In the past, removing a background required expensive software like Photoshop and hours of meticulous work with the pen tool. Today, AI-powered tools can accomplish the same task in seconds with remarkable accuracy.</p>
<p>Our Background Remover tool uses advanced machine learning algorithms that can detect complex edges — including hair strands, fur, and transparent objects — with professional-grade precision.</p>
<h2>Step-by-Step: How to Remove a Background</h2>
<ol>
<li>Navigate to our <strong>Background Remover</strong> tool</li>
<li>Upload your image (JPG, PNG, or WebP)</li>
<li>Wait 2-5 seconds while our AI processes it</li>
<li>Download the result as a transparent PNG</li>
</ol>
<h2>Tips for Best Results</h2>
<ul>
<li>Use high-resolution images for sharper edges</li>
<li>Ensure good contrast between subject and background</li>
<li>For complex hair or fur, try the Object Eraser for manual touch-ups</li>
<li>PNG format preserves transparency, always download as PNG</li>
</ul>
<h2>Use Cases</h2>
<p><strong>E-commerce:</strong> Clean product photos dramatically increase conversion rates. Studies show products with white/transparent backgrounds sell up to 40% better.</p>
<p><strong>Social Media:</strong> Create eye-catching profile pictures and post graphics with custom backgrounds.</p>
<p><strong>Professional Headshots:</strong> Replace messy office backgrounds with a clean, professional look.</p>`
  },
  {
    slug: "best-free-currency-converter-2026",
    title: "The Best Free Currency Converter Tools in 2026",
    excerpt: "Compare the top free currency converters available online. Find out which tools offer the most accurate real-time exchange rates and the most comprehensive currency coverage.",
    category: "Currency",
    author: "ToolsHub Team",
    publishedAt: "2026-03-18",
    readTime: 7,
    coverImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800",
    tags: ["currency converter", "exchange rates", "forex", "finance tools"],
    content: `<h2>Why You Need a Reliable Currency Converter</h2>
<p>Whether you're traveling internationally, running an import/export business, or simply sending money abroad, having access to accurate, real-time exchange rates is essential. A small difference in rates can mean big savings when you're converting large amounts.</p>
<h2>What Makes a Good Currency Converter?</h2>
<p>Not all currency converters are equal. Here's what to look for:</p>
<ul>
<li><strong>Real-time rates:</strong> Exchange rates change by the minute. Tools that use live API data are far more accurate than those with daily updates.</li>
<li><strong>Wide currency coverage:</strong> The more currencies supported, the better — especially for exotic currencies like PKR, BDT, or AFN.</li>
<li><strong>Clean interface:</strong> Easy to use with minimal ads and distractions.</li>
<li><strong>Full country names:</strong> Showing "Pakistan (PKR)" is much more helpful than just "PKR".</li>
</ul>
<h2>ToolsHub Currency Converter Features</h2>
<p>Our currency converter stands out with support for 60+ currencies with full country names, real-time exchange rates that auto-refresh, and a clean, mobile-friendly interface with no popups or intrusive ads.</p>
<h2>Understanding Exchange Rates</h2>
<p>The exchange rate is the price of one currency in terms of another. Rates fluctuate based on market forces including interest rates, inflation, political stability, and economic performance.</p>
<p>Always check the current rate before making a transaction, as rates can change significantly within a single day during volatile market conditions.</p>`
  },
  {
    slug: "how-to-check-ai-generated-content",
    title: "How to Detect AI-Generated Content: A Complete Guide",
    excerpt: "With the rise of ChatGPT and other AI writing tools, detecting AI-generated text has become increasingly important for educators, publishers, and content creators.",
    category: "AI Tools",
    author: "ToolsHub Team",
    publishedAt: "2026-03-15",
    readTime: 6,
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    tags: ["AI detector", "ChatGPT", "plagiarism", "content detection", "zerogpt"],
    content: `<h2>The Rise of AI-Generated Content</h2>
<p>Since the release of ChatGPT in late 2022, AI-generated text has flooded the internet. From blog posts and academic papers to product descriptions and news articles, it's becoming harder to distinguish human-written content from machine-generated text.</p>
<h2>Why Detecting AI Content Matters</h2>
<p><strong>For educators:</strong> Academic integrity is at stake. Many students are using AI to write essays and assignments.</p>
<p><strong>For publishers:</strong> Content quality and authenticity matter to readers and affect SEO rankings.</p>
<p><strong>For HR teams:</strong> Detecting AI-written job applications and cover letters.</p>
<h2>How AI Detectors Work</h2>
<p>AI content detectors analyze several patterns that are characteristic of machine-generated text:</p>
<ul>
<li><strong>Perplexity:</strong> AI text tends to be predictable, using common word combinations</li>
<li><strong>Burstiness:</strong> Human writing varies more in sentence length and complexity</li>
<li><strong>Vocabulary patterns:</strong> AI tends to use certain phrases ("Furthermore," "In conclusion," "It is worth noting")</li>
<li><strong>Sentence structure:</strong> AI often produces grammatically perfect but formulaic sentences</li>
</ul>
<h2>Limitations of AI Detection</h2>
<p>No detector is 100% accurate. False positives can occur with highly formal human writing, and false negatives happen when AI text is edited by humans. Always use detection as one signal among many, not as definitive proof.</p>
<h2>Try Our Free AI Detector</h2>
<p>Our AI Content Detector tool analyzes text for these patterns and gives you a percentage score showing how likely the content is AI-generated. It's free, requires no signup, and processes results instantly.</p>`
  },
  {
    slug: "free-plagiarism-checker-vs-paid-tools",
    title: "Free vs Paid Plagiarism Checkers: Which Should You Use?",
    excerpt: "Not sure whether to use a free or paid plagiarism checker? We break down the differences and help you choose the right tool for your needs.",
    category: "Writing Tools",
    author: "ToolsHub Team",
    publishedAt: "2026-03-12",
    readTime: 8,
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    tags: ["plagiarism checker", "content originality", "copywriting", "writing tools"],
    content: `<h2>What is Plagiarism?</h2>
<p>Plagiarism is the act of using someone else's work — whether text, ideas, images, or data — without proper attribution. In academic settings, it can lead to serious consequences including expulsion. In professional contexts, it can result in legal action and reputational damage.</p>
<h2>Free Plagiarism Checkers</h2>
<p>Free tools are great for:</p>
<ul>
<li>Quick spot-checks of short content pieces</li>
<li>Students who need occasional checks</li>
<li>Bloggers and content creators checking their own work</li>
<li>General web plagiarism detection</li>
</ul>
<h2>Paid Plagiarism Checkers (Turnitin, Copyscape, etc.)</h2>
<p>Paid tools are worth it when:</p>
<ul>
<li>You need to check against academic papers and journals</li>
<li>You're a professional content agency checking large volumes</li>
<li>You need detailed reports with source citations</li>
<li>You require an institutional or API-based solution</li>
</ul>
<h2>Our Recommendation</h2>
<p>For most individual users — bloggers, students, freelancers — our free plagiarism checker provides sufficient functionality. It analyzes text for common phrases and patterns that suggest copied content, gives you a unique percentage score, and highlights potentially problematic sections.</p>
<p>For academic institutions or large-scale content operations, a paid service with access to academic databases may be more appropriate.</p>`
  },
  {
    slug: "how-to-calculate-bmi-correctly",
    title: "How to Calculate BMI Correctly: Metric and Imperial Guide",
    excerpt: "Learn how to calculate your Body Mass Index accurately using both metric (kg/cm) and imperial (lbs/ft/inches) units, and understand what your result means for your health.",
    category: "Health Tools",
    author: "ToolsHub Team",
    publishedAt: "2026-03-10",
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    tags: ["BMI calculator", "body mass index", "health", "weight"],
    content: `<h2>What is BMI?</h2>
<p>Body Mass Index (BMI) is a numerical value calculated from your weight and height. It's a widely used screening tool to identify weight categories that may indicate health risks.</p>
<h2>BMI Formula</h2>
<p><strong>Metric:</strong> BMI = weight(kg) / height(m)²</p>
<p><strong>Imperial:</strong> BMI = 703 × weight(lbs) / height(inches)²</p>
<h2>BMI Categories (WHO)</h2>
<table>
<tr><th>BMI Range</th><th>Category</th></tr>
<tr><td>Below 18.5</td><td>Underweight</td></tr>
<tr><td>18.5 – 24.9</td><td>Normal weight</td></tr>
<tr><td>25.0 – 29.9</td><td>Overweight</td></tr>
<tr><td>30.0 and above</td><td>Obese</td></tr>
</table>
<h2>Important Limitations</h2>
<p>BMI doesn't account for muscle mass, bone density, age, or fat distribution. Athletes often have high BMIs due to muscle, not fat. Always consult a healthcare professional for a complete health assessment.</p>
<h2>Imperial Calculation Example</h2>
<p>A person who is 5 feet 10 inches (70 inches) and weighs 175 lbs:</p>
<p>BMI = 703 × 175 / 70² = 703 × 175 / 4900 = 25.1 (Overweight)</p>`
  },
  {
    slug: "how-to-download-youtube-thumbnails",
    title: "How to Download YouTube Thumbnails in HD Quality",
    excerpt: "Complete guide on how to download high-quality YouTube video thumbnails for free. Useful for content creators, thumbnail designers, and marketers.",
    category: "YouTube Tools",
    author: "ToolsHub Team",
    publishedAt: "2026-03-08",
    readTime: 4,
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    tags: ["YouTube", "thumbnail downloader", "video tools", "content creation"],
    content: `<h2>Why Download YouTube Thumbnails?</h2>
<p>YouTube thumbnails are the first thing viewers see before deciding to click on a video. High-quality thumbnails are crucial for content creators who want to analyze successful channels, get design inspiration, or repurpose thumbnails for their own content.</p>
<h2>YouTube Thumbnail Sizes</h2>
<p>YouTube generates several thumbnail sizes automatically:</p>
<ul>
<li><strong>maxresdefault.jpg</strong> — 1280×720 (HD, not always available)</li>
<li><strong>hqdefault.jpg</strong> — 480×360 (always available)</li>
<li><strong>mqdefault.jpg</strong> — 320×180</li>
<li><strong>sddefault.jpg</strong> — 640×480</li>
</ul>
<h2>How to Use Our YouTube Thumbnail Downloader</h2>
<ol>
<li>Copy the YouTube video URL from your browser or the share button</li>
<li>Paste it into our YouTube Thumbnail Downloader tool</li>
<li>The tool extracts the video ID and generates all available thumbnail sizes</li>
<li>Click the quality you want and save the image</li>
</ol>
<h2>Is It Legal?</h2>
<p>Downloading thumbnails for personal use, reference, or analysis is generally acceptable. However, using them commercially or representing them as your own work may violate YouTube's terms of service and copyright law. Always use downloaded content responsibly.</p>`
  },
];

router.get("/blog/posts", (req, res) => {
  const query = GetBlogPostsQueryParams.safeParse(req.query);
  const page = query.success && query.data.page ? query.data.page : 1;
  const limit = query.success && query.data.limit ? query.data.limit : 9;
  const category = query.success ? query.data.category : undefined;

  let filtered = BLOG_POSTS;
  if (category) {
    filtered = BLOG_POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  const totalPages = Math.ceil(filtered.length / limit);

  res.json({
    posts: paginated.map(({ content: _c, ...rest }) => rest),
    total: filtered.length,
    page,
    totalPages,
  });
});

router.get("/blog/posts/:slug", (req, res) => {
  const { slug } = req.params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

export default router;
