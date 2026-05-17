export const filterInternships = (internships, filters) => {
  return internships.filter((item) => {
    const profileMatch =
      filters.profiles.length === 0 ||
      filters.profiles.some((profile) =>
        item.title?.toLowerCase().includes(profile.toLowerCase()),
      );

    const internshipLocations =
      item.location_names?.map((loc) => loc.toLowerCase()) || [];

    const locationMatch =
      filters.locations.length === 0 ||
      filters.locations.some((location) =>
        internshipLocations.includes(location.toLowerCase()),
      );

    const durationMatch =
      !filters.duration ||
      item.duration?.toLowerCase().includes(filters.duration.toLowerCase());

    const stipendAmount = item.stipend?.salaryValue1 || 0;
    const stipendMatch = stipendAmount >= filters.stipend;

    return profileMatch && locationMatch && durationMatch && stipendMatch;
  });
};
