// Sample Events Data
const eventsData = [
  {
    id: 1,
    title: "Summer Music Festival 2024",
    category: "music",
    date: "2024-07-15",
    time: "18:00",
    venue: "Central Park Amphitheater",
    organizer: "Music Events Co.",
    price: "$45",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
    description: "Join us for an unforgettable evening of live music featuring top artists from around the world.",
  },
  {
    id: 2,
    title: "Tech Innovation Conference",
    category: "business",
    date: "2024-08-22",
    time: "09:00",
    venue: "Convention Center Hall A",
    organizer: "TechForward Inc.",
    price: "$120",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    description: "Discover the latest trends in technology and network with industry leaders.",
  },
  {
    id: 3,
    title: "Gourmet Food & Wine Tasting",
    category: "food",
    date: "2024-07-28",
    time: "19:30",
    venue: "Grand Hotel Ballroom",
    organizer: "Culinary Masters",
    price: "$85",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
    description: "Experience exquisite flavors from renowned chefs paired with premium wines.",
  },
  {
    id: 4,
    title: "Marathon Championship 2024",
    category: "sports",
    date: "2024-09-10",
    time: "07:00",
    venue: "City Sports Complex",
    organizer: "Athletic Association",
    price: "$25",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
    description: "Challenge yourself in this annual marathon event with participants from around the globe.",
  },
  {
    id: 5,
    title: "Contemporary Art Exhibition",
    category: "art",
    date: "2024-08-05",
    time: "10:00",
    venue: "Modern Art Gallery",
    organizer: "Art Collective",
    price: "$15",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    description: "Explore cutting-edge contemporary artworks from emerging and established artists.",
  },
  {
    id: 6,
    title: "Jazz Night Under the Stars",
    category: "music",
    date: "2024-08-18",
    time: "20:00",
    venue: "Riverside Park Pavilion",
    organizer: "Jazz Society",
    price: "$35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
    description: "Enjoy smooth jazz melodies in a beautiful outdoor setting under the starlit sky.",
  },
]

// DOM Elements
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const featuredEventsContainer = document.getElementById("featured-events")
const eventsGrid = document.getElementById("events-grid")
const eventSearch = document.getElementById("event-search")
const filterButtons = document.querySelectorAll(".filter-btn")
const contactForm = document.getElementById("contact-form")

// Navigation Toggle
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
}

// Format Date
function formatDate(dateString) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Format Time
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

// Create Event Card
function createEventCard(event, index = 0) {
  return `
    <div class="event-card fade-in-up" style="animation-delay: ${index * 0.1}s" onclick="viewEventDetails(${event.id})">
      <img src="${event.image}" alt="${event.title}" class="event-image">
      <div class="event-content">
        <span class="event-category">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
        <h3 class="event-title">${event.title}</h3>
        <div class="event-details">
          <div class="event-detail">
            <i class="fas fa-calendar"></i>
            <span>${formatDate(event.date)}</span>
          </div>
          <div class="event-detail">
            <i class="fas fa-clock"></i>
            <span>${formatTime(event.time)}</span>
          </div>
          <div class="event-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span>${event.venue}</span>
          </div>
          <div class="event-detail">
            <i class="fas fa-user"></i>
            <span>${event.organizer}</span>
          </div>
        </div>
        <div class="event-price">${event.price}</div>
      </div>
    </div>
  `
}

// Load Featured Events (Homepage)
function loadFeaturedEvents() {
  if (featuredEventsContainer) {
    const featuredEvents = eventsData.slice(0, 3)
    featuredEventsContainer.innerHTML = featuredEvents.map((event, index) => createEventCard(event, index)).join("")
  }
}

// Load All Events (Events Page)
function loadAllEvents(events = eventsData) {
  if (eventsGrid) {
    eventsGrid.innerHTML = events.map((event, index) => createEventCard(event, index)).join("")
  }
}

// Filter Events
function filterEvents() {
  const searchTerm = eventSearch ? eventSearch.value.toLowerCase() : ""
  const activeCategory = document.querySelector(".filter-btn.active")?.dataset.category || "all"

  let filteredEvents = eventsData

  // Filter by category
  if (activeCategory !== "all") {
    filteredEvents = filteredEvents.filter((event) => event.category === activeCategory)
  }

  // Filter by search term
  if (searchTerm) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.venue.toLowerCase().includes(searchTerm) ||
        event.organizer.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm),
    )
  }

  loadAllEvents(filteredEvents)
}

// Event Search
if (eventSearch) {
  eventSearch.addEventListener("input", filterEvents)
}

// Category Filters
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")
    // Filter events
    filterEvents()
  })
})

// View Event Details (Placeholder)
function viewEventDetails(eventId) {
  const event = eventsData.find((e) => e.id === eventId)
  if (event) {
    // Create a simple modal or redirect to event detail page
    alert(
      `Event Details:\n\nTitle: ${event.title}\nDate: ${formatDate(event.date)}\nTime: ${formatTime(event.time)}\nVenue: ${event.venue}\nPrice: ${event.price}\n\nDescription: ${event.description}\n\nClick OK to continue.`,
    )
  }
}

// Contact Form
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    // Add loading state
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true
    submitBtn.style.opacity = "0.7"

    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message with better styling
    showNotification(
      `Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email} soon.`,
      "success",
    )

    // Reset form and button
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.style.opacity = "1"
  })
}

// Enhanced notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: ${type === "success" ? "var(--accent)" : "var(--primary)"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(16px);
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 400px;
  `

  notification.querySelector(".notification-content").style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `

  notification.querySelector(".notification-close").style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.25rem;
    margin-left: auto;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => notification.remove(), 300)
  }, 5000)
}

// Hero Search (Homepage)
const heroSearchInput = document.querySelector(".hero-search .search-input")
const heroSearchBtn = document.querySelector(".hero-search .search-btn")

if (heroSearchBtn) {
  heroSearchBtn.addEventListener("click", () => {
    const searchTerm = heroSearchInput.value.trim()
    if (searchTerm) {
      // Redirect to events page with search term
      window.location.href = `events.html?search=${encodeURIComponent(searchTerm)}`
    } else {
      window.location.href = "events.html"
    }
  })
}

if (heroSearchInput) {
  heroSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      heroSearchBtn.click()
    }
  })
}

// Handle URL search parameter
function handleURLSearch() {
  const urlParams = new URLSearchParams(window.location.search)
  const searchTerm = urlParams.get("search")

  if (searchTerm && eventSearch) {
    eventSearch.value = searchTerm
    filterEvents()
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar with enhanced transitions
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "0 4px 32px rgba(0, 0, 0, 0.12)"
    } else {
      navbar.classList.remove("scrolled")
      navbar.style.background = "rgba(255, 255, 255, 0.9)"
      navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08)"
    }
  }
})

// Initialize page with enhanced animations
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedEvents()
  loadAllEvents()
  handleURLSearch()

  // Enhanced intersection observer for better performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation with delay
  setTimeout(() => {
    document.querySelectorAll(".event-card, .glass-card, .hero-content").forEach((el) => {
      observer.observe(el)
    })
  }, 100)

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      hero.style.transform = `translateY(${parallax}px)`
    })
  }

  // Add smooth hover effects to buttons
  document.querySelectorAll(".btn, .filter-btn, .nav-link").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Enhanced search input interactions
  const searchInputs = document.querySelectorAll(".search-input")
  searchInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)"
      this.parentElement.style.boxShadow = "0 8px 32px rgba(99, 102, 241, 0.2)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)"
      this.parentElement.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)"
    })
  })

  // Loading skeleton for events
  showLoadingSkeleton()
})

function showLoadingSkeleton() {
  if (eventsGrid) {
    const skeletonHTML = Array(6)
      .fill()
      .map(
        () => `
      <div class="event-card skeleton">
        <div class="skeleton-image"></div>
        <div class="event-content">
          <div class="skeleton-text skeleton-category"></div>
          <div class="skeleton-text skeleton-title"></div>
          <div class="skeleton-text skeleton-detail"></div>
          <div class="skeleton-text skeleton-detail"></div>
          <div class="skeleton-text skeleton-price"></div>
        </div>
      </div>
    `,
      )
      .join("")

    eventsGrid.innerHTML = skeletonHTML

    // Add skeleton styles
    const skeletonStyles = `
      .skeleton {
        animation: pulse 1.5s ease-in-out infinite;
      }
      .skeleton-image {
        width: 100%;
        height: 200px;
        background: #e2e8f0;
        border-radius: 4px;
      }
      .skeleton-text {
        height: 16px;
        background: #e2e8f0;
        border-radius: 4px;
        margin-bottom: 8px;
      }
      .skeleton-category { width: 60%; }
      .skeleton-title { width: 80%; height: 20px; }
      .skeleton-detail { width: 70%; }
      .skeleton-price { width: 40%; }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `

    if (!document.querySelector("#skeleton-styles")) {
      const styleSheet = document.createElement("style")
      styleSheet.id = "skeleton-styles"
      styleSheet.textContent = skeletonStyles
      document.head.appendChild(styleSheet)
    }
  }
}
