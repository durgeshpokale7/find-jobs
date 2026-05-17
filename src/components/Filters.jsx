import { useEffect, useMemo, useRef, useState } from "react";

import { ChevronDown, X } from "lucide-react";

function Filters({ internships, filters, onFilterChange }) {
  const [showProfiles, setShowProfiles] = useState(false);

  const [showLocations, setShowLocations] = useState(false);

  const profileRef = useRef(null);

  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // PROFILE
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfiles(false);
      }

      // LOCATION
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocations(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const profileOptions = useMemo(() => {
    const profiles = internships.map((item) => item.title).filter(Boolean);

    return [...new Set(profiles)].sort();
  }, [internships]);

  const locationOptions = useMemo(() => {
    const locations = internships.flatMap((item) => item.location_names || []);

    return [...new Set(locations)].sort();
  }, [internships]);

  const handleProfileSelect = (profile) => {
    let updatedProfiles;

    if (filters.profiles.includes(profile)) {
      updatedProfiles = filters.profiles.filter((p) => p !== profile);
    } else {
      updatedProfiles = [...filters.profiles, profile];
    }

    onFilterChange("profiles", updatedProfiles);
  };

  const handleLocationSelect = (location) => {
    let updatedLocations;

    if (filters.locations.includes(location)) {
      updatedLocations = filters.locations.filter((l) => l !== location);
    } else {
      updatedLocations = [...filters.locations, location];
    }

    onFilterChange("locations", updatedLocations);
  };

  const handleStipendChange = (e) => {
    onFilterChange("stipend", Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div ref={profileRef}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Profile
        </label>

        <div
          onClick={() => {
            setShowProfiles(!showProfiles);

            setShowLocations(false);
          }}
          className="border border-gray-300 rounded-xl p-3 cursor-pointer min-h-[54px] bg-white"
        >
          <div className="flex flex-wrap gap-2 items-center">
            {filters.profiles.length > 0 ? (
              filters.profiles.map((profile) => (
                <span
                  key={profile}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {profile}

                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleProfileSelect(profile);
                    }}
                  />
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">Select profiles</span>
            )}

            <ChevronDown
              size={18}
              className={`ml-auto text-gray-500 transition ${
                showProfiles ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {showProfiles && (
          <div className="mt-3 border border-gray-200 rounded-xl bg-white shadow-sm p-3 max-h-64 overflow-y-auto">
            {profileOptions.map((profile) => (
              <label
                key={profile}
                className="flex items-center gap-3 py-2 text-sm cursor-pointer hover:bg-gray-50 px-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.profiles.includes(profile)}
                  onChange={() => handleProfileSelect(profile)}
                  className="accent-blue-600"
                />

                {profile}
              </label>
            ))}
          </div>
        )}
      </div>

      <div ref={locationRef}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>

        <div
          onClick={() => {
            setShowLocations(!showLocations);

            setShowProfiles(false);
          }}
          className="border border-gray-300 rounded-xl p-3 cursor-pointer min-h-[54px] bg-white"
        >
          <div className="flex flex-wrap gap-2 items-center">
            {filters.locations.length > 0 ? (
              filters.locations.map((location) => (
                <span
                  key={location}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {location}

                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleLocationSelect(location);
                    }}
                  />
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-400">Select locations</span>
            )}

            <ChevronDown
              size={18}
              className={`ml-auto text-gray-500 transition ${
                showLocations ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {showLocations && (
          <div className="mt-3 border border-gray-200 rounded-xl bg-white shadow-sm p-3 max-h-64 overflow-y-auto">
            {locationOptions.map((location) => (
              <label
                key={location}
                className="flex items-center gap-3 py-2 text-sm cursor-pointer hover:bg-gray-50 px-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.locations.includes(location)}
                  onChange={() => handleLocationSelect(location)}
                  className="accent-blue-600"
                />

                {location}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Duration
        </label>

        <select
          value={filters.duration}
          onChange={(e) => onFilterChange("duration", e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Duration</option>

          <option value="1 Month">1 Month</option>

          <option value="2 Months">2 Months</option>

          <option value="3 Months">3 Months</option>

          <option value="6 Months">6 Months</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            minimum monthly stipend
          </label>

          <span className="text-sm font-semibold text-blue-600">
            ₹{filters.stipend}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="30000"
          step="5000"
          value={filters.stipend}
          onChange={handleStipendChange}
          className="w-full accent-blue-600 cursor-pointer"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0</span>
          <span>5K</span>
          <span>10K</span>
          <span>15K</span>
          <span>20K</span>
          <span>25K</span>
          <span>30K</span>
        </div>
      </div>
    </div>
  );
}

export default Filters;
