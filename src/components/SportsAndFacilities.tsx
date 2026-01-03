import { useState } from "react";
import {
  Trophy,
  Calendar,
  Building,
  Wifi,
  Droplets,
  Utensils,
  Shield,
  X,
  MapPin,
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useSportsEvents,
  useAchievements,
  useFacilities,
  useHostelInfo,
} from "@/hooks/useUniversityData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Medal,
  Target,
  Droplets,
  Dumbbell,
  BookOpen,
  Wifi,
  Shield,
  Utensils,
  Bed,
  Fan,
  Bath,
  Coffee,
  Home,
  Heart,
  Award: Medal,
};

export const SportsAndFacilities = () => {
  const [activeTab, setActiveTab] = useState<"sports" | "hostel">("sports");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Fetch data from database
  const { data: sportsEvents, isLoading: loadingEvents } = useSportsEvents();
  const { data: achievements, isLoading: loadingAchievements } = useAchievements();
  const { data: facilities, isLoading: loadingFacilities } = useFacilities();
  const { data: hostelInfo, isLoading: loadingHostel } = useHostelInfo();

  const isLoading = loadingEvents || loadingAchievements || loadingFacilities || loadingHostel;

  const sportsFacilities = facilities?.filter(f => f.category === "sports") || [];

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
          <p className="text-slate-400">Loading facilities information...</p>
        </div>
      </div>
    );
  }

  // Parse hostel amenities from JSONB with proper typing
  const hostelAmenities = (Array.isArray(hostelInfo?.amenities) ? hostelInfo.amenities : []) as Array<{ name: string; available: boolean }>;
  const foodMenu = (hostelInfo?.food_menu && typeof hostelInfo.food_menu === 'object' && !Array.isArray(hostelInfo.food_menu) 
    ? hostelInfo.food_menu 
    : { regular: [], special: [], description: "" }) as { regular: string[]; special: string[]; description: string };
  const hostelRules = (Array.isArray(hostelInfo?.rules) ? hostelInfo.rules : []) as string[];

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

      {/* Sports Content */}
      {activeTab === "sports" && (
        <div className="space-y-6">
          {/* Achievements Wall */}
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Medal className="w-5 h-5 text-yellow-400" />
              Recent Achievements
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements?.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon_name || "Medal"] || Medal;
                return (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 animate-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{achievement.title}</p>
                      <p className="text-xs text-slate-500">{achievement.year}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sports Calendar */}
          <div>
            <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              Upcoming Events
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sportsEvents?.map((event, index) => (
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
                      {event.event_date ? new Date(event.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "TBA"}
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
              {sportsFacilities.map((facility, index) => (
                <div 
                  key={facility.id}
                  className="bg-slate-800/50 rounded-xl p-4 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-medium text-slate-200 mb-2">{facility.name}</h4>
                  <p className="text-sm text-slate-400">{facility.capacity}</p>
                  {facility.features && (
                    <p className="text-xs text-orange-400 mt-1">{facility.features.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hostel Content */}
      {activeTab === "hostel" && hostelInfo && (
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
                <p className="text-sm text-slate-400">Based on {hostelInfo.total_reviews} verified student reviews</p>
              </div>
              <div className="flex gap-3">
                <div className="text-center px-4 py-2 rounded-xl bg-blue-500/20">
                  <p className="text-2xl font-bold text-blue-400">{hostelInfo.monthly_rent}</p>
                  <p className="text-xs text-slate-400">Monthly Rent</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-green-500/20">
                  <p className="text-sm font-medium text-green-400">{hostelInfo.mess_charges}</p>
                  <p className="text-xs text-slate-400">Mess</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location with Google Maps Link */}
          {hostelInfo.google_maps_url && (
            <a 
              href={hostelInfo.google_maps_url}
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
          )}

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
                  <span className="text-slate-200">{hostelInfo.room_capacity}</span>
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
                  <span className="text-slate-200">{hostelInfo.room_capacity}</span>
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
              {hostelAmenities.map((amenity: any, index: number) => (
                <div
                  key={amenity.name}
                  className="glass-dark rounded-xl p-4 flex items-center gap-3 animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    amenity.available ? "bg-green-500/20" : "bg-slate-800"
                  )}>
                    <Check className={cn(
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
            <p className="text-sm text-slate-400 mb-4">{foodMenu.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-orange-400" />
                  Regular Menu
                </h4>
                <div className="flex flex-wrap gap-2">
                  {foodMenu.regular?.map((item: string) => (
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
                  {foodMenu.special?.map((item: string) => (
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
                {hostelRules.map((rule: string, index: number) => (
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
                {selectedEvent.event_date ? new Date(selectedEvent.event_date).toLocaleDateString("en-IN", { 
                  weekday: "long", day: "numeric", month: "long", year: "numeric" 
                }) : "Date TBA"}
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
