import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Heart, Gift } from "lucide-react";

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Swervy Cares Fundraiser",
      date: "Sunday, July 20, 2025",
      time: "3:30 PM",
      location: "Evergreen Village Square",
      description: "Join us for a community fundraiser to support our mission of empowering young girls through self-care kits.",
      type: "fundraiser",
      volunteers: "TBD",
      goal: "Support our mission",
      status: "upcoming"
    }
  ];

  const pastEvents = [
    // Past events will be added here as they are completed
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'fundraiser':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'workshop':
        return <Users className="w-5 h-5 text-purple-500" />;
      case 'volunteer':
        return <Gift className="w-5 h-5 text-turquoise-500" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fundraiser':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'workshop':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'volunteer':
        return 'bg-turquoise-100 text-turquoise-800 border-turquoise-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-turquoise-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-turquoise-600 bg-clip-text text-transparent">
            Events & Fundraisers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community events, fundraisers, and volunteer opportunities to help empower young girls through self-care and confidence building.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Want to Get Involved?</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for passionate volunteers and supporters to help us reach more girls in need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Volunteer with Us
              </Button>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                Donate Now
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    {getEventIcon(event.type)}
                    <Badge className={`${getTypeColor(event.type)} font-semibold`}>
                      {event.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-turquoise-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-pink-500" />
                      {event.volunteers} volunteers needed
                    </div>
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-3 mt-4">
                      <p className="text-sm font-semibold text-gray-700">Goal: {event.goal}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300">
                    Sign Up to Help
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Recent Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.id} className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      {getEventIcon(event.type)}
                      <Badge className="bg-green-100 text-green-800 border-green-200 font-semibold">
                        Completed
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-pink-500" />
                        {event.date}
                      </div>
                      <div className="bg-gradient-to-r from-green-100 to-turquoise-100 rounded-lg p-3 mt-4">
                        <p className="text-sm font-semibold text-gray-700">
                          ✓ {event.result}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Get Involved Section */}
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-turquoise-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Every volunteer hour, every donation, and every shared story helps us reach more girls who need confidence and care. Join our mission today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
              Contact Us
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}