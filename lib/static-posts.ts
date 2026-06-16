import type { PostMeta } from './blog'

// The 6 hand-written launch articles (metadata). Full bodies live in
// app/blog/[slug]/page.tsx (the `articles` map). This shared meta list powers
// the blog grid, prev/next nav, the homepage preview and the sitemap.
export const STATIC_META: PostMeta[] = [
  { slug: 'ultimate-maasai-mara-guide', title: 'The Ultimate Maasai Mara Safari Guide 2025', cat: 'Safari Tips', date: '15 Jan 2025', read: '8 min', img: '/images/safaris.jpg', excerpt: 'Everything you need to know about visiting the Maasai Mara — best time, camps, game drives and what the Great Migration really looks like up close.' },
  { slug: 'budget-kenya-safari', title: 'How to Do a Kenya Safari on a Budget', cat: 'Budget Travel', date: '22 Feb 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&fit=crop', excerpt: 'You do not need to spend a fortune to see the Big Five. Our honest breakdown of budget safari options and affordable camps.' },
  { slug: 'dubai-layover-guide', title: 'Making the Most of a Dubai Layover', cat: 'International', date: '10 Mar 2025', read: '5 min', img: '/images/international.jpg', excerpt: 'Got 12–48 hours in Dubai between flights? The best spots, food, and how to book a same-day tour without stress.' },
  { slug: 'kenya-car-hire-tips', title: '5 Things to Know Before Hiring a Car in Kenya', cat: 'Car Hire', date: '2 Apr 2025', read: '4 min', img: '/images/car-hire.jpg', excerpt: 'From road conditions to insurance — our practical guide to self-drive car hire in Kenya.' },
  { slug: 'amboseli-kilimanjaro-views', title: "Amboseli: Africa's Best Kilimanjaro Views", cat: 'Destinations', date: '18 Apr 2025', read: '7 min', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80&fit=crop', excerpt: 'Amboseli offers some of the most dramatic elephant-and-mountain scenery in Africa.' },
  { slug: 'nairobi-city-guide', title: 'Nairobi in 48 Hours: The Insider City Guide', cat: 'Destinations', date: '5 May 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1741991110666-88115e724741?w=800&q=80&fit=crop', excerpt: 'Nairobi is much more than a transit hub — the places locals actually love in the Safari Capital.' },
]
