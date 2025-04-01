
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Hotel, Clock, Bus, Train, Car, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { differenceInDays } from 'date-fns';

// Mock data from Index.tsx
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
    }
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
    }
  ]
};

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

interface SearchParams {
  searchQuery: string;
  budget: number;
  startDate: string | null;
  endDate: string | null;
  travelers: string;
}

const TripResults = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state as SearchParams || null;
  
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [detailsTab, setDetailsTab] = useState("attractions");
  const [requiredDays, setRequiredDays] = useState<number>(0);
  const [filteredHotels, setFilteredHotels] = useState<any>({});
  const [filteredTransportation, setFilteredTransportation] = useState<any>({});
  const [filteredItineraries, setFilteredItineraries] = useState<any>({});

  useEffect(() => {
    if (!searchParams) {
      toast({
        title: "No search parameters",
        description: "Please go back to the home page and search again",
        duration: 3000,
      });
      return;
    }

    // Calculate days if dates are provided
    if (searchParams.startDate && searchParams.endDate) {
      const startDate = new Date(searchParams.startDate);
      const endDate = new Date(searchParams.endDate);
      const days = differenceInDays(endDate, startDate) + 1;
      setRequiredDays(days > 0 ? days : 0);
    }

    // Filter destinations based on search parameters
    const filtered = destinations.filter(dest => {
      const matchesBudget = dest.budget <= searchParams.budget;
      const matchesSearch = searchParams.searchQuery === '' || 
        dest.name.toLowerCase().includes(searchParams.searchQuery.toLowerCase());
      
      let matchesDays = true;
      if (requiredDays > 0) {
        const destinationDays = parseInt(dest.duration.split(' ')[0], 10);
        matchesDays = destinationDays <= requiredDays;
      }
      
      return matchesBudget && matchesSearch && matchesDays;
    });
    
    setFilteredDestinations(filtered);
    
    if (filtered.length > 0) {
      setSelectedDestination(filtered[0].id);
      
      // Filter hotels by budget and days
      const hotelsByBudget: Record<number, any[]> = {};
      Object.entries(hotels).forEach(([destId, hotelList]) => {
        const destIdNum = parseInt(destId, 10);
        if (filtered.some(d => d.id === destIdNum)) {
          hotelsByBudget[destIdNum] = (hotelList as any[]).filter(
            hotel => hotel.cost * (requiredDays || 1) <= searchParams.budget
          );
        }
      });
      setFilteredHotels(hotelsByBudget);
      
      // Filter transportation by budget
      const transportByBudget: Record<number, any[]> = {};
      Object.entries(transportation).forEach(([destId, transportList]) => {
        const destIdNum = parseInt(destId, 10);
        if (filtered.some(d => d.id === destIdNum)) {
          transportByBudget[destIdNum] = (transportList as any[]).filter(
            transport => transport.cost <= searchParams.budget
          );
        }
      });
      setFilteredTransportation(transportByBudget);
      
      // Filter itineraries by days
      const itinerariesByDays: Record<number, any[]> = {};
      Object.entries(itineraries).forEach(([destId, daysList]) => {
        const destIdNum = parseInt(destId, 10);
        if (filtered.some(d => d.id === destIdNum)) {
          if (requiredDays > 0) {
            itinerariesByDays[destIdNum] = (daysList as any[]).slice(0, requiredDays);
          } else {
            itinerariesByDays[destIdNum] = daysList;
          }
        }
      });
      setFilteredItineraries(itinerariesByDays);
      
      toast({
        title: `Found ${filtered.length} destinations`,
        description: `We found ${filtered.length} destinations within your budget of ₹${searchParams.budget.toLocaleString()}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "No destinations found",
        description: "Try increasing your budget or changing your search term",
        duration: 3000,
      });
    }
  }, [searchParams, requiredDays, toast]);

  const handleSelectDestination = (destId: number) => {
    setSelectedDestination(destId);
  };

  const calculateTotalCost = (destId: number) => {
    if (!filteredItineraries[destId]) return 0;
    
    return filteredItineraries[destId].reduce((total: number, day: any) => {
      const dayCost = day.activities.reduce((sum: number, activity: any) => sum + activity.cost, 0);
      return total + dayCost;
    }, 0);
  };

  const renderHotelsTab = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Hotels in {destinations.find(d => d.id === selectedDestination)?.name}</h3>
        
        {selectedDestination && filteredHotels[selectedDestination] && filteredHotels[selectedDestination].length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHotels[selectedDestination].map((hotel: any, index: number) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium mr-1">{hotel.rating}</span>
                    <span className="text-yellow-500">★</span>
                    <span className="mx-2">•</span>
                    <span>Per night: ₹{hotel.cost.toLocaleString()}</span>
                    {requiredDays > 0 && (
                      <span className="ml-2">• Total: ₹{(hotel.cost * requiredDays).toLocaleString()}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-600">{hotel.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No hotels found within your budget range.</p>
          </div>
        )}
      </div>
    );
  };

  const renderTransportationTab = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Transportation to {destinations.find(d => d.id === selectedDestination)?.name}</h3>
        
        {selectedDestination && filteredTransportation[selectedDestination] && filteredTransportation[selectedDestination].length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mode</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransportation[selectedDestination].map((transport: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {transport.type === 'bus' && <Bus className="mr-2 h-4 w-4" />}
                      {transport.type === 'train' && <Train className="mr-2 h-4 w-4" />}
                      {transport.type === 'car' && <Car className="mr-2 h-4 w-4" />}
                      {transport.name}
                    </div>
                  </TableCell>
                  <TableCell>{transport.from}</TableCell>
                  <TableCell>{transport.duration}</TableCell>
                  <TableCell>{transport.departureTime}</TableCell>
                  <TableCell>{transport.arrivalTime}</TableCell>
                  <TableCell>₹{transport.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No transportation options found within your budget range.</p>
          </div>
        )}
      </div>
    );
  };

  const renderItineraryTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">
            Daily Itinerary for {destinations.find(d => d.id === selectedDestination)?.name}
          </h3>
          <div className="text-right">
            {requiredDays > 0 && (
              <p className="text-sm text-gray-500">Duration: {requiredDays} days</p>
            )}
            <p className="font-bold">Total Cost: ₹{selectedDestination ? calculateTotalCost(selectedDestination).toLocaleString() : 0}</p>
          </div>
        </div>
        
        {selectedDestination && filteredItineraries[selectedDestination] && filteredItineraries[selectedDestination].length > 0 ? (
          <div className="space-y-6">
            {filteredItineraries[selectedDestination].map((day: any) => (
              <Card key={day.day} className="overflow-hidden">
                <CardHeader className="bg-travel-light p-4">
                  <CardTitle className="text-lg">Day {day.day}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">Time</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead className="text-right w-24">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {day.activities.map((activity: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{activity.time}</TableCell>
                          <TableCell>{activity.activity}</TableCell>
                          <TableCell className="text-right">₹{activity.cost.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2} className="text-right font-bold">
                          Day Total:
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          ₹{day.activities.reduce((sum: number, activity: any) => sum + activity.cost, 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No itinerary available for the selected duration.</p>
          </div>
        )}
      </div>
    );
  };

  const renderAttractionsTab = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Top Attractions in {destinations.find(d => d.id === selectedDestination)?.name}</h3>
        
        {selectedDestination && attractions[selectedDestination as keyof typeof attractions] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attractions[selectedDestination as keyof typeof attractions].map((attraction, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">{attraction.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium mr-1">{attraction.rating}</span>
                    <span className="text-yellow-500">★</span>
                    <span className="mx-2">•</span>
                    <span>Entry: ₹{attraction.cost.toLocaleString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-600">{attraction.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (filteredDestinations.length === 0) {
    return (
      <div className="min-h-screen py-16 container mx-auto px-4">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">No Destinations Found</h1>
          <p className="text-gray-600 mb-8">
            No destinations match your search criteria. Try adjusting your budget or search terms.
          </p>
          <Button onClick={() => navigate('/')}>Go Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Trip Results</h1>
            {searchParams && (
              <div className="text-gray-600">
                <p>Budget: ₹{searchParams.budget.toLocaleString()}</p>
                {requiredDays > 0 && <p>Duration: {requiredDays} days</p>}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                <h2 className="text-xl font-bold mb-4">Matching Destinations</h2>
                <div className="space-y-4">
                  {filteredDestinations.map((destination) => (
                    <Card 
                      key={destination.id} 
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedDestination === destination.id ? 'ring-2 ring-travel-primary' : ''
                      }`}
                      onClick={() => handleSelectDestination(destination.id)}
                    >
                      <div className="flex items-center p-4">
                        <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                          <img 
                            src={destination.image} 
                            alt={destination.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{destination.name}</h3>
                          <div className="flex text-sm text-gray-500">
                            <div className="flex items-center mr-3">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{destination.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">₹{destination.budget.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {selectedDestination && (
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{destinations.find(d => d.id === selectedDestination)?.name}</h2>
                    <p className="text-gray-600">{destinations.find(d => d.id === selectedDestination)?.description}</p>
                  </div>
                  
                  <Tabs value={detailsTab} onValueChange={setDetailsTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-4">
                      <TabsTrigger value="attractions">
                        <MapPin className="mr-2 h-4 w-4" />
                        Attractions
                      </TabsTrigger>
                      <TabsTrigger value="hotels">
                        <Hotel className="mr-2 h-4 w-4" />
                        Hotels
                      </TabsTrigger>
                      <TabsTrigger value="transportation">
                        <Bus className="mr-2 h-4 w-4" />
                        Transportation
                      </TabsTrigger>
                      <TabsTrigger value="itinerary">
                        <Calendar className="mr-2 h-4 w-4" />
                        Itinerary
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="p-4 bg-white rounded-lg mt-4">
                      <TabsContent value="attractions">
                        {renderAttractionsTab()}
                      </TabsContent>
                      
                      <TabsContent value="hotels">
                        {renderHotelsTab()}
                      </TabsContent>
                      
                      <TabsContent value="transportation">
                        {renderTransportationTab()}
                      </TabsContent>
                      
                      <TabsContent value="itinerary">
                        {renderItineraryTab()}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;
