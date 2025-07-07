import { useState } from "react";

const communities = [
  { name: "San Jose, CA", kits: 3, lat: 37.3382, lng: -121.8863, region: "Bay Area" },
  { name: "Oakland, CA", kits: 2, lat: 37.8044, lng: -122.2711, region: "Bay Area" },
  { name: "San Francisco, CA", kits: 2, lat: 37.7749, lng: -122.4194, region: "Bay Area" },
  { name: "Los Angeles, CA", kits: 0, lat: 34.0522, lng: -118.2437, region: "Southern California" },
  { name: "San Diego, CA", kits: 0, lat: 32.7157, lng: -117.1611, region: "Southern California" },
  { name: "Sacramento, CA", kits: 0, lat: 38.5816, lng: -121.4944, region: "Central Valley" },
  { name: "Fresno, CA", kits: 0, lat: 36.7378, lng: -119.7871, region: "Central Valley" },
  { name: "Seattle, WA", kits: 0, lat: 47.6062, lng: -122.3321, region: "Pacific Northwest" },
  { name: "Portland, OR", kits: 0, lat: 45.5152, lng: -122.6784, region: "Pacific Northwest" },
  { name: "Phoenix, AZ", kits: 0, lat: 33.4484, lng: -112.0740, region: "Southwest" },
  { name: "Las Vegas, NV", kits: 0, lat: 36.1699, lng: -115.1398, region: "Southwest" },
  { name: "Denver, CO", kits: 0, lat: 39.7392, lng: -104.9903, region: "Mountain West" }
];

const regions = [
  { name: "Bay Area", color: "from-pink-400 to-purple-500", total: 7 },
  { name: "Southern California", color: "from-purple-400 to-blue-500", total: 0 },
  { name: "Central Valley", color: "from-blue-400 to-teal-500", total: 0 },
  { name: "Pacific Northwest", color: "from-teal-400 to-green-500", total: 0 },
  { name: "Southwest", color: "from-orange-400 to-pink-500", total: 0 },
  { name: "Mountain West", color: "from-purple-500 to-pink-500", total: 0 }
];

export default function InteractiveMap() {
  const [selectedCommunity, setSelectedCommunity] = useState<typeof communities[0] | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredCommunities = selectedRegion 
    ? communities.filter(c => c.region === selectedRegion)
    : communities;

  const totalKits = communities.reduce((sum, community) => sum + community.kits, 0);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Communities We're Building
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See where we've started delivering self-care kits and our expansion plans to help young girls build confidence across the West Coast and beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Map Visualization */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Delivery Map</h3>
            
            {/* Simulated Map */}
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-96 overflow-hidden">
              {/* Map background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Community dots */}
              {filteredCommunities.map((community, index) => {
                // Convert lat/lng to relative positions on our mock map
                const x = ((community.lng + 125) / 15) * 100; // Normalize longitude
                const y = ((50 - community.lat) / 15) * 100; // Normalize latitude (inverted)
                
                return (
                  <div
                    key={index}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 ${
                      selectedCommunity?.name === community.name ? 'scale-150 z-10' : ''
                    }`}
                    style={{ left: `${Math.max(10, Math.min(90, x))}%`, top: `${Math.max(10, Math.min(90, y))}%` }}
                    onClick={() => setSelectedCommunity(community)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r from-swervy-pink to-swervy-purple shadow-lg ${
                      community.kits > 30 ? 'w-6 h-6' : community.kits > 20 ? 'w-5 h-5' : 'w-4 h-4'
                    }`}>
                    </div>
                    {selectedCommunity?.name === community.name && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2 shadow-lg whitespace-nowrap">
                        <p className="font-bold text-sm">{community.name}</p>
                        <p className="text-xs text-gray-600">{community.kits} kits delivered</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Click on any dot to see details • Larger dots = more kits delivered
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Impact by Region</h3>
              
              {regions.map((region, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedRegion === region.name 
                      ? 'bg-gradient-to-r ' + region.color + ' text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{region.name}</span>
                    <span className="font-bold">{region.total} kits</span>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-gradient-to-r from-swervy-pink to-swervy-purple text-white rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalKits}</div>
                  <div className="text-sm opacity-90">Total Kits Delivered</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Next Target Communities</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Austin, TX</span>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Miami, FL</span>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chicago, IL</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Want to Bring Swervy Cares to Your Community?</h3>
          <p className="text-gray-600 mb-6">
            We're always looking to expand to new areas where girls need confidence and support.
          </p>
          <a 
            href="mailto:aishniragh@icloud.com" 
            className="bg-gradient-to-r from-swervy-pink to-swervy-purple text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
          >
            Contact Us About Your Area
          </a>
        </div>
      </div>
    </section>
  );
}