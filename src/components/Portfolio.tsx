import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { OptimizedImage } from "./OptimizedImage";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  github?: string;
  technologies: string[];
  results?: string;
}

// Hardcoded portfolio data
const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "THE ASCENT — Modern Gym Platform",
    description:
      "A modern online gym platform offering real-time class capacity, equipment availability, booking and membership management, contactless check-in, and integrated payments.",
    category: "Web Development / Fitness",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600&auto=format&fit=crop",
    link: "https://vine-cloudy-85132416.figma.site/",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "Stripe",
    ],
    results:
      "35% increase in membership conversions; 40% reduction in class no-shows",
  },

  {
    id: "2",
    title: "Bliss Cafe — Bandar",
    description:
      "A custom cafe management dashboard for Bliss Cafe (Bandra) providing POS, table reservations, mobile order-ahead, inventory & supplier management, staff scheduling, and real-time sales + footfall analytics.",
    category: "Custom Software / Hospitality",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&auto=format&fit=crop",
    link: "https://thank-actor-22218288.figma.site/",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
    ],
    results:
      "60% faster order processing; 25% increase in table turnover; 18% uplift in average order value",
  },
  {
    id: "3",
    title: "TravelHub — Travel Agency Website",
    description:
      "A modern, static travel agency website showcasing tour packages, destination galleries, customer testimonials, and an inquiry system optimized for SEO and fast loading.",
    category: "Web Development / Static Website",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop",
    link: "https://dijon-turtle-11155364.figma.site/",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "GSAP Animations",
    ],
    results:
      "42% increase in travel inquiries within the first month",
  },
];

export function Portfolio() {
  const [filter, setFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] =
    useState<PortfolioItem[]>(portfolioData);

  const categories = [
    "All",
    "Web Development",
    "Custom Software",
    "Mobile App",
  ];

  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(portfolioData);
    } else {
      setFilteredProjects(
        portfolioData.filter(
          (item) => item.category === filter,
        ),
      );
    }
  }, [filter]);

  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-slate-900 mb-4 sm:mb-6">
            Real Results for Real Businesses
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg sm:text-xl">
            Explore our portfolio of successful projects
            delivered across industries
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === category
                  ? "bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0066FF] transition-all duration-500 hover:shadow-2xl hover:shadow-[#0066FF]/10">
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[#0066FF] rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Overlay with Links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-[#0066FF] rounded-full hover:scale-110 transition-transform"
                      aria-label="View project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-slate-900 mb-2 group-hover:text-[#0066FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  {project.results && (
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-[#0066FF] flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        <span>{project.results}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-600 text-xl">
              No projects found in this category
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-slate-600 text-lg mb-6">
            Ready to see your project here?
          </p>
          <button
            onClick={() => {
              const contact =
                document.getElementById("contact");
              if (contact) {
                contact.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066FF] text-white rounded-full hover:bg-[#0052CC] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#0066FF]/25 group"
          >
            <span className="text-lg">Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}