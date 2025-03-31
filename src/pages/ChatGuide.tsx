
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Send, User, Bot, Clock, Hotel, Utensils, MapPinned, Info } from 'lucide-react';

// Define the message interface
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock AI responses
const responses: { [key: string]: string } = {
  'hello': 'Hello! I\'m your local guide for Jaipur and Udaipur. How can I help you today?',
  'hi': 'Hello! I\'m your local guide for Jaipur and Udaipur. How can I help you today?',
  'hey': 'Hello! I\'m your local guide for Jaipur and Udaipur. How can I help you today?',
  
  'jaipur': 'Jaipur, the Pink City, is famous for its stunning architecture including the Hawa Mahal, City Palace, and Amber Fort. The city offers a rich blend of history, culture, and shopping experiences.',
  
  'udaipur': 'Udaipur, the City of Lakes, is known for its picturesque lakes, royal residences like the City Palace, and romantic ambiance. It\'s often called the "Venice of the East" and "Most Romantic City of India".',
  
  'hotel': 'Both Jaipur and Udaipur offer a range of accommodations from luxury palaces to budget-friendly options. In Jaipur, try Rambagh Palace or Hotel Pearl Palace. In Udaipur, Taj Lake Palace or Zostel Udaipur are popular choices.',
  'hotels': 'Both Jaipur and Udaipur offer a range of accommodations from luxury palaces to budget-friendly options. In Jaipur, try Rambagh Palace or Hotel Pearl Palace. In Udaipur, Taj Lake Palace or Zostel Udaipur are popular choices.',
  'stay': 'Both Jaipur and Udaipur offer a range of accommodations from luxury palaces to budget-friendly options. In Jaipur, try Rambagh Palace or Hotel Pearl Palace. In Udaipur, Taj Lake Palace or Zostel Udaipur are popular choices.',
  
  'food': 'Rajasthani cuisine is a must-try! In Jaipur, don\'t miss Dal Baati Churma, Pyaaz Kachori, and sweets like Ghewar. In Udaipur, try the thalis at Natraj Dining Hall or the rooftop dining experience at Upre by 1559 AD.',
  'eat': 'Rajasthani cuisine is a must-try! In Jaipur, don\'t miss Dal Baati Churma, Pyaaz Kachori, and sweets like Ghewar. In Udaipur, try the thalis at Natraj Dining Hall or the rooftop dining experience at Upre by 1559 AD.',
  'restaurant': 'Rajasthani cuisine is a must-try! In Jaipur, don\'t miss Dal Baati Churma, Pyaaz Kachori, and sweets like Ghewar. In Udaipur, try the thalis at Natraj Dining Hall or the rooftop dining experience at Upre by 1559 AD.',
  
  'transport': 'In both cities, auto-rickshaws and taxis are readily available. For a more authentic experience, try cycle rickshaws in the old city areas. In Udaipur, boat rides on Lake Pichola are a must. App-based services like Uber and Ola also operate in both cities.',
  'transportation': 'In both cities, auto-rickshaws and taxis are readily available. For a more authentic experience, try cycle rickshaws in the old city areas. In Udaipur, boat rides on Lake Pichola are a must. App-based services like Uber and Ola also operate in both cities.',
  'travel': 'In both cities, auto-rickshaws and taxis are readily available. For a more authentic experience, try cycle rickshaws in the old city areas. In Udaipur, boat rides on Lake Pichola are a must. App-based services like Uber and Ola also operate in both cities.',
  
  'attractions': 'In Jaipur, must-visit attractions include Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, and Albert Hall Museum. In Udaipur, don\'t miss City Palace, Lake Pichola, Jagdish Temple, Saheliyon ki Bari, and Monsoon Palace.',
  'places': 'In Jaipur, must-visit attractions include Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, and Albert Hall Museum. In Udaipur, don\'t miss City Palace, Lake Pichola, Jagdish Temple, Saheliyon ki Bari, and Monsoon Palace.',
  'see': 'In Jaipur, must-visit attractions include Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, and Albert Hall Museum. In Udaipur, don\'t miss City Palace, Lake Pichola, Jagdish Temple, Saheliyon ki Bari, and Monsoon Palace.',
  
  'shopping': 'Jaipur is famous for textiles, gemstones, blue pottery, and leather goods. Visit Johari Bazaar for jewelry and Bapu Bazaar for textiles. In Udaipur, Hathi Pol Bazaar is great for handicrafts, while Bada Bazaar offers traditional clothing and jewelry.',
  'shop': 'Jaipur is famous for textiles, gemstones, blue pottery, and leather goods. Visit Johari Bazaar for jewelry and Bapu Bazaar for textiles. In Udaipur, Hathi Pol Bazaar is great for handicrafts, while Bada Bazaar offers traditional clothing and jewelry.',
  'buy': 'Jaipur is famous for textiles, gemstones, blue pottery, and leather goods. Visit Johari Bazaar for jewelry and Bapu Bazaar for textiles. In Udaipur, Hathi Pol Bazaar is great for handicrafts, while Bada Bazaar offers traditional clothing and jewelry.',
  
  'weather': 'The best time to visit Jaipur and Udaipur is from October to March when the weather is pleasant. Summers (April to June) can be extremely hot, while monsoon (July to September) brings moderate rainfall making everything lush green.',
  'season': 'The best time to visit Jaipur and Udaipur is from October to March when the weather is pleasant. Summers (April to June) can be extremely hot, while monsoon (July to September) brings moderate rainfall making everything lush green.',
  'when': 'The best time to visit Jaipur and Udaipur is from October to March when the weather is pleasant. Summers (April to June) can be extremely hot, while monsoon (July to September) brings moderate rainfall making everything lush green.',
  
  'budget': 'For a comfortable trip to Jaipur or Udaipur, budget around ₹3,000-5,000 per day including accommodation, food, and sightseeing. Luxury experiences can cost ₹10,000+ per day. Street food costs around ₹100-300 per meal, while mid-range restaurants charge ₹500-1,000 per person.',
  'cost': 'For a comfortable trip to Jaipur or Udaipur, budget around ₹3,000-5,000 per day including accommodation, food, and sightseeing. Luxury experiences can cost ₹10,000+ per day. Street food costs around ₹100-300 per meal, while mid-range restaurants charge ₹500-1,000 per person.',
  'price': 'For a comfortable trip to Jaipur or Udaipur, budget around ₹3,000-5,000 per day including accommodation, food, and sightseeing. Luxury experiences can cost ₹10,000+ per day. Street food costs around ₹100-300 per meal, while mid-range restaurants charge ₹500-1,000 per person.',
};

// Suggested questions
const suggestedQuestions = [
  "What are the must-visit places in Jaipur?",
  "Tell me about the best hotels in Udaipur",
  "What local food should I try in Rajasthan?",
  "How to get around in Jaipur?",
  "What's the shopping scene like in Udaipur?",
  "Best time to visit Rajasthan?",
  "How much should I budget for a trip to Jaipur?",
];

const quickInfoItems = [
  { 
    id: 'jaipur',
    title: 'Jaipur',
    icon: <MapPin className="h-5 w-5 text-pink-500" />,
    content: 'Known as the "Pink City" for its distinctive pink buildings. Famous for Amber Fort, Hawa Mahal, and City Palace.'
  },
  { 
    id: 'udaipur',
    title: 'Udaipur',
    icon: <MapPin className="h-5 w-5 text-blue-500" />,
    content: 'Called the "City of Lakes" and "Venice of the East". Known for Lake Pichola, City Palace, and romantic settings.'
  },
  { 
    id: 'hotels',
    title: 'Hotels',
    icon: <Hotel className="h-5 w-5 text-gray-500" />,
    content: 'Options range from heritage palaces to budget hostels. Popular choices: Rambagh Palace in Jaipur and Taj Lake Palace in Udaipur.'
  },
  { 
    id: 'food',
    title: 'Local Cuisine',
    icon: <Utensils className="h-5 w-5 text-yellow-500" />,
    content: 'Must-try dishes: Dal Baati Churma, Gatte ki Sabzi, Laal Maas, Pyaaz Kachori, and Ghewar (sweet).'
  },
  { 
    id: 'weather',
    title: 'Best Time',
    icon: <Clock className="h-5 w-5 text-green-500" />,
    content: 'October to March offers pleasant weather. Avoid summer (April-June) when temperatures can exceed by 40°C.'
  },
  { 
    id: 'travel',
    title: 'Getting Around',
    icon: <MapPinned className="h-5 w-5 text-red-500" />,
    content: 'Auto-rickshaws, taxis, and ride-sharing apps available. In Udaipur, boat rides on lakes are popular.'
  }
];

const ChatGuide = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI travel guide for Jaipur and Udaipur. How can I help you plan your trip today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I'm not sure about that. As your guide for Jaipur and Udaipur, I can help with information about attractions, hotels, food, transportation, and more in these cities.";
      
      // Check for keyword matches in the input
      const lowercaseInput = inputMessage.toLowerCase();
      
      Object.keys(responses).forEach(keyword => {
        if (lowercaseInput.includes(keyword)) {
          botResponse = responses[keyword];
        }
      });
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    // Wait for state update before sending
    setTimeout(() => {
      handleSendMessage();
    }, 10);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Local Guide</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chat with our AI assistant for personalized recommendations and information about Jaipur and Udaipur.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex max-w-[80%]">
                          {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarFallback className="bg-travel-primary text-white">AI</AvatarFallback>
                              <AvatarImage src="/placeholder.svg" />
                            </Avatar>
                          )}
                          
                          <div>
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                message.sender === 'user'
                                  ? 'bg-travel-primary text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          
                          {message.sender === 'user' && (
                            <Avatar className="h-8 w-8 ml-2 mt-1">
                              <AvatarFallback className="bg-travel-dark text-white">
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-travel-primary text-white">AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 rounded-lg px-4 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={endOfMessagesRef} />
                  </div>
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex">
                    <Input
                      placeholder="Ask me about Jaipur or Udaipur..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      className="ml-2 bg-travel-primary hover:bg-travel-dark"
                      onClick={handleSendMessage}
                      disabled={isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">Quick Info</TabsTrigger>
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="p-4 space-y-4">
                    {quickInfoItems.map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSuggestedQuestion(`Tell me about ${item.title.toLowerCase()}`)}
                      >
                        <div className="flex items-center mb-1">
                          {item.icon}
                          <h3 className="font-medium ml-2">{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{item.content}</p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="questions" className="p-4">
                    <div className="space-y-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          <Info className="h-4 w-4 mr-2 shrink-0" />
                          <span className="line-clamp-2">{question}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-bold mb-2 flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-travel-primary" />
                  About This Guide
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  This AI guide specializes in information about Jaipur and Udaipur. It can help you with recommendations for:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Tourist attractions and sightseeing
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Hotels and accommodations
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Local cuisine and restaurants
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Transportation options
                  </li>
                  <li className="flex items-start">
                    <span className="text-travel-primary mr-2">•</span>
                    Shopping and souvenirs
                  </li>
                </ul>
                <p className="text-xs text-gray-500">
                  This is a demo version. Responses are pre-programmed for common queries about Jaipur and Udaipur.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGuide;
