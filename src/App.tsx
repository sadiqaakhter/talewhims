import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingCart, Youtube, Book as BookIcon, Play, Star, Sparkles, Mail, ExternalLink, Heart, ArrowRight, User, Instagram } from "lucide-react";

type Page = "home" | "books" | "about" | "others";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@talewhims";
const AMAZON_AUTHOR_URL = "https://www.amazon.com/author/talewhims";

const amazonBookLinks: Record<string, string> = {
  "Busy Squirrel": "https://www.amazon.com/Busy-Squirrels-Adventure-Educational-Coloring/dp/B0DNJ5CW5K",
  "The Fire-Breathing Dragon": "https://www.amazon.com/Fire-Breathing-Dragon-Coloring-Book-Creatures/dp/B0DFMSLCJS",
  "The Fire-Breathing Dragon Coloring Book": "https://www.amazon.com/Fire-Breathing-Dragon-Coloring-Book-Creatures/dp/B0DFMSLCJS",
  "The Mystical Unicorn": "https://www.amazon.com/Mystical-Unicorn-Coloring-Book-Relaxation/dp/B0DFMS8BHC",
  "Kawaii Animal Adventures": "https://www.amazon.com/Adorable-Kawaii-Animals-Coloring-Book/dp/B0DGL1ZDLL",
  "Kawaii Farm Friends": "https://www.amazon.com/Kawaii-Farm-Animal-Coloring-Teens/dp/B0DJD6FNVX",
  "Cute Pizza": "https://www.amazon.com/Cute-Pizza-Slice-Coloring-Book/dp/B0DPHHG6FN",
  "Cupcakes": "https://www.amazon.com/Adorable-Cupcake-Coloring-Book-Adults/dp/B0DP9XCKJC",
  "Cute Dog": "https://www.amazon.com/Adorable-Dog-Coloring-Pages-Screen-free/dp/B0DNT24ZR9",
  "Christmas Penguin": "https://www.amazon.com/Christmas-Penguin-Coloring-Book-Kids/dp/B0DNB5NLZK",
  "Cute Transport": "https://www.amazon.com/Transport-Coloring-Book-Kids-Enthusiasts/dp/B0DNSHQB5C",
  "Cute Girl": "https://www.amazon.com/Cute-Girl-Coloring-Book-Kids/dp/B0DNF6JT4R",
  "Christmas": "https://www.amazon.com/Kawaii-Christmas-Coloring-Book-Teens/dp/B0DJF25XMC",
  "Starfish Parade": "https://www.amazon.com/Starfish-Coloring-Book-Creativity-Ocean-Themed/dp/B0DNJ4B64F",
  "The Underdog's Triumph": "https://www.amazon.com/Underdogs-Victory-Inspiring-Perseverance-determination/dp/B0DKCYBPPC",
  "Spot's Big Game": "https://www.amazon.com/Spots-Big-Game-Dalmatians-Heartwarming/dp/B0DK9GSX6Q",
  "Inspiring Legendary Baseball Stories": "https://www.amazon.com/Legendary-Baseball-Stories-Kids-Adventures-ebook/dp/B0DKFZ7V56",
  "Oliver and the Wise Oak Tree": "https://www.amazon.com/Brave-Oliver-Wise-Oak-Tree-ebook/dp/B0CW19PD8Q",
  "Ella's Big Dream": "https://www.amazon.com/Ellas-Big-Dream-Adventures-Imaginative/dp/B0DKNZ88Q2",
  "Benny the Brave Little Bunny": "https://www.amazon.com/Benny-Brave-Little-Bunny-Overcoming-ebook/dp/B0DK7R1K9Y",
  "Jamie's Speedy Dream": "https://www.amazon.com/Inspiring-Autism-Story-Speedy-Dream-ebook/dp/B0CX5H5L5T",
};

const playlistLinks = {
  originalSongs: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUaldB9VRuNHAG5yLxY_Dt-i",
  nurseryRhymes: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUaZlS5KzJOswvK2PHKXF1o6",
  chickenBanana: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUbcgKXV8mv1_kVryHSyeP8J",
  naniKiKahani: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUZDutquk-ss_DERBOx-hx--",
  coloringBooks: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUaZcfBfpb9f3lRQdPH2IJIX",
  whyAmazing: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUaljZhTdCBZFV4EPI3CJ40v",
  shorts: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUb-nmGXIbIpqtSp6azFSXrR",
  learn: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUZz6gk5B6AeqeBo-LDl3ls-",
  wisdomTales: "https://www.youtube.com/playlist?list=PLC8dnaJd9DUbYnXHToR9Qu4CPWNjSci5y",
};

const playlistEmbeds = {
  originalSongs: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUaldB9VRuNHAG5yLxY_Dt-i&rel=0",
  nurseryRhymes: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUaZlS5KzJOswvK2PHKXF1o6&rel=0",
  chickenBanana: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUbcgKXV8mv1_kVryHSyeP8J&rel=0",
  naniKiKahani: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUZDutquk-ss_DERBOx-hx--&rel=0",
  coloringBooks: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUaZcfBfpb9f3lRQdPH2IJIX&rel=0",
  whyAmazing: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUaljZhTdCBZFV4EPI3CJ40v&rel=0",
  shorts: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUb-nmGXIbIpqtSp6azFSXrR&rel=0",
  learn: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUZz6gk5B6AeqeBo-LDl3ls-&rel=0",
  wisdomTales: "https://www.youtube-nocookie.com/embed/videoseries?list=PLC8dnaJd9DUbYnXHToR9Qu4CPWNjSci5y&rel=0",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("talewhims-cookie-consent");
    if (consent) setCookieConsent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const togglePage = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleCookieAccept = () => {
    localStorage.setItem("talewhims-cookie-consent", "true");
    setCookieConsent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream selection:bg-pink selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-royal text-white shadow-xl px-6 h-20 md:h-24 flex items-center border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setCurrentPage("home")}
          >
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-gold/40 shadow-lg group-hover:scale-105 transition-transform">
              <img 
                src="logo.png" 
                alt="TaleWhims Logo" 
                className="w-full h-full object-contain bg-white p-1" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="brand-wordmark hidden sm:block">
              TaleWhims
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center justify-center">
            <button 
              onClick={() => setCurrentPage("home")}
              className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${currentPage === "home" ? "text-gold" : "text-white/60 hover:text-white"}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage("books")}
              className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${currentPage === "books" ? "text-gold" : "text-white/60 hover:text-white"}`}
            >
              Books
            </button>
            <button 
              onClick={() => setCurrentPage("about")}
              className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${currentPage === "about" ? "text-gold" : "text-white/60 hover:text-white"}`}
            >
              About Us
            </button>
            <button 
              onClick={() => setCurrentPage("others")}
              className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${currentPage === "others" ? "text-gold" : "text-white/60 hover:text-white"}`}
            >
              Others
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gold p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-20 bg-royal z-40 flex flex-col p-8 gap-6 md:hidden border-l border-white/10"
            >
              <button 
                onClick={() => togglePage("home")}
                className={`text-2xl font-display text-left py-4 border-b border-white/5 ${currentPage === "home" ? "text-gold" : "text-white/50"}`}
              >
                Home
              </button>
              <button 
                onClick={() => togglePage("books")}
                className={`text-2xl font-display text-left py-4 border-b border-white/5 ${currentPage === "books" ? "text-gold" : "text-white/50"}`}
              >
                Books
              </button>
              <button 
                onClick={() => togglePage("about")}
                className={`text-2xl font-display text-left py-4 border-b border-white/5 ${currentPage === "about" ? "text-gold" : "text-white/50"}`}
              >
                About Us
              </button>
              <button 
                onClick={() => togglePage("others")}
                className={`text-2xl font-display text-left py-4 border-b border-white/5 ${currentPage === "others" ? "text-gold" : "text-white/50"}`}
              >
                Others
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <AnimatePresence mode="wait">
          {currentPage === "home" && <HomePage key="home" onPageChange={setCurrentPage} />}
          {currentPage === "books" && <BooksPage key="books" />}
          {currentPage === "about" && <AboutPage key="about" />}
          {currentPage === "others" && <OthersPage key="others" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-pink text-white pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div 
                className="flex items-center justify-center md:justify-start gap-4 cursor-pointer group"
                onClick={() => {
                  setCurrentPage("home");
                  window.scrollTo(0, 0);
                }}
              >
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white/20 p-1 bg-white">
                  <img 
                    src="logo.png" 
                    alt="TaleWhims Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="text-3xl font-display text-white">TaleWhims</span>
              </div>
              <p className="font-bold opacity-80 uppercase tracking-widest text-sm">Little Stories. Big Wonders.</p>
              <div className="flex justify-center md:justify-start gap-6">
                <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Youtube size={28} /></a>
                <a href={AMAZON_AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><ShoppingCart size={28} /></a>
                <a href="https://www.instagram.com/talewhims/" target="_blank" className="hover:scale-110 transition-transform"><Instagram size={28} /></a>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end justify-center">
              <div className="flex flex-col gap-4 font-bold text-sm text-white/70 text-center md:text-right">
                <button onClick={() => { setCurrentPage("home"); window.scrollTo(0, 0); }} className="hover:text-white transition-colors uppercase tracking-widest">Home</button>
                <button onClick={() => { setCurrentPage("books"); window.scrollTo(0, 0); }} className="hover:text-white transition-colors uppercase tracking-widest">Books</button>
                <button onClick={() => { setCurrentPage("about"); window.scrollTo(0, 0); }} className="hover:text-white transition-colors uppercase tracking-widest">About Us</button>
                <button onClick={() => { setCurrentPage("others"); window.scrollTo(0, 0); }} className="hover:text-white transition-colors uppercase tracking-widest">Others</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20 text-[10px] md:text-sm font-bold opacity-60 flex flex-col md:flex-row justify-between gap-4 uppercase tracking-widest">
            <span>2026 - Mellow Learners Ltd</span>
            <span>Powered by Source II Studio</span>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      {!cookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-[60]">
          <div className="max-w-4xl mx-auto bg-white border-2 border-pink/20 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <span className="text-sm font-bold text-navy flex-1 text-center md:text-left">
              This website uses cookies to ensure you get the best magical experience! 🍪
            </span>
            <button 
              onClick={handleCookieAccept}
              className="bg-yellow text-navy px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Okay, magic!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative py-2 transition-all hover:text-gold ${active ? "text-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gold after:rounded-full translate-y-[-2px]" : "text-white/60"}`}
    >
      {children}
    </button>
  );
}

function MobileNavLink({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`text-2xl font-display text-left py-4 border-b border-white/5 ${active ? "text-gold" : "text-white/50"}`}
    >
      {children}
    </button>
  );
}

// --- OTHERS PAGE Component ---
function OthersPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ContactPage />
    </motion.div>
  );
}

// --- HOME PAGE Component ---
function HomePage({ onPageChange }: { onPageChange: (page: Page) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Brand Banner Hero */}
      <section className="relative overflow-hidden bg-royal pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <img 
              src="banner.png" 
              alt="TaleWhims Banner" 
              className="w-full h-auto object-cover min-h-[300px]"
              referrerPolicy="no-referrer"
            />
            {/* Animated Overlay Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute top-10 left-10 text-white/40 md:text-white/20 hidden md:block"
            >
              <Sparkles size={160} className="animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="bg-cream pt-16 pb-24 md:pt-24 md:pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#002366_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <span className="bg-gold/20 text-royal px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.3em]">
              Welcome to the Magic
            </span>
            <h1 className="text-5xl md:text-[6rem] font-display text-royal mb-6 leading-[1] drop-shadow-sm">
              Little Stories.<br className="hidden md:block" /> Big Wonders.
            </h1>
            <p className="text-slate-600 text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed mb-12">
              Original songs, magical stories, and animated adventures for curious kids aged 2–10.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl">
              <a 
                href={YOUTUBE_CHANNEL_URL} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-pink text-white px-10 py-6 rounded-3xl font-display text-2xl flex items-center justify-center gap-4 shadow-xl hover:translate-y-[-4px] hover:shadow-pink/30 active:translate-y-0 transition-all group"
              >
                Watch Channel <Youtube size={32} className="group-hover:rotate-12 transition-transform" />
              </a>
              <button 
                onClick={() => onPageChange("books")}
                className="flex-1 bg-royal text-white px-10 py-6 rounded-3xl font-display text-2xl flex items-center justify-center gap-4 shadow-xl hover:translate-y-[-4px] hover:shadow-royal/30 active:translate-y-0 transition-all group"
              >
                Our Library <BookIcon size={32} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl text-navy text-center mb-20">What's on Talewhims?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <SeriesCard color="bg-yellow" icon="🎵" title="Classic Nursery Rhymes" desc="All the classic rhymes your little ones love, beautifully animated" href={playlistLinks.nurseryRhymes} />
            <SeriesCard color="bg-pink" icon="🎶" title="Original Songs" desc="Brand new original songs you won't find anywhere else" href={playlistLinks.originalSongs} />
            <SeriesCard color="bg-teal" icon="📚" title="Learn With Talewhims" desc="Colours, numbers, animals and more — learning through music" href={playlistLinks.learn} />
            <SeriesCard color="bg-purple" icon="📖" title="Wisdom Tales" desc="Animated storybooks with animal heroes and big life lessons" href={playlistLinks.wisdomTales} />
            <SeriesCard color="bg-coral" icon="🦁" title="Why I Am Amazing" desc="Every animal is amazing — and this series proves it" href={playlistLinks.whyAmazing} />
            <SeriesCard color="bg-yellow" icon="🎙️" title="Chicken & Banana Show" desc="The funniest kids podcast on YouTube" href={playlistLinks.chickenBanana} />
            <SeriesCard color="bg-purple" icon="🌙" title="Nani Ki Kahani" desc="Urdu moral stories narrated by a real grandmother" href={playlistLinks.naniKiKahani} />
            <SeriesCard color="bg-pink" icon="🎨" title="Kids Coloring Books" desc="Original illustrated coloring books available on Amazon" href={playlistLinks.coloringBooks} />
            <SeriesCard color="bg-teal" icon="⚡" title="Talewhims Shorts" desc="60 seconds of pure Talewhims magic" href={playlistLinks.shorts} cta="Watch Shorts" />
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 px-6 bg-white border-y border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-navy mb-4">Stories You Can Hold 📚</h2>
            <p className="text-xl font-bold text-navy/50">Original illustrated books by Sadiqa Akhter — available on Amazon</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <FeaturedBook color="bg-coral" title="Benny the Brave Little Bunny" />
            <FeaturedBook color="bg-yellow" title="Jamie's Speedy Dream" />
            <FeaturedBook color="bg-teal" title="Oliver and the Wise Oak Tree" />
            <FeaturedBook color="bg-pink" title="The Fire-Breathing Dragon Coloring Book" />
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => onPageChange("books")}
              className="bg-navy text-white px-12 py-6 rounded-2xl font-display text-2xl flex items-center justify-center gap-3 hover:bg-pink transition-colors group shadow-xl"
            >
              Shop All Books <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </button>
          </div>
        </div>
      </section>

      <ColoringPagesSlideshow />

      {/* Newsletter */}
      <section className="bg-pink py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <div className="text-white space-y-4">
            <h2 className="text-4xl md:text-[4rem] leading-[1.1]">Get new stories every week! 🌟</h2>
            <p className="text-xl md:text-2xl font-bold opacity-80 max-w-2xl mx-auto">Subscribe and never miss a new song, story, or adventure from Talewhims.</p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto" action="mailto:hello@talewhims.com" method="POST">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-8 py-6 rounded-2xl bg-white text-navy placeholder:text-navy/40 focus:outline-none border-4 border-transparent focus:border-yellow transition-all font-bold text-xl shadow-inner"
              required
            />
            <button className="bg-yellow text-navy px-12 py-6 rounded-2xl font-display text-2xl hover:translate-y-[-6px] transition-all shadow-xl active:translate-y-0 active:shadow-md">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

const coloringPageImages = [
  "coloring-pages/coloring-01.jpg",
  "coloring-pages/coloring-02.jpg",
  "coloring-pages/coloring-03.jpg",
  "coloring-pages/coloring-04.jpg",
  "coloring-pages/coloring-05.jpg",
  "coloring-pages/coloring-06.jpg",
  "coloring-pages/coloring-07.jpg",
  "coloring-pages/coloring-08.jpg",
  "coloring-pages/coloring-09.jpg",
  "coloring-pages/coloring-10.jpg",
];

function ColoringPagesSlideshow() {
  const slides = [...coloringPageImages, ...coloringPageImages];

  return (
    <section className="py-24 md:py-32 bg-cream overflow-hidden border-y-8 border-white">
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <span className="bg-pink/10 text-pink px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.25em]">
          Coloring Pages
        </span>
        <h2 className="text-4xl md:text-6xl text-navy mt-6 mb-4">Cute pages for little artists</h2>
        <p className="text-lg md:text-2xl font-bold text-navy/50 max-w-3xl mx-auto">
          A soft moving gallery of TaleWhims coloring book pages, made for tiny hands and big imagination.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="coloring-marquee flex gap-6 md:gap-10 w-max">
          {slides.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="w-56 sm:w-64 md:w-80 aspect-[3/4] rounded-[2rem] bg-white p-4 shadow-xl border-4 border-white flex-shrink-0"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-yellow/35 via-white to-pink/25 flex items-center justify-center">
                <img
                  src={src}
                  alt="TaleWhims coloring book page"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <BookIcon size={72} className="text-navy/15" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeriesCard({ color, icon, title, desc, href = YOUTUBE_CHANNEL_URL, cta = "Watch Now" }: { color: string, icon: string, title: string, desc: string, href?: string, cta?: string }) {
  return (
    <div className={`p-10 rounded-[3rem] ${color} group card-transition flex flex-col justify-between h-full border-b-8 border-navy/10`}>
      <div className="space-y-6">
        <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform origin-left">{icon}</div>
        <h3 className="text-3xl md:text-4xl text-navy leading-tight">{title}</h3>
        <p className="text-navy/60 font-bold leading-relaxed text-lg">{desc}</p>
      </div>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-12 bg-white/30 group-hover:bg-white text-navy py-5 rounded-2xl font-display text-2xl text-center transition-all shadow-sm group-hover:shadow-lg"
      >
        {cta}
      </a>
    </div>
  );
}

function FeaturedBook({ color, title }: { color: string, title: string }) {
  const isColoring = title.toLowerCase().includes("coloring book");
  return (
    <BookCard 
      book={title} 
      type={isColoring ? "coloring" : "story"} 
      colorClass={color} 
    />
  );
}

// --- WATCH PAGE Component ---
function WatchPage() {
  const series = [
    { title: "Classic Nursery Rhymes", desc: "Sing along with the world's most beloved nursery rhymes, brought to life with warm colourful animation. Perfect for toddlers and preschoolers aged 2–6.", href: playlistLinks.nurseryRhymes, embed: playlistEmbeds.nurseryRhymes },
    { title: "Original Songs", desc: "Fresh, original, never-before-heard kids songs created just for little ones. From silly animal adventures to energetic dance anthems — all original Talewhims creations.", href: playlistLinks.originalSongs, embed: playlistEmbeds.originalSongs },
    { title: "Learn With Talewhims", desc: "Colours, numbers, animals, fruits and vegetables — early learning has never been this fun. Created by a Google Certified Educator with over a decade of teaching experience.", href: playlistLinks.learn, embed: playlistEmbeds.learn },
    { title: "Wisdom Tales", desc: "Animated adaptations of original Talewhims storybooks, featuring animal heroes and big life lessons wrapped in magical adventures.", href: playlistLinks.wisdomTales, embed: playlistEmbeds.wisdomTales },
    { title: "Why I Am Amazing", desc: "Every animal hero takes centre stage to celebrate what makes them extraordinary. A joyful series about self-confidence, self-love, and individuality.", href: playlistLinks.whyAmazing, embed: playlistEmbeds.whyAmazing },
    { title: "Chicken & Banana Show", desc: "Chicken and Banana sit behind their microphones and tackle the big questions kids actually care about — with maximum giggles guaranteed.", href: playlistLinks.chickenBanana, embed: playlistEmbeds.chickenBanana },
    { title: "Nani Ki Kahani", desc: "Original Urdu and Hindi moral stories narrated by a real grandmother, brought to life through beautiful 3D animation. With English subtitles.", href: playlistLinks.naniKiKahani, embed: playlistEmbeds.naniKiKahani },
    { title: "Kids Coloring Books", desc: "Video previews and trailers for the full Talewhims coloring book collection — available on Amazon.", href: playlistLinks.coloringBooks, embed: playlistEmbeds.coloringBooks },
    { title: "Talewhims Shorts", desc: "Bite-sized moments of Talewhims magic — new Shorts every week.", href: playlistLinks.shorts, embed: playlistEmbeds.shorts }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-32 max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-[5rem] mb-6 leading-tight">Watch Talewhims 🎬</h1>
        <p className="text-xl md:text-3xl font-bold text-navy/50 max-w-2xl mx-auto">Find your favourite series and start watching — new videos every week!</p>
      </div>

      <div className="space-y-48">
        {series.map((item, i) => (
          <section key={i} className="group">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`aspect-video rounded-[4rem] group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl relative overflow-hidden bg-gradient-to-br from-navy/5 to-navy/10 flex items-center justify-center ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 bg-navy/5 mix-blend-overlay" />
                <iframe
                  src={item.embed}
                  title={item.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className={`space-y-8 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <h2 className="text-4xl md:text-6xl text-navy">{item.title}</h2>
                <p className="text-xl md:text-2xl font-bold text-navy/70 leading-relaxed italic border-l-8 border-yellow pl-10 py-4">"{item.desc}"</p>
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex bg-pink text-white px-12 py-6 rounded-3xl font-display text-2xl gap-4 items-center hover:scale-105 transition-transform shadow-xl hover:shadow-pink/20"
                >
                  Watch Full Playlist <Youtube size={32} />
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}

// --- BOOKS PAGE Component ---
function BooksPage() {
  const coloringBooks = [
    { category: "Forest Friends", color: "bg-teal", books: ["Busy Squirrel", "Graceful Deer", "Laughing Raccoon", "Quiet Hedgehog", "The Sly Fox", "Tiny Mouse", "Wise Owl"] },
    { category: "Ocean Wonders", color: "bg-pink", books: ["Curious Octopus", "Dolphin", "Gliding Turtle", "Jellyfish Ballet", "Smiling Shark", "Starfish Parade"] },
    { category: "Fantasy Creatures", color: "bg-purple", books: ["The Fire-Breathing Dragon", "The Mystical Unicorn"] },
    { category: "Kawaii & Cute", color: "bg-yellow", books: ["Kawaii Farm Friends", "Kawaii Animal Adventures", "Cute Pizza", "Cupcakes"] },
    { category: "Cute Animals", color: "bg-coral", books: ["Cute Dog", "Cute Cat", "Penguin", "Christmas Penguin"] },
    { category: "Kids Activity", color: "bg-teal", books: ["Cute Transport", "Cute Girl", "Boys", "Cute Vegetables", "Under the Sea"] },
    { category: "Christmas", color: "bg-pink", books: ["Christmas", "XMAS Bunny"] }
  ];

  const storyBooks = [
    { category: "Sports & Inspiration", color: "bg-navy text-white", books: ["The Underdog's Triumph", "Spot's Big Game", "Inspiring Legendary Baseball Stories", "Oliver and the Wise Oak Tree"] },
    { category: "Adventure & Space", color: "bg-purple text-white", books: ["Ella's Big Dream"] },
    { category: "Moral Stories", color: "bg-yellow", books: ["Benny the Brave Little Bunny", "Jamie's Speedy Dream"] }
  ];

  const [activeTab, setActiveTab] = useState<"coloring" | "story">("coloring");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-32 space-y-8 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-[5rem] mb-6"
        >
          Stories You Can Hold 📚
        </motion.h1>
        <p className="text-xl md:text-3xl font-bold text-navy/50">Original illustrated coloring books and storybooks by Sadiqa Akhter — available on Amazon</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-24">
        <button 
          onClick={() => setActiveTab("coloring")}
          className={`px-12 py-6 rounded-[2rem] font-display text-2xl transition-all shadow-md ${activeTab === "coloring" ? "bg-pink text-white scale-105 shadow-xl" : "bg-white text-navy opacity-50 hover:opacity-100"}`}
        >
          Coloring Books
        </button>
        <button 
          onClick={() => setActiveTab("story")}
          className={`px-12 py-6 rounded-[2rem] font-display text-2xl transition-all shadow-md ${activeTab === "story" ? "bg-pink text-white scale-105 shadow-xl" : "bg-white text-navy opacity-50 hover:opacity-100"}`}
        >
          Storybooks
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab} 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20 }}
          className="space-y-40"
        >
          {(activeTab === "coloring" ? coloringBooks : storyBooks).map((section, idx) => (
            <div key={idx} className="space-y-16">
              <h2 className="text-4xl md:text-6xl text-navy inline-flex items-center gap-6">
                <span className="w-4 h-16 bg-pink rounded-full block" />
                {section.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {section.books.map((book, bIdx) => (
                  <BookCard 
                    key={bIdx} 
                    book={book} 
                    type={activeTab} 
                    colorClass={section.color} 
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
 
      <div className="mt-48 pt-32 border-t-8 border-navy/5 flex justify-center text-center">
        <div className="space-y-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl">Love our library?</h2>
          <a href={AMAZON_AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-amazon text-white px-16 py-8 rounded-[2rem] font-display text-3xl shadow-2xl hover:-rotate-2 hover:scale-105 active:scale-95 transition-all">
            Shop All Books on Amazon →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function BookCard({ book, type, colorClass }: { book: string; type: "coloring" | "story"; colorClass: string }) {
  const [imageError, setImageError] = useState(false);
  
  const safeTitle = book.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
  const fileName = type === "coloring" ? `${safeTitle}-coloring-book.jpg` : `${safeTitle}.jpg`;
  const amazonUrl = amazonBookLinks[book];

  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-4 flex flex-col h-full group cursor-pointer border border-navy/5 hover:shadow-2xl transition-all"
    >
      <div className="relative w-full h-[320px] rounded-xl overflow-hidden shadow-inner mb-6 bg-cream flex-shrink-0">
        {!imageError ? (
          <img 
            src={fileName} 
            alt={book} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full ${colorClass} flex flex-col items-center justify-center p-8 text-center`}>
            <BookIcon size={64} className="mb-6 opacity-20" />
            <span className="font-display text-2xl text-navy opacity-60 leading-tight">{book}</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-widest text-navy shadow-md ring-1 ring-black/5">
            Ages 3–10
          </span>
        </div>
      </div>

      <h3 className="font-display text-2xl text-navy mb-6 flex-1 line-clamp-2 px-2 leading-tight">
        {book}
      </h3>

      {amazonUrl ? (
        <a 
          href={amazonUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-amazon hover:bg-[#e68a00] text-white py-5 rounded-2xl font-display text-xl text-center transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
        >
          Buy on Amazon
        </a>
      ) : (
        <div className="bg-navy/10 text-navy/50 py-5 rounded-2xl font-display text-xl text-center shadow-inner flex items-center justify-center gap-3">
          Coming soon
        </div>
      )}
    </motion.div>
  );
}

// --- ABOUT PAGE Component ---
function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Brand Hero */}
      <section className="pt-32 pb-48 px-6 max-w-7xl mx-auto text-center relative">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-[7rem] mb-12 leading-none"
        >
          Meet the Maker <br className="hidden md:block" /> of Wonder ✨
        </motion.h1>
        <div className="h-4 w-64 bg-yellow/30 mx-auto rounded-full" />
      </section>

      {/* Main Sections */}
      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto space-y-40">
          
          {/* Black Section with Rainbow Glowing Grid */}
          <div className="relative bg-black rounded-[4rem] p-12 md:p-32 overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Slim Rainbow Glowing Grid */}
            <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:30px_30px]" />
              <motion.div 
                animate={{ 
                  background: [
                    "radial-gradient(circle at 0% 0%, #ff0000 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, #00ff00 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, #0000ff 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, #ff00ff 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, #ff0000 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 mix-blend-screen opacity-20 filter blur-3xl"
              />
            </div>

            <div className="relative z-10 space-y-8 text-center">
              <span className="text-gold font-black uppercase tracking-[0.4em] text-sm block">Established Curiosity</span>
              <h2 className="text-5xl md:text-8xl leading-tight tracking-tighter text-white">
                Crafting magic <br/>since day one
              </h2>
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                TaleWhims is a sanctuary for imagination, where we breathe life into the most enchanting children's tales through vibrant art and interactive experiences.
              </p>
              <div className="pt-8">
                <Heart className="text-pink fill-pink mx-auto animate-pulse" size={48} />
              </div>
            </div>
          </div>

          {/* Brand Info Card */}
          <div className="bg-white rounded-[4rem] p-12 md:p-32 border-b-[16px] border-pink/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 text-pink/5"><Sparkles size={240} /></div>
            <div className="relative z-10 space-y-12">
              <h2 className="text-4xl md:text-7xl text-navy">About Talewhims</h2>
              <p className="text-2xl md:text-4xl text-navy/70 leading-relaxed font-bold">
                Talewhims is a children's educational entertainment brand creating original nursery rhymes, singalong songs, moral character stories, bilingual learning content, and animated storybooks for kids aged 2–10. Every video and book is designed to spark curiosity, build good values, and make learning feel like the greatest adventure of all.
              </p>
            </div>
          </div>

          {/* Team Members List */}
          <div className="space-y-40">
            {/* Sadiqa Akhter */}
            <div className="max-w-4xl mx-auto text-center space-y-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-navy/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow/5 rounded-full blur-3xl" />
               <div className="space-y-4">
                  <span className="text-pink font-black uppercase tracking-[.4em] text-sm md:text-base block">Founder & Lead Artist</span>
                  <h2 className="text-5xl md:text-7xl leading-none underline decoration-yellow decoration-8 underline-offset-12">Sadiqa Akhter</h2>
               </div>
               <p className="text-xl md:text-3xl text-navy/70 leading-relaxed font-bold">
                  Sadiqa Akhter is a professional illustrator, Google Certified Educator, and STEM educator with over 11 years of experience. She has published over 500 books on Amazon KDP and is the founder of Mellow Learners Ltd — dedicated to making learning joyful and imaginative for children everywhere.
               </p>
               <div className="border-t-4 border-dashed border-pink/20 pt-8 mt-8">
                  <p className="text-xl md:text-2xl text-navy/80 leading-relaxed font-bold italic tracking-tight">
                    "Talewhims is my love letter to curious kids and the families who read, watch, and learn alongside them."
                  </p>
               </div>
            </div>

            {/* Samad Ullah Khan */}
            <div className="max-w-4xl mx-auto text-center space-y-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-navy/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-32 h-32 bg-teal/5 rounded-full blur-3xl" />
               <div className="space-y-4">
                  <span className="text-teal font-black uppercase tracking-[.4em] text-sm md:text-base block">Creative Director</span>
                  <h2 className="text-5xl md:text-7xl leading-none underline decoration-teal decoration-8 underline-offset-12">Samad Ullah Khan</h2>
               </div>
               <p className="text-xl md:text-3xl text-navy/70 leading-relaxed font-bold">
                  The visionary Creative Director behind our magical storybooks. Samad crafts the narratives that lead children through epic quests and gentle lessons, ensuring every Talewhims story is a treasure worth holding.
               </p>
               <div className="border-t-4 border-dashed border-teal/20 pt-8 mt-8">
                  <p className="text-xl md:text-2xl text-navy/80 leading-relaxed font-bold italic tracking-tight">
                    "Building worlds where every child can find their own hero."
                  </p>
               </div>
            </div>

            {/* Saima Shumail */}
            <div className="max-w-4xl mx-auto text-center space-y-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-navy/5 relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple/5 rounded-full blur-3xl" />
               <div className="space-y-4">
                  <span className="text-purple font-black uppercase tracking-[.4em] text-sm md:text-base block">Mandala Artist</span>
                  <h2 className="text-5xl md:text-7xl leading-none underline decoration-purple decoration-8 underline-offset-12">Saima Shumail</h2>
               </div>
               <p className="text-xl md:text-3xl text-navy/70 leading-relaxed font-bold">
                  An expert Mandala Artist who brings peace and focus to our coloring books. Saima's intricate designs offer a meditative creative outlet, helping children explore patterns and mindfulness.
               </p>
               <div className="border-t-4 border-dashed border-purple/20 pt-8 mt-8">
                  <p className="text-xl md:text-2xl text-navy/80 leading-relaxed font-bold italic tracking-tight">
                    "Finding the rhythm in every line and the magic in every circle."
                  </p>
               </div>
            </div>

            {/* Bilal Ansari */}
            <div className="max-w-4xl mx-auto text-center space-y-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-navy/5 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal/5 rounded-full blur-3xl" />
               <div className="space-y-4">
                  <span className="text-royal font-black uppercase tracking-[.4em] text-sm md:text-base block">Team Manager</span>
                  <h2 className="text-5xl md:text-7xl leading-none underline decoration-royal decoration-8 underline-offset-12">Bilal Ansari</h2>
               </div>
               <p className="text-xl md:text-3xl text-navy/70 leading-relaxed font-bold">
                  As our Team Manager, Bilal orchestrates the synergy between our various artistic and technical teams. He ensures that every project, from the smallest sketch to the grandest animation, is executed with precision and aligned with the Talewhims vision.
               </p>
               <div className="border-t-4 border-dashed border-royal/20 pt-8 mt-8">
                  <p className="text-xl md:text-2xl text-navy/80 leading-relaxed font-bold italic tracking-tight">
                    "Leading the magic-makers to bring big wonders to life."
                  </p>
               </div>
            </div>
          </div>

          {/* Mellow Learners Card */}
          <div className="bg-navy text-white rounded-[4rem] p-12 md:p-32 space-y-12 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
            <div className="relative z-10 space-y-12">
              <h2 className="text-4xl md:text-7xl text-yellow">About Mellow Learners</h2>
              <p className="text-2xl md:text-4xl opacity-80 leading-relaxed font-bold">
                Talewhims is part of Mellow Learners Ltd — an international EdTech venture building joyful learning experiences for children worldwide through storytelling, illustration, and technology.
              </p>
              <div className="pt-10 flex flex-wrap gap-8 text-center sm:text-left">
                <a href="https://www.youtube.com/@talewhims" target="_blank" className="bg-pink text-white px-12 py-6 rounded-[2rem] font-display text-2xl transition-all hover:scale-105 hover:bg-white hover:text-pink shadow-xl">
                  Watch on YouTube
                </a>
                <a href="https://www.amazon.com/author/talewhims" target="_blank" className="bg-amazon text-white px-12 py-6 rounded-[2rem] font-display text-2xl transition-all hover:scale-105 shadow-xl">
                  Our Books on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// --- CONTACT PAGE Component ---
function ContactPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-32 max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-[6rem] mb-6 font-display leading-[1]">Say Hello! 👋</h1>
        <p className="text-xl md:text-3xl font-bold text-navy/50">For collaborations, sponsorships, licensing, or just to say hi — we'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-[4rem] p-10 md:p-24 border-2 border-navy/5 shadow-2xl relative">
          <form className="space-y-12 relative z-10" action="mailto:hello@talewhims.com" method="POST" encType="text/plain">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FormGroup label="Magical Name" placeholder="Your name" type="text" id="name" required />
              <FormGroup label="Email Address" placeholder="hello@adventure.com" type="email" id="email" required />
            </div>
            
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[.3em] px-4 opacity-40">Subject</label>
              <select className="w-full px-8 py-6 rounded-[2rem] bg-cream border-4 border-transparent focus:border-pink transition-all outline-none font-bold text-lg appearance-none cursor-pointer shadow-inner">
                <option>General Enquiry</option>
                <option>Sponsorship & Collaboration</option>
                <option>Book Licensing</option>
                <option>Press</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[.3em] px-4 opacity-40">Your Message</label>
              <textarea rows={6} placeholder="What magic can we build together?" className="w-full px-8 py-6 rounded-[3rem] bg-cream border-4 border-transparent focus:border-pink transition-all outline-none font-bold text-lg resize-none shadow-inner" required />
            </div>

            <button type="submit" className="w-full bg-pink text-white py-8 rounded-[2.5rem] font-display text-4xl shadow-xl hover:translate-y-[-8px] transition-all hover:bg-navy active:translate-y-0 active:shadow-md">
              Send Message! ✨
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-16">
          <div className="bg-yellow rounded-[3.5rem] p-16 text-navy shadow-xl relative overflow-hidden group border-b-[12px] border-black/10">
            <div className="absolute top-0 right-0 p-12 text-black/5"><Mail size={160} /></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl mb-4">Direct Mail</h2>
              <p className="text-xl md:text-2xl font-bold opacity-70 leading-relaxed mb-10">Prefer a direct line to the studio?</p>
              <a href="mailto:hello@talewhims.com" className="text-2xl md:text-3xl font-black block border-b-4 border-navy w-fit hover:translate-x-3 transition-transform">
                hello@talewhims.com
              </a>
            </div>
          </div>

          <div className="space-y-10 px-8">
            <h3 className="text-3xl font-display uppercase tracking-widest text-navy opacity-40">The Neighborhood</h3>
            <div className="space-y-6">
              <BigLink icon={<Youtube className="text-red-500" />} label="Watch us" value="@talewhims" href="https://www.youtube.com/@talewhims" />
              <BigLink icon={<ShoppingCart className="text-orange-500" />} label="Read us" value="Sadiqa Akhter" href="https://www.amazon.com/author/talewhims" />
              <BigLink icon={<ArrowRight className="text-blue-500" />} label="Learn more" value="talewhims.com" href="https://www.talewhims.com" />
            </div>
          </div>
          
          <div className="p-10 bg-white rounded-[3rem] border-2 border-navy/5 flex items-center justify-between group cursor-pointer hover:border-pink transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center text-pink group-hover:scale-110 transition-transform"><Instagram /></div>
              <span className="text-2xl font-display text-navy">Follow us</span>
            </div>
            <ArrowRight className="text-pink opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" size={32} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FormGroup({ label, placeholder, type, id, required }: { label: string, placeholder: string, type: string, id: string, required?: boolean }) {
  return (
    <div className="space-y-4">
      <label htmlFor={id} className="text-xs font-black uppercase tracking-[.3em] px-4 opacity-40">{label}</label>
      <input 
        id={id}
        type={type} 
        placeholder={placeholder} 
        className="w-full px-8 py-6 rounded-[2rem] bg-cream border-4 border-transparent focus:border-pink transition-all outline-none font-bold text-lg shadow-inner" 
        required={required} 
      />
    </div>
  );
}

function BigLink({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} target="_blank" className="flex items-center gap-8 group">
      <div className="w-20 h-20 rounded-[1.75rem] bg-white border border-navy/5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <div className="space-y-1">
        <span className="text-xs font-black uppercase tracking-[.25em] opacity-30 block">{label}</span>
        <span className="text-2xl font-bold text-navy group-hover:text-pink transition-colors">{value}</span>
      </div>
    </a>
  );
}
