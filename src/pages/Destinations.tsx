
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Hotel, Utensils, Search, SlidersHorizontal } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock data
const destinations = [
  {
    id: 1,
    name: 'Jaipur',
    description: 'The Pink City with majestic palaces and rich culture',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=500&auto=format&fit=crop',
    budget: 15000,
    duration: '3 days',
    rating: 4.7,
    category: 'cultural'
  },
  {
    id: 2,
    name: 'Udaipur',
    description: 'City of Lakes with stunning palaces and serene waters',
    image: 'https://images.unsplash.com/photo-1602517807959-3a3a71f74349?q=80&w=500&auto=format&fit=crop',
    budget: 20000,
    duration: '4 days',
    rating: 4.9,
    category: 'cultural'
  },
  {
    id: 3,
    name: 'Goa',
    description: 'Beach paradise with vibrant nightlife and relaxing shores',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=500&auto=format&fit=crop',
    budget: 25000,
    duration: '5 days',
    rating: 4.5,
    category: 'beach'
  },
  {
    id: 4,
    name: 'Kerala',
    description: 'God\'s Own Country with lush backwaters and scenic beauty',
    image: 'https://images.unsplash.com/photo-1602158123364-bdc73653ece4?q=80&w=500&auto=format&fit=crop',
    budget: 30000,
    duration: '6 days',
    rating: 4.8,
    category: 'nature'
  },
  {
    id: 5,
    name: 'Manali',
    description: 'Mountain retreat with snow-capped peaks and adventure sports',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=500&auto=format&fit=crop',
    budget: 22000,
    duration: '5 days',
    rating: 4.6,
    category: 'mountain'
  },
  {
    id: 6,
    name: 'Andaman Islands',
    description: 'Pristine beaches and crystal clear waters for the perfect getaway',
    image: 'https://images.unsplash.com/photo-1586640931889-dcc3baac6814?q=80&w=500&auto=format&fit=crop',
    budget: 35000,
    duration: '7 days',
    rating: 4.9,
    category: 'beach'
  },
  {
    id: 7,
    name: 'Darjeeling',
    description: 'Tea plantations and colonial charm with Himalayan views',
    image: 'https://images.unsplash.com/photo-1544914379-806667cd9489?q=80&w=500&auto=format&fit=crop',
    budget: 18000,
    duration: '4 days',
    rating: 4.5,
    category: 'mountain'
  },
  {
    id: 8,
    name: 'Varanasi',
    description: 'Ancient spiritual city on the banks of the sacred Ganges',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecde1109?q=80&w=500&auto=format&fit=crop',
    budget: 12000,
    duration: '3 days',
    rating: 4.3,
    category: 'cultural'
  }
];

const Destinations = () => {
  const [budget, setBudget] = useState<number>(50000);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredDestinations = destinations.filter(dest => {
    const matchesBudget = dest.budget <= budget;
    const matchesSearch = searchQuery === '' || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || dest.category === activeCategory;
    
    return matchesBudget && matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover amazing places to visit that match your budget and preferences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search destinations" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-fade-in">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <Label htmlFor="budget-filter">Maximum Budget: ₹{budget.toLocaleString()}</Label>
                </div>
                <Slider
                  id="budget-filter"
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
            </div>
          )}
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beach">Beaches</TabsTrigger>
              <TabsTrigger value="mountain">Mountains</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <DestinationGrid destinations={filteredDestinations} />
            </TabsContent>
            <TabsContent value="beach" className="mt-0">
              <DestinationGrid destinations={filteredDestinations} />
            </TabsContent>
            <TabsContent value="mountain" className="mt-0">
              <DestinationGrid destinations={filteredDestinations} />
            </TabsContent>
            <TabsContent value="cultural" className="mt-0">
              <DestinationGrid destinations={filteredDestinations} />
            </TabsContent>
            <TabsContent value="nature" className="mt-0">
              <DestinationGrid destinations={filteredDestinations} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const DestinationGrid = ({ destinations }: { destinations: any[] }) => {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500 mb-4">No destinations found matching your criteria.</p>
        <Button variant="outline">Reset Filters</Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-t-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=500&auto=format&fit=crop";
                }}
              />
              <div className="absolute top-2 right-2 bg-white/90 text-travel-primary text-sm font-medium py-1 px-2 rounded">
                ₹{destination.budget.toLocaleString()}
              </div>
            </AspectRatio>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-travel-secondary" />
              {destination.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">{destination.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pb-2">
            <div className="flex items-center text-sm text-gray-600">
              <Hotel className="w-4 h-4 mr-2 text-gray-400" />
              <span>4-star accommodations</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Utensils className="w-4 h-4 mr-2 text-gray-400" />
              <span>Local cuisine experiences</span>
            </div>
            <div className="flex items-center mt-2">
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
          <CardFooter>
            <Button 
              className="w-full bg-travel-primary hover:bg-travel-dark"
              asChild
            >
              <Link to={`/destinations/${destination.id}`}>
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Destinations;
