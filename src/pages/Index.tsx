
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Hotel, MapPin, Calendar, Globe, Search, ArrowRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Mock data
const destinations = [
  {
    id: 1,
    name: 'Jaipur',
    description: 'The Pink City with majestic palaces and rich culture',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=500&auto=format&fit=crop',
    budget: 15000,
    duration: '3 days',
    rating: 4.7
  },
  {
    id: 2,
    name: 'Udaipur',
    description: 'City of Lakes with stunning palaces and serene waters',
    image: 'https://images.unsplash.com/photo-1602517807959-3a3a71f74349?q=80&w=500&auto=format&fit=crop',
    budget: 20000,
    duration: '4 days',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Goa',
    description: 'Beach paradise with vibrant nightlife and relaxing shores',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=500&auto=format&fit=crop',
    budget: 25000,
    duration: '5 days',
    rating: 4.5
  },
  {
    id: 4,
    name: 'Kerala',
    description: 'God\'s Own Country with lush backwaters and scenic beauty',
    image: 'https://images.unsplash.com/photo-1602158123364-bdc73653ece4?q=80&w=500&auto=format&fit=crop',
    budget: 30000,
    duration: '6 days',
    rating: 4.8
  }
];

// Mock itineraries data
const itineraries = {
  1: [
    {
      day: 1,
      activities: [
        { time: '09:00 AM', activity: 'Visit Amber Fort', cost: 1500 },
        { time: '01:00 PM', activity: 'Lunch at a local restaurant', cost: 500 },
        { time: '03:00 PM', activity: 'Explore City Palace', cost: 1000 },
        { time: '07:00 PM', activity: 'Dinner and cultural show', cost: 1500 }
      ]
    },
    {
      day: 2,
      activities: [
        { time: '10:00 AM', activity: 'Visit Hawa Mahal', cost: 500 },
        { time: '01:00 PM', activity: 'Lunch at Peacock Rooftop Restaurant', cost: 800 },
        { time: '03:00 PM', activity: 'Shopping at Johari Bazaar', cost: 2000 },
        { time: '08:00 PM', activity: 'Dinner at Chokhi Dhani', cost: 1200 }
      ]
    },
    {
      day: 3,
      activities: [
        { time: '09:00 AM', activity: 'Visit Jantar Mantar', cost: 500 },
        { time: '12:00 PM', activity: 'Lunch at Suvarna Mahal', cost: 1000 },
        { time: '02:00 PM', activity: 'Explore Albert Hall Museum', cost: 500 },
        { time: '07:00 PM', activity: 'Farewell dinner', cost: 1000 }
      ]
    }
  ],
  2: [
    {
      day: 1,
      activities: [
        { time: '09:00 AM', activity: 'Visit City Palace', cost: 1500 },
        { time: '01:00 PM', activity: 'Lunch at Ambrai Restaurant', cost: 1000 },
        { time: '03:00 PM', activity: 'Boat ride on Lake Pichola', cost: 2000 },
        { time: '07:00 PM', activity: 'Dinner at Jagat Niwas', cost: 1500 }
      ]
    },
    {
      day: 2,
      activities: [
        { time: '10:00 AM', activity: 'Visit Jag Mandir', cost: 1000 },
        { time: '01:00 PM', activity: 'Lunch at Savage Garden', cost: 800 },
        { time: '03:00 PM', activity: 'Explore Bagore Ki Haveli', cost: 500 },
        { time: '08:00 PM', activity: 'Cultural show at Bagore Ki Haveli', cost: 1000 }
      ]
    },
    {
      day: 3,
      activities: [
        { time: '09:00 AM', activity: 'Visit Sajjangarh Palace', cost: 800 },
        { time: '12:00 PM', activity: 'Lunch at Upre Restaurant', cost: 1200 },
        { time: '02:00 PM', activity: 'Shopping at Hathi Pol Bazaar', cost: 1500 },
        { time: '07:00 PM', activity: 'Dinner cruise on Lake Pichola', cost: 2500 }
      ]
    },
    {
      day: 4,
      activities: [
        { time: '10:00 AM', activity: 'Visit Saheliyon Ki Bari', cost: 500 },
        { time: '01:00 PM', activity: 'Lunch at Tribute Restaurant', cost: 1000 },
        { time: '03:00 PM', activity: 'Explore Vintage Car Museum', cost: 400 },
        { time: '07:00 PM', activity: 'Farewell dinner at Raas Leela', cost: 1800 }
      ]
    }
  ],
  3: [
    {
      day: 1,
      activities: [
        { time: '10:00 AM', activity: 'Relax at Calangute Beach', cost: 0 },
        { time: '01:00 PM', activity: 'Seafood lunch at beachside shack', cost: 1200 },
        { time: '04:00 PM', activity: 'Water sports activities', cost: 2500 },
        { time: '08:00 PM', activity: 'Dinner and nightlife at Tito\'s Lane', cost: 2000 }
      ]
    },
    // More days for Goa...
  ],
  4: [
    {
      day: 1,
      activities: [
        { time: '09:00 AM', activity: 'Houseboat check-in at Alleppey', cost: 6000 },
        { time: '12:00 PM', activity: 'Traditional Kerala lunch on houseboat', cost: 800 },
        { time: '03:00 PM', activity: 'Cruise through backwaters', cost: 0 },
        { time: '07:00 PM', activity: 'Dinner on houseboat and overnight stay', cost: 1000 }
      ]
    },
    // More days for Kerala...
  ]
};

const Home = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState<number>(20000);
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);

  const handleSearch = () => {
    const filtered = destinations.filter(dest => dest.budget <= budget && 
      (searchQuery === '' || dest.name.toLowerCase().includes(searchQuery.toLowerCase())));
    
    setFilteredDestinations(filtered);
    
    toast({
      title: filtered.length ? `Found ${filtered.length} destinations` : "No destinations found",
      description: filtered.length 
        ? `We found ${filtered.length} destinations within your budget of ₹${budget.toLocaleString()}`
        : "Try increasing your budget or changing your search term",
      duration: 3000,
    });
  };

  const handleViewItinerary = (destId: number) => {
    setSelectedDestination(destId);
    setShowItinerary(true);
    
    // Scroll to itinerary section
    setTimeout(() => {
      document.getElementById('itinerary-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const calculateTotalCost = (destId: number) => {
    if (!itineraries[destId as keyof typeof itineraries]) return 0;
    
    return itineraries[destId as keyof typeof itineraries].reduce((total, day) => {
      const dayCost = day.activities.reduce((sum, activity) => sum + activity.cost, 0);
      return total + dayCost;
    }, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-travel-dark to-travel-primary opacity-90">
          <div 
            className="absolute inset-0 z-0" 
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay'
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Travel Smart, Within Your Budget
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-slide-up">
              Discover amazing destinations that won't break your bank. Tell us your budget, and we'll handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                className="bg-white text-travel-primary hover:bg-gray-100 w-full sm:w-auto"
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Plan Your Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                asChild
              >
                <Link to="/destinations">
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-16 bg-travel-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 -mt-24 relative z-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Trip</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="destination" className="mb-2 block">Where to?</Label>
                  <div className="relative">
                    <Input 
                      id="destination" 
                      placeholder="Search destinations" 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dates" className="mb-2 block">When?</Label>
                  <div className="flex space-x-2">
                    <div className="w-1/2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="startDate"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "MMM dd, yyyy") : <span>Start date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="w-1/2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="endDate"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "MMM dd, yyyy") : <span>End date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => startDate ? date < startDate : false}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="travelers" className="mb-2 block">Who?</Label>
                  <div className="relative">
                    <Input id="travelers" placeholder="Number of travelers" className="pl-10" />
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Label htmlFor="budget-slider">Your Budget: ₹{budget.toLocaleString()}</Label>
                  <span className="text-sm text-gray-500">Max: ₹50,000</span>
                </div>
                <Slider
                  id="budget-slider"
                  defaultValue={[budget]}
                  max={50000}
                  min={5000}
                  step={1000}
                  onValueChange={(value) => setBudget(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹5,000</span>
                  <span>₹50,000</span>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-travel-primary hover:bg-travel-dark"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Recommendations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recommended Destinations</h2>
          
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-travel-secondary" />
                      {destination.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{destination.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>₹{destination.budget.toLocaleString()}</span>
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {destination.rating} ({Math.floor(Math.random() * 500) + 100} reviews)
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2">
                    <Button 
                      className="bg-travel-primary hover:bg-travel-dark"
                      asChild
                    >
                      <Link to={`/destinations/${destination.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleViewItinerary(destination.id)}
                    >
                      View Itinerary
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500 mb-4">No destinations found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setBudget(50000);
                  setSearchQuery('');
                  setFilteredDestinations(destinations);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Itinerary Section */}
      {showItinerary && selectedDestination && (
        <section id="itinerary-section" className="py-16 bg-travel-light">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                  Your Trip to {destinations.find(d => d.id === selectedDestination)?.name}
                </h2>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {startDate && endDate ? (
                      <>
                        {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                      </>
                    ) : (
                      "Select dates to plan your trip"
                    )}
                  </p>
                  <p className="text-lg font-bold text-travel-primary">
                    Total Cost: ₹{calculateTotalCost(selectedDestination).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {itineraries[selectedDestination as keyof typeof itineraries]?.map((day) => (
                  <div key={day.day} className="border-l-4 border-travel-primary pl-4">
                    <h3 className="text-xl font-bold mb-4">Day {day.day}</h3>
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex bg-gray-50 p-4 rounded-md">
                          <div className="w-1/4 text-travel-secondary font-medium flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {activity.time}
                          </div>
                          <div className="w-1/2 font-medium">{activity.activity}</div>
                          <div className="w-1/4 text-right">₹{activity.cost.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button 
                  className="bg-travel-primary hover:bg-travel-dark"
                  onClick={() => {
                    toast({
                      title: "Trip booked!",
                      description: "Your trip has been booked. Check your email for confirmation.",
                      duration: 3000,
                    });
                  }}
                >
                  Book This Trip
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-travel-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Travel With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-travel-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Budget-Friendly Trips</h3>
              <p className="text-gray-600">Find the best destinations that match your budget without compromising on experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="h-8 w-8 text-travel-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Accommodations</h3>
              <p className="text-gray-600">Handpicked hotels and stays that provide comfort and value for your money.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-travel-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Travel Assistant</h3>
              <p className="text-gray-600">Get personalized recommendations and packing lists from our intelligent AI assistant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-travel-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our AI-powered tools help you plan the perfect trip within your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-travel-secondary hover:bg-gray-100"
              asChild
            >
              <Link to="/packing-assistant">
                Try Packing Assistant
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/chat">
                Chat with Local Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
