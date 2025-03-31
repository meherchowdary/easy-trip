
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Compass, Sun, CloudRain, Shirt, PanelRight, Check, Calendar } from 'lucide-react';

// Mock destination weather data
const destinationWeather = {
  'Jaipur': { climate: 'hot', season: 'summer', temp: '30-40°C' },
  'Udaipur': { climate: 'hot', season: 'summer', temp: '25-35°C' },
  'Goa': { climate: 'humid', season: 'monsoon', temp: '25-30°C' },
  'Kerala': { climate: 'tropical', season: 'rainy', temp: '25-32°C' },
  'Manali': { climate: 'cold', season: 'winter', temp: '0-10°C' },
  'Darjeeling': { climate: 'cool', season: 'autumn', temp: '10-20°C' },
  'Andaman': { climate: 'tropical', season: 'humid', temp: '25-30°C' },
  'Varanasi': { climate: 'warm', season: 'summer', temp: '25-35°C' },
};

// Packing items by climate
const packingItems = {
  essentials: [
    { id: 'e1', name: 'Passport/ID', category: 'Documents' },
    { id: 'e2', name: 'Cash & Cards', category: 'Documents' },
    { id: 'e3', name: 'Travel Insurance', category: 'Documents' },
    { id: 'e4', name: 'Phone & Charger', category: 'Electronics' },
    { id: 'e5', name: 'Medications', category: 'Health' },
    { id: 'e6', name: 'Toothbrush & Paste', category: 'Toiletries' },
    { id: 'e7', name: 'Deodorant', category: 'Toiletries' },
    { id: 'e8', name: 'Shampoo & Conditioner', category: 'Toiletries' },
  ],
  hot: [
    { id: 't1', name: 'T-shirts (5)', category: 'Clothing' },
    { id: 't2', name: 'Shorts (3)', category: 'Clothing' },
    { id: 't3', name: 'Sunglasses', category: 'Accessories' },
    { id: 't4', name: 'Sunscreen', category: 'Toiletries' },
    { id: 't5', name: 'Hat', category: 'Accessories' },
    { id: 't6', name: 'Sandals', category: 'Footwear' },
    { id: 't7', name: 'Light sleepwear', category: 'Clothing' },
    { id: 't8', name: 'Water bottle', category: 'Accessories' },
  ],
  cold: [
    { id: 'c1', name: 'Warm jacket', category: 'Clothing' },
    { id: 'c2', name: 'Sweaters (3)', category: 'Clothing' },
    { id: 'c3', name: 'Thermal underwear', category: 'Clothing' },
    { id: 'c4', name: 'Gloves', category: 'Accessories' },
    { id: 'c5', name: 'Scarf', category: 'Accessories' },
    { id: 'c6', name: 'Winter hat', category: 'Accessories' },
    { id: 'c7', name: 'Warm socks (4 pairs)', category: 'Clothing' },
    { id: 'c8', name: 'Boots', category: 'Footwear' },
  ],
  rainy: [
    { id: 'r1', name: 'Rain jacket', category: 'Clothing' },
    { id: 'r2', name: 'Umbrella', category: 'Accessories' },
    { id: 'r3', name: 'Waterproof bag cover', category: 'Accessories' },
    { id: 'r4', name: 'Quick-dry clothes (3)', category: 'Clothing' },
    { id: 'r5', name: 'Waterproof phone case', category: 'Electronics' },
    { id: 'r6', name: 'Waterproof shoes', category: 'Footwear' },
    { id: 'r7', name: 'Extra socks (4 pairs)', category: 'Clothing' },
  ],
  humid: [
    { id: 'h1', name: 'Light cotton clothes (5)', category: 'Clothing' },
    { id: 'h2', name: 'Breathable underwear (5)', category: 'Clothing' },
    { id: 'h3', name: 'Anti-frizz hair product', category: 'Toiletries' },
    { id: 'h4', name: 'Face wipes', category: 'Toiletries' },
    { id: 'h5', name: 'Talcum powder', category: 'Toiletries' },
    { id: 'h6', name: 'Mosquito repellent', category: 'Health' },
  ],
};

const PackingAssistant = () => {
  const { toast } = useToast();
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [packingList, setPackingList] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  
  const generatePackingList = () => {
    if (!destination || !duration) {
      toast({
        title: "Missing information",
        description: "Please select both destination and trip duration",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const destinationData = destinationWeather[destination as keyof typeof destinationWeather];
      const climate = destinationData?.climate || 'hot';
      
      // Get essentials and climate-specific items
      let items = [...packingItems.essentials];
      
      // Add climate-specific items
      if (climate === 'hot' || climate === 'warm') {
        items = [...items, ...packingItems.hot];
      } else if (climate === 'cold' || climate === 'cool') {
        items = [...items, ...packingItems.cold];
      } else if (climate === 'rainy') {
        items = [...items, ...packingItems.rainy];
      } else if (climate === 'humid' || climate === 'tropical') {
        items = [...items, ...packingItems.humid];
      }
      
      // Initialize all items as unchecked
      const initialCheckedState: { [key: string]: boolean } = {};
      items.forEach(item => {
        initialCheckedState[item.id] = false;
      });
      
      setPackingList(items);
      setCheckedItems(initialCheckedState);
      setIsGenerating(false);
      
      toast({
        title: "Packing list generated!",
        description: `We've created a personalized packing list for your ${duration} trip to ${destination}.`,
      });
    }, 1500);
  };
  
  const handleCheckItem = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }));
  };
  
  const getProgress = () => {
    if (packingList.length === 0) return 0;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / packingList.length) * 100);
  };
  
  const getProgressColor = () => {
    const progress = getProgress();
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-orange-500';
    if (progress < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const groupedPackingItems = packingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof packingList>);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Packing Assistant</h1>
            <p className="text-lg text-gray-600">
              Never forget essential items again! Get a personalized packing list based on your destination and trip duration.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Tell us about your trip</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label htmlFor="destination" className="mb-2 block">Where are you going?</Label>
                  <div className="relative">
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jaipur">Jaipur</SelectItem>
                        <SelectItem value="Udaipur">Udaipur</SelectItem>
                        <SelectItem value="Goa">Goa</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Manali">Manali</SelectItem>
                        <SelectItem value="Darjeeling">Darjeeling</SelectItem>
                        <SelectItem value="Andaman">Andaman Islands</SelectItem>
                        <SelectItem value="Varanasi">Varanasi</SelectItem>
                      </SelectContent>
                    </Select>
                    <Compass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration" className="mb-2 block">How long is your trip?</Label>
                  <div className="relative">
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekend">Weekend (1-2 days)</SelectItem>
                        <SelectItem value="short">Short trip (3-5 days)</SelectItem>
                        <SelectItem value="week">One week</SelectItem>
                        <SelectItem value="twoweeks">Two weeks</SelectItem>
                        <SelectItem value="month">One month or longer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-travel-primary hover:bg-travel-dark" 
                size="lg"
                onClick={generatePackingList}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Packing List"}
              </Button>
            </div>
            
            {destination && (
              <div className="bg-travel-light border-t border-travel-primary/20 p-6 md:p-8">
                <div className="flex items-center">
                  {destinationWeather[destination as keyof typeof destinationWeather]?.climate === 'hot' || 
                   destinationWeather[destination as keyof typeof destinationWeather]?.climate === 'warm' ? (
                    <Sun className="h-6 w-6 text-yellow-500 mr-3" />
                  ) : destinationWeather[destination as keyof typeof destinationWeather]?.climate === 'rainy' ? (
                    <CloudRain className="h-6 w-6 text-blue-500 mr-3" />
                  ) : (
                    <Shirt className="h-6 w-6 text-travel-primary mr-3" />
                  )}
                  <div>
                    <h3 className="font-medium">Weather in {destination}</h3>
                    <p className="text-sm text-gray-600">
                      {destinationWeather[destination as keyof typeof destinationWeather]?.temp} - {
                        destinationWeather[destination as keyof typeof destinationWeather]?.climate.charAt(0).toUpperCase() + 
                        destinationWeather[destination as keyof typeof destinationWeather]?.climate.slice(1)
                      } climate
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {packingList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Your Packing List</span>
                      <span className="text-sm font-normal text-gray-500">
                        {Object.values(checkedItems).filter(Boolean).length} of {packingList.length} packed
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Check off items as you pack them for your trip to {destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-2 bg-gray-200 rounded mb-6">
                      <div 
                        className={`h-2 rounded ${getProgressColor()}`} 
                        style={{ width: `${getProgress()}%` }}
                      />
                    </div>
                    
                    {Object.entries(groupedPackingItems).map(([category, items]) => (
                      <div key={category} className="mb-6">
                        <h3 className="font-medium text-gray-700 mb-3">{category}</h3>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={item.id} 
                                checked={checkedItems[item.id] || false}
                                onCheckedChange={(checked) => handleCheckItem(item.id, checked as boolean)}
                              />
                              <label
                                htmlFor={item.id}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                                  checkedItems[item.id] ? 'line-through text-gray-400' : ''
                                }`}
                              >
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const allChecked = Object.fromEntries(
                            Object.keys(checkedItems).map(key => [key, true])
                          );
                          setCheckedItems(allChecked);
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark all as packed
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PanelRight className="h-5 w-5 mr-2" />
                      Travel Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md bg-travel-light p-4">
                        <h4 className="font-medium mb-1">Pack for {destinationWeather[destination as keyof typeof destinationWeather]?.climate} weather</h4>
                        <p className="text-sm text-gray-600">
                          Expect temperatures around {destinationWeather[destination as keyof typeof destinationWeather]?.temp} in {destination}.
                        </p>
                      </div>
                      
                      <div className="rounded-md bg-orange-50 p-4">
                        <h4 className="font-medium mb-1">Local Customs</h4>
                        <p className="text-sm text-gray-600">
                          Consider modest clothing for temples and religious sites in {destination}.
                        </p>
                      </div>
                      
                      <div className="rounded-md bg-blue-50 p-4">
                        <h4 className="font-medium mb-1">Save Space</h4>
                        <p className="text-sm text-gray-600">
                          Roll clothes instead of folding to save space and reduce wrinkles.
                        </p>
                      </div>
                      
                      <div className="rounded-md bg-green-50 p-4">
                        <h4 className="font-medium mb-1">Travel Light</h4>
                        <p className="text-sm text-gray-600">
                          Pack multi-purpose items and plan to do laundry for longer trips.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackingAssistant;
