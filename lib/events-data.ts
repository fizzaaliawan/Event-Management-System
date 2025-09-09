export interface Event {
  id: string
  name: string
  date: string
  time: string
  venue: string
  description: string
  fullDescription: string
  image: string
  category: string
  price?: string
  organizer: string
  mapEmbedUrl: string
}

export const eventsData: Event[] = [
  {
    id: "1",
    name: "TechFest 2025",
    date: "15th September 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "San Francisco Convention Center",
    description: "Annual technology festival featuring startups, AI talks, and networking.",
    fullDescription:
      "Join us for the most anticipated technology festival of the year! TechFest 2025 brings together industry leaders, innovative startups, and tech enthusiasts for a day of inspiring talks, hands-on workshops, and unparalleled networking opportunities. Discover the latest in AI, blockchain, IoT, and emerging technologies that are shaping our future.",
    image: "/tech-fest.jpeg",
    category: "Technology",
    price: "$299",
    organizer: "Tech Innovation Hub",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    id: "2",
    name: "Music Vibes Night",
    date: "25th September 2025",
    time: "7:00 PM - 11:00 PM",
    venue: "Madison Square Garden, New York",
    description: "A live concert night with global artists and DJs.",
    fullDescription:
      "Experience an unforgettable night of music at Madison Square Garden! Music Vibes Night features performances by world-renowned artists and top DJs, creating an electric atmosphere that will keep you dancing all night long. From pop hits to electronic beats, this concert promises something for every music lover.",
    image: "/colorful-concert-stage.png",
    category: "Music",
    price: "$150",
    organizer: "Live Music Productions",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412!2d-73.9934!3d40.7505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAxLjgiTiA3M8KwNTknMzYuMiJX!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    id: "3",
    name: "Digital Marketing Summit",
    date: "5th October 2025",
    time: "10:00 AM - 5:00 PM",
    venue: "Los Angeles Convention Center",
    description: "Learn the latest digital marketing strategies from industry experts.",
    fullDescription:
      "Stay ahead of the digital marketing curve at this comprehensive summit. Industry leaders will share cutting-edge strategies, case studies, and tools that are driving success in today's digital landscape. Perfect for marketers, entrepreneurs, and business owners looking to amplify their online presence.",
    image: "/business-conference-with-presentation-screens-and-.jpg",
    category: "Business",
    price: "$199",
    organizer: "Marketing Professionals Association",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7412!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA3LjkiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    id: "4",
    name: "Art & Culture Festival",
    date: "12th October 2025",
    time: "11:00 AM - 8:00 PM",
    venue: "Central Park, New York",
    description: "Celebrate creativity with local artists, live performances, and workshops.",
    fullDescription:
      "Immerse yourself in a celebration of creativity and culture! This festival showcases the work of talented local artists, features live performances across multiple stages, and offers hands-on workshops for all ages. From painting and sculpture to music and dance, discover the vibrant arts community in your city.",
    image: "/outdoor-art-festival-with-colorful-tents-and-peopl.jpg",
    category: "Arts & Culture",
    price: "Free",
    organizer: "City Arts Council",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.4412!2d-73.9654!3d40.7829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzU4LjQiTiA3M8KwNTcnNTUuNCJX!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    id: "5",
    name: "Startup Pitch Competition",
    date: "20th October 2025",
    time: "2:00 PM - 7:00 PM",
    venue: "Silicon Valley Innovation Hub",
    description: "Watch emerging startups pitch their ideas to top investors.",
    fullDescription:
      "Witness the future of innovation at this exciting startup pitch competition! Emerging entrepreneurs will present their groundbreaking ideas to a panel of top investors and industry experts. Network with founders, investors, and fellow entrepreneurs while discovering the next big thing in technology and business.",
    image: "/startup-pitch-presentation-with-entrepreneur-on-st.jpg",
    category: "Business",
    price: "$75",
    organizer: "Startup Accelerator Network",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.1412!2d-122.0822!3d37.3861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIzJzEwLjAiTiAxMjLCsDA0JzU1LjkiVw!5e0!3m2!1sen!2sus!4v1234567890",
  },
  {
    id: "6",
    name: "Food & Wine Festival",
    date: "28th October 2025",
    time: "12:00 PM - 9:00 PM",
    venue: "Napa Valley Fairgrounds",
    description: "Taste exquisite cuisine and wines from renowned chefs and vintners.",
    fullDescription:
      "Indulge in a culinary adventure featuring the finest cuisine and wines from renowned chefs and vintners. This festival offers tastings, cooking demonstrations, wine pairings, and the opportunity to meet the culinary artists behind your favorite dishes. A perfect event for food enthusiasts and wine connoisseurs.",
    image: "/outdoor-food-festival-with-wine-tasting-and-gourme.jpg",
    category: "Food & Drink",
    price: "$125",
    organizer: "Culinary Arts Society",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.1412!2d-122.2869!3d38.2975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDE3JzUxLjAiTiAxMjLCsDE3JzEyLjgiVw!5e0!3m2!1sen!2sus!4v1234567890",
  },
]
