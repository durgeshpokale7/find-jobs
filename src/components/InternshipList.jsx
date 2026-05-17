import InternshipCard from "./InternshipCard";

const InternshipList = ({ internships, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <h2 className="text-lg font-semibold text-gray-600">
          Loading internships...
        </h2>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Internships Found
        </h2>

        <p className="text-gray-500 mt-2">Try changing filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {internships.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} />
      ))}
    </div>
  );
};

export default InternshipList;
