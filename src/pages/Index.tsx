
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Hotel, MapPin, Calendar, Globe, Search, ArrowRight, Clock, Bus, Train, Car } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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

const Home = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number>(20000);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState('');
  const [requiredDays, setRequiredDays] = useState<number>(0);

  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate) + 1;
      setRequiredDays(days > 0 ? days : 0);
    } else {
      setRequiredDays(0);
    }
  }, [startDate, endDate]);

  const handleSearch = () => {
    // Navigate to the trip results page with search parameters
    navigate('/trip-results', {
      state: {
        searchQuery,
        budget,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        travelers
      }
    });

    toast({
      title: "Searching for trips",
      description: `Looking for destinations matching your criteria`,
      duration: 3000,
    });
  };

  const handleViewItinerary = (destId: number) => {
    navigate(`/destinations/${destId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
                    <Input 
                      id="travelers" 
                      placeholder="Number of travelers" 
                      className="pl-10"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                    />
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Label htmlFor="budget-slider">Your Budget: ₹{budget.toLocaleString()}</Label>
                  <span className="text-sm text-gray-500">₹5,000 - ₹50,000</span>
                </div>
                <Slider
                  id="budget-slider"
                  min={5000}
                  max={50000}
                  step={1000}
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                  className="w-full"
                />
              </div>
              
              <Button 
                className="w-full bg-travel-primary hover:bg-travel-primary/90"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Trips
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Budget-Friendly Destinations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xl">{destination.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{destination.duration}</span>
                    <span className="mx-2">•</span>
                    <span>₹{destination.budget.toLocaleString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-600 mb-2">{destination.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewItinerary(destination.id)}
                  >
                    View Itinerary
                  </Button>
                  <div className="flex items-center">
                    <span className="font-medium mr-1 text-travel-primary">{destination.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-travel-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your budget-friendly trip today and create memories that last a lifetime.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-travel-primary hover:bg-gray-100"
            onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Plan Your Trip Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
