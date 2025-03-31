
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-travel-light p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-travel-primary/10 p-6 rounded-full">
            <Map className="h-16 w-16 text-travel-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Oops! Lost in Transit</h1>
        <p className="text-xl text-gray-600 mb-6">
          The destination you're looking for doesn't exist on our map.
        </p>
        <Button 
          size="lg" 
          className="bg-travel-primary hover:bg-travel-dark"
          asChild
        >
          <Link to="/">
            Back to Home
          </Link>
        </Button>
        <p className="mt-6 text-sm text-gray-500">
          Error 404 - Page not found
        </p>
      </div>
    </div>
  );
};

export default NotFound;
