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

// Hostel Data
const hostelInfo = {
  annualFee: "₹2,350",
  messCharges: "₹3,000/month (approx)",
  capacity: "2,000+ students",
  amenities: [
    { name: "Wi-Fi Connectivity", icon: Wifi, available: true },
    { name: "RO Purified Water", icon: Droplets, available: true },
    { name: "Mess/Dining Hall", icon: Utensils, available: true },
    { name: "24/7 Security", icon: Shield, available: true },
    { name: "Reading Room", icon: Building, available: true },
    { name: "Indoor Games", icon: Trophy, available: true },
  ],
};

// Achievements
const achievements = [
  { title: "South Zone Champion - Athletics", year: "2024", icon: Medal },
  { title: "State University Games - Gold", year: "2024", icon: Trophy },
  { title: "Inter-University Kabaddi - Runner Up", year: "2023", icon: Target },
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
            <div className="grid md:grid-cols-3 gap-4">
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
        </div>
      )}

      {activeTab === "hostel" && (
        <div className="space-y-6">
          {/* Fee Card */}
          <div className="glass-dark rounded-2xl p-6 border-orange-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-100 mb-1 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-orange-400" />
                  Hostel Fee Structure
                </h3>
                <p className="text-sm text-slate-400">Annual accommodation charges (approx.)</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-400">{hostelInfo.annualFee}</div>
                <p className="text-sm text-slate-400">+ {hostelInfo.messCharges}</p>
              </div>
            </div>
          </div>

          {/* Capacity Info */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              Hostel Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                <Users className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-slate-400">Capacity</p>
                  <p className="text-slate-200 font-medium">{hostelInfo.capacity}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                <Clock className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-slate-400">In-Time</p>
                  <p className="text-slate-200 font-medium">10:00 PM (Strict)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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