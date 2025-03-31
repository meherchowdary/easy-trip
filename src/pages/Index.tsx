import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Hotel, MapPin, Calendar, Globe, Search, ArrowRight, Clock, Bus, Train, Car } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

// Mock attractions data
const attractions = {
  1: [
    { name: 'Amber Fort', description: 'Magnificent fort with stunning architecture', cost: 1000, rating: 4.8, image: 'https://images.unsplash.com/photo-1586164383881-d1a398df7c0c?q=80&w=500&auto=format&fit=crop' },
    { name: 'Hawa Mahal', description: 'Palace of winds with unique facade', cost: 500, rating: 4.6, image: 'https://images.unsplash.com/photo-1598803852362-dc1f17a0dcc9?q=80&w=500&auto=format&fit=crop' },
    { name: 'City Palace', description: 'Royal residence with museums', cost: 1000, rating: 4.5, image: 'https://images.unsplash.com/photo-1572451479139-6a308211d8be?q=80&w=500&auto=format&fit=crop' },
    { name: 'Jantar Mantar', description: 'Astronomical observation site', cost: 500, rating: 4.4, image: 'https://images.unsplash.com/photo-1576450297258-33a3e1d1ac89?q=80&w=500&auto=format&fit=crop' }
  ],
  2: [
    { name: 'City Palace', description: 'Magnificent royal complex on Lake Pichola', cost: 1000, rating: 4.8, image: 'https://images.unsplash.com/photo-1624563425462-d87c1690e5e5?q=80&w=500&auto=format&fit=crop' },
    { name: 'Lake Pichola', description: 'Artificial freshwater lake with boat rides', cost: 1500, rating: 4.7, image: 'https://images.unsplash.com/photo-1588292566686-ad5ee9ba4ed8?q=80&w=500&auto=format&fit=crop' },
    { name: 'Jagdish Temple', description: 'Indo-Aryan style Hindu temple', cost: 0, rating: 4.5, image: 'https://images.unsplash.com/photo-1604341752011-7e513041c63a?q=80&w=500&auto=format&fit=crop' },
    { name: 'Bagore Ki Haveli', description: 'Ancient haveli with cultural shows', cost: 800, rating: 4.3, image: 'https://images.unsplash.com/photo-1627301517082-7cafc4f1e61f?q=80&w=500&auto=format&fit=crop' }
  ],
  3: [
    { name: 'Calangute Beach', description: 'Popular beach with water sports', cost: 0, rating: 4.5, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=500&auto=format&fit=crop' },
    { name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage Site', cost: 0, rating: 4.7, image: 'https://images.unsplash.com/photo-1626197031507-c17099753f20?q=80&w=500&auto=format&fit=crop' },
    { name: 'Fort Aguada', description: 'Well-preserved 17th-century Portuguese fort', cost: 500, rating: 4.4, image: 'https://images.unsplash.com/photo-1586437410056-ffefbffe842d?q=80&w=500&auto=format&fit=crop' },
    { name: 'Dudhsagar Falls', description: 'Four-tiered waterfall and trekking spot', cost: 2000, rating: 4.8, image: 'https://images.unsplash.com/photo-1624628842237-dbc3289c0d2e?q=80&w=500&auto=format&fit=crop' }
  ],
  4: [
    { name: 'Alleppey Backwaters', description: 'Serene backwaters with houseboat cruises', cost: 6000, rating: 4.9, image: 'https://images.unsplash.com/photo-1602158123364-bdc73653ece4?q=80&w=500&auto=format&fit=crop' },
    { name: 'Munnar Tea Gardens', description: 'Lush tea plantations in the Western Ghats', cost: 500, rating: 4.7, image: 'https://images.unsplash.com/photo-1595815771614-ade501d22bf3?q=80&w=500&auto=format&fit=crop' },
    { name: 'Fort Kochi', description: 'Historic area with colonial architecture', cost: 0, rating: 4.5, image: 'https://images.unsplash.com/photo-1582651957996-a3fa71d27f0d?q=80&w=500&auto=format&fit=crop' },
    { name: 'Periyar Wildlife Sanctuary', description: 'Wildlife reserve with boat safaris', cost: 1500, rating: 4.6, image: 'https://images.unsplash.com/photo-1576020325922-91cfbcafb6c7?q=80&w=500&auto=format&fit=crop' }
  ]
};

// Mock hotels data
const hotels = {
  1: [
    { name: 'Hotel Jaipur Palace', description: 'Elegant hotel with rooftop pool', cost: 3500, rating: 4.5, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop' },
    { name: 'Trident Jaipur', description: 'Luxury hotel with lake views', cost: 8000, rating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop' },
    { name: 'Zostel Jaipur', description: 'Backpacker hostel with social atmosphere', cost: 1000, rating: 4.3, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop' },
    { name: 'Jai Mahal Palace', description: 'Heritage palace hotel with gardens', cost: 12000, rating: 4.9, image: 'https://images.unsplash.com/photo-1556715371-bdb0d523c870?q=80&w=500&auto=format&fit=crop' }
  ],
  2: [
    { name: 'Taj Lake Palace', description: 'Luxury hotel on Lake Pichola', cost: 25000, rating: 4.9, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=500&auto=format&fit=crop' },
    { name: 'Hotel Lakend', description: 'Modern hotel with lake views', cost: 7000, rating: 4.6, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop' },
    { name: 'Zostel Udaipur', description: 'Backpacker hostel with rooftop views', cost: 1200, rating: 4.4, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop' },
    { name: 'Leela Palace Udaipur', description: 'Opulent palace hotel with lake views', cost: 30000, rating: 4.9, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop' }
  ],
  3: [
    { name: 'Resort Rio', description: 'Luxury resort with multiple pools', cost: 12000, rating: 4.7, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop' },
    { name: 'Zostel Goa', description: 'Beach hostel with social vibe', cost: 1500, rating: 4.5, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop' },
    { name: 'Taj Fort Aguada', description: 'Beachfront heritage hotel', cost: 18000, rating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop' },
    { name: 'Palolem Beach Resort', description: 'Beachfront cottages on Palolem', cost: 5000, rating: 4.4, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop' }
  ],
  4: [
    { name: 'Kumarakom Lake Resort', description: 'Luxury resort on backwaters', cost: 15000, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop' },
    { name: 'Zostel Munnar', description: 'Mountain hostel with views', cost: 1200, rating: 4.4, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop' },
    { name: 'The Zuri Kumarakom', description: 'Spa resort with lake views', cost: 18000, rating: 4.7, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop' },
    { name: 'Vythiri Resort', description: 'Rainforest treehouse resort', cost: 22000, rating: 4.9, image: 'https://images.unsplash.com/photo-1618780179533-870736eaea58?q=80&w=500&auto=format&fit=crop' }
  ]
};

// Mock transportation data
const transportation = {
  1: [
    { type: 'bus', name: 'Volvo AC Sleeper', from: 'Delhi', duration: '6 hours', cost: 800, departureTime: '10:00 PM', arrivalTime: '04:00 AM' },
    { type: 'train', name: 'Shatabdi Express', from: 'Delhi', duration: '4.5 hours', cost: 1200, departureTime: '06:00 AM', arrivalTime: '10:30 AM' },
    { type: 'bus', name: 'RSRTC Non-AC', from: 'Delhi', duration: '7 hours', cost: 500, departureTime: '09:00 PM', arrivalTime: '04:00 AM' },
    { type: 'train', name: 'Jaipur Express', from: 'Delhi', duration: '5 hours', cost: 900, departureTime: '11:00 PM', arrivalTime: '04:00 AM' }
  ],
  2: [
    { type: 'bus', name: 'Volvo AC Sleeper', from: 'Delhi', duration: '12 hours', cost: 1500, departureTime: '07:00 PM', arrivalTime: '07:00 AM' },
    { type: 'train', name: 'Mewar Express', from: 'Delhi', duration: '10 hours', cost: 1800, departureTime: '08:00 PM', arrivalTime: '06:00 AM' },
    { type: 'bus', name: 'GSRTC Semi-Sleeper', from: 'Delhi', duration: '14 hours', cost: 1200, departureTime: '06:00 PM', arrivalTime: '08:00 AM' },
    { type: 'train', name: 'Udaipur Express', from: 'Delhi', duration: '11 hours', cost: 1500, departureTime: '09:00 PM', arrivalTime: '08:00 AM' }
  ],
  3: [
    { type: 'bus', name: 'Volvo AC Sleeper', from: 'Mumbai', duration: '10 hours', cost: 1200, departureTime: '08:00 PM', arrivalTime: '06:00 AM' },
    { type: 'train', name: 'Goa Express', from: 'Mumbai', duration: '8 hours', cost: 1500, departureTime: '11:00 PM', arrivalTime: '07:00 AM' },
    { type: 'bus', name: 'MSRTC AC Shivneri', from: 'Mumbai', duration: '11 hours', cost: 1000, departureTime: '07:00 PM', arrivalTime: '06:00 AM' },
    { type: 'train', name: 'Jan Shatabdi', from: 'Mumbai', duration: '9 hours', cost: 1300, departureTime: '06:00 AM', arrivalTime: '03:00 PM' }
  ],
  4: [
    { type: 'bus', name: 'Volvo AC Sleeper', from: 'Bangalore', duration: '8 hours', cost: 1000, departureTime: '09:00 PM', arrivalTime: '05:00 AM' },
    { type: 'train', name: 'Island Express', from: 'Chennai', duration: '12 hours', cost: 900, departureTime: '07:00 PM', arrivalTime: '07:00 AM' },
    { type: 'bus', name: 'KSRTC Super Deluxe', from: 'Bangalore', duration: '9 hours', cost: 800, departureTime: '08:00 PM', arrivalTime: '05:00 AM' },
    { type: 'train', name: 'Kerala Express', from: 'Delhi', duration: '36 hours', cost: 2500, departureTime: '11:00 AM', arrivalTime: '11:00 PM (next day)' }
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
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [detailsTab, setDetailsTab] = useState("attractions");

  const handleSearch = () => {
    const filtered = destinations.filter(dest => dest.budget <= budget && 
      (searchQuery === '' || dest.name.toLowerCase().includes(searchQuery.toLowerCase())));
    
    setFilteredDestinations(filtered);
    setShowTripDetails(filtered.length > 0);
    
    if (filtered.length > 0) {
      setSelectedDestination(filtered[0].id);
      setShowItinerary(true);
      
      // Scroll to trip details section
      setTimeout(() => {
        document.getElementById('trip-details-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      toast({
        title: `Found ${filtered.length} destinations`,
        description: `We found ${filtered.length} destinations within your budget of ₹${budget.toLocaleString()}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "No destinations found",
        description: "Try increasing your budget or changing your search term",
        duration: 3000,
      });
    }
  };

  const handleViewItinerary = (destId: number) => {
    setSelectedDestination(destId);
    setShowItinerary(true);
    setShowTripDetails(true);
    
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
                  <Label htmlFor="budget-slider">Your Budget: ₹{budget
