import { useState } from "react";
import {
  Trophy,
  Calendar,
  Building,
  Wifi,
  Droplets,
  Utensils,
  Shield,
  Coins,
  X,
  MapPin,
  Clock,
  Users,
  Medal,
  Target,
  Bed,
  Fan,
  BookOpen,
  Bath,
  Coffee,
  ExternalLink,
  Star,
  Home,
  Heart,
  Check,
  Info,
  Dumbbell,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sports Events Data
const sportsEvents = [
  {
    id: 1,
    title: "Inter-University Athletics Meet",
    date: "2025-02-15",
    venue: "University Stadium",
    description: "Annual athletics competition featuring track and field events with participants from 50+ universities.",
    category: "Athletics",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Basketball Championship",
    date: "2025-01-25",
    venue: "Indoor Sports Complex",
    description: "Inter-department basketball tournament with knockout format.",
    category: "Basketball",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Cricket Tournament",
    date: "2025-03-10",
    venue: "University Cricket Ground",
    description: "Annual T20 cricket tournament for all departments.",
    category: "Cricket",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Volleyball League",
    date: "2025-02-01",
    venue: "Outdoor Courts",
    description: "Men's and women's volleyball league matches.",
    category: "Volleyball",
    status: "upcoming",
  },
];

// Enhanced Hostel Data based on CollegeDunia
const hostelInfo = {
  monthlyRent: "₹700",
  messCharges: "Included in rent",
  roomCapacity: "5 students per room",
  totalCapacity: "2,000+ students",
  rating: 3.7,
  totalReviews: 385,
  location: "End of University Campus",
  googleMapsUrl: "https://www.google.com/maps/search/Periyar+University+Hostel+Salem+Tamil+Nadu",
  maleHostel: true,
  femaleHostel: true,
  amenities: [
    { name: "Hot Water Supply", icon: Droplets, available: true },
    { name: "Double Fans per Room", icon: Fan, available: true },
    { name: "Individual Carts", icon: Bed, available: true },
    { name: "Separate Storage Space", icon: Home, available: true },
    { name: "Clean Bathrooms", icon: Bath, available: true },
    { name: "24/7 Security", icon: Shield, available: true },
    { name: "Mess/Dining Hall", icon: Utensils, available: true },
    { name: "Reading Room", icon: BookOpen, available: true },
    { name: "Gymnasium", icon: Dumbbell, available: true },
    { name: "Indoor Games", icon: Trophy, available: true },
    { name: "Ground for Activities", icon: Target, available: true },
    { name: "Wi-Fi Facility", icon: Wifi, available: true },
  ],
  foodMenu: {
    regular: ["Idli", "Dosa", "Rice with Sambar", "Chapathi with Dhal", "Variety Rice"],
    special: ["Upma", "Biriyani (Sundays & Festivals)"],
    description: "Menu decided by students with traditional South Indian meals"
  },
  ratings: {
    academic: 4.1,
    faculty: 4.0,
    infrastructure: 4.0,
    accommodation: 3.7,
    placement: 3.8,
  }
};

// Achievements
const achievements = [
  { title: "South Zone Champion - Athletics", year: "2024", icon: Medal },
  { title: "State University Games - Gold", year: "2024", icon: Trophy },
  { title: "Inter-University Kabaddi - Runner Up", year: "2023", icon: Target },
  { title: "All India University Volleyball", year: "2023", icon: Medal },
];

// Hostel Rules
const hostelRules = [
  "In-time: 10:00 PM (Strict)",
  "Attendance mandatory at meals",
  "Visitors allowed only in common area",
  "No cooking inside rooms",
  "Maintain cleanliness and discipline",
  "Ragging is strictly prohibited",
];

export const SportsAndFacilities = () => {
  const [activeTab, setActiveTab] = useState<"sports" | "hostel">("sports");
  const [selectedEvent, setSelectedEvent] = useState<typeof sportsEvents[0] | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Sports & Facilities</h1>
        <p className="text-slate-400">Campus life, athletics, and hostel information</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("sports")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "sports"
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Trophy className="w-5 h-5" />
          Sports & Events
        </button>
        <button
          onClick={() => setActiveTab("hostel")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
            activeTab === "hostel"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "glass-dark text-slate-300 hover:text-slate-100"
          )}
        >
          <Building className="w-5 h-5" />
          Hostel & Amenities
        </button>
      </div>

      {/* Content */}
      {activeTab === "sports" && (
        <div className="space-y-6">
          {/* Achievements Wall */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Medal className="w-5 h-5 text-yellow-400" />
              Recent Achievements
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <achievement.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{achievement.title}</p>
                    <p className="text-xs text-slate-500">{achievement.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sports Calendar */}
          <div>
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              Upcoming Events
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sportsEvents.map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="glass-dark rounded-xl p-5 hover:border-orange-500/30 transition-all cursor-pointer group animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                      {event.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-100 group-hover:text-orange-400 transition-colors mb-2">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sports Facilities */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Sports Facilities
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "University Stadium", capacity: "5,000 seats", sports: "Athletics, Football" },
                { name: "Indoor Sports Complex", capacity: "1,500 seats", sports: "Basketball, Badminton, Table Tennis" },
                { name: "Cricket Ground", capacity: "2,000 seats", sports: "Cricket, Practice Nets" },
                { name: "Swimming Pool", capacity: "Olympic size", sports: "Swimming, Water Polo" },
                { name: "Gymnasium", capacity: "Modern Equipment", sports: "Weight Training, Fitness" },
                { name: "Tennis Courts", capacity: "4 Courts", sports: "Tennis, Practice" },
              ].map((facility, index) => (
                <div 
                  key={facility.name}
                  className="bg-slate-800/50 rounded-xl p-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-medium text-slate-200 mb-2">{facility.name}</h4>
                  <p className="text-sm text-slate-400">{facility.capacity}</p>
                  <p className="text-xs text-orange-400 mt-1">{facility.sports}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "hostel" && (
        <div className="space-y-6">
          {/* Rating & Overview Card */}
          <div className="glass-dark rounded-2xl p-6 border-blue-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-100 text-xl">Periyar University Hostels</h3>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    {hostelInfo.rating}/5
                  </span>
                </div>
                <p className="text-sm text-slate-400">Based on {hostelInfo.totalReviews} verified student reviews</p>
              </div>
              <div className="flex gap-3">
                <div className="text-center px-4 py-2 rounded-xl bg-blue-500/20">
                  <p className="text-2xl font-bold text-blue-400">{hostelInfo.monthlyRent}</p>
                  <p className="text-xs text-slate-400">Monthly Rent</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-green-500/20">
                  <p className="text-sm font-medium text-green-400">Mess Included</p>
                  <p className="text-xs text-slate-400">In Rent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location with Google Maps Link */}
          <a 
            href={hostelInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dark rounded-2xl p-5 flex items-center justify-between hover:border-orange-500/30 transition-all group block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-200 group-hover:text-orange-400 transition-colors">
                  Hostel Location
                </h4>
                <p className="text-sm text-slate-400">{hostelInfo.location}, Periyar University Campus, Salem</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
              <span className="text-sm hidden md:inline">Open in Google Maps</span>
              <ExternalLink className="w-5 h-5" />
            </div>
          </a>

          {/* Hostel Types */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-dark rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">Boys Hostel</h4>
                  <p className="text-sm text-slate-400">Separate accommodation</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Room Type</span>
                  <span className="text-slate-200">{hostelInfo.roomCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security</span>
                  <span className="text-green-400">24/7 Available</span>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">Girls Hostel</h4>
                  <p className="text-sm text-slate-400">Safe & Secure</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Room Type</span>
                  <span className="text-slate-200">{hostelInfo.roomCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Special Security</span>
                  <span className="text-green-400">Enhanced Safety</span>
                </div>
              </div>
            </div>
          </div>

          {/* Room Amenities Grid */}
          <div>
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Room Amenities & Facilities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hostelInfo.amenities.map((amenity, index) => (
                <div
                  key={amenity.name}
                  className="glass-dark rounded-xl p-4 flex items-center gap-3 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    amenity.available ? "bg-green-500/20" : "bg-slate-800"
                  )}>
                    <amenity.icon className={cn(
                      "w-5 h-5",
                      amenity.available ? "text-green-400" : "text-slate-500"
                    )} />
                  </div>
                  <span className="text-sm text-slate-200">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mess & Food */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-400" />
              Mess & Food
            </h3>
            <p className="text-sm text-slate-400 mb-4">{hostelInfo.foodMenu.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-orange-400" />
                  Regular Menu
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hostelInfo.foodMenu.regular.map((item) => (
                    <span key={item} className="text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Special Days (Sundays & Festivals)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hostelInfo.foodMenu.special.map((item) => (
                    <span key={item} className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recreation & Rules */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-dark rounded-2xl p-6">
              <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-purple-400" />
                Recreation
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  Fully equipped gymnasium
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  Ground for physical activities
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  Indoor games room (Carrom, Chess)
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  Reading room for studies
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  Common room for socializing
                </li>
              </ul>
            </div>

            <div className="glass-dark rounded-2xl p-6">
              <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Hostel Rules
              </h3>
              <ul className="space-y-3 text-sm">
                {hostelRules.map((rule, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs flex-shrink-0">
                      {index + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Review Summary */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Student Reviews Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {Object.entries(hostelInfo.ratings).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{value}</div>
                  <p className="text-xs text-slate-400 capitalize">{key}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 italic">
              "The hostel is a supportive second home for students with good facilities and safety measures, 
              especially for female students. Registration process is straightforward with college assistance."
            </p>
          </div>

          {/* Admission Process */}
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              Hostel Admission Process
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: "Get Admission", desc: "Secure university admission first" },
                { step: 2, title: "Apply for Hostel", desc: "Submit hostel application form" },
                { step: 3, title: "Document Verification", desc: "Submit required documents" },
                { step: 4, title: "Room Allotment", desc: "Get room assigned and move in" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-2 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-medium text-slate-200 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {selectedEvent && (
        <div className="modal-backdrop flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div
            className="glass-dark rounded-2xl p-6 max-w-lg w-full animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                {selectedEvent.category}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-slate-100 mb-4">{selectedEvent.title}</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="w-5 h-5 text-orange-400" />
                {new Date(selectedEvent.date).toLocaleDateString("en-IN", { 
                  weekday: "long", day: "numeric", month: "long", year: "numeric" 
                })}
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-orange-400" />
                {selectedEvent.venue}
              </div>
            </div>
            
            <p className="text-slate-400 mt-4">{selectedEvent.description}</p>
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950 font-medium hover:from-orange-400 hover:to-orange-500 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsAndFacilities;
