import {
  MapPin,
  IndianRupee,
  Clock3,
  ArrowUpRight,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

function InternshipCard({ internship }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-300" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
            {internship.company_name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-semibold text-gray-900 leading-6 group-hover:text-blue-600 transition">
              {internship.title}
            </h2>

            <p className="text-sm text-gray-500 mt-0.5">
              {internship.company_name}
            </p>

            <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
              <CalendarDays size={12} />

              <span>{internship.posted_by_label || "Recently Posted"}</span>
            </div>
          </div>
        </div>

        <span className="hidden sm:flex text-[10px] font-semibold bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full shrink-0">
          Hiring
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-1 text-gray-400 text-[11px] mb-1">
          <MapPin size={13} />

          <span>Locations</span>
        </div>

        <p className="text-sm font-medium text-gray-800 leading-6">
          {internship.location_names?.length > 0
            ? internship.location_names.join(", ")
            : "Work From Home"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1 text-gray-400 text-[11px] mb-1">
            <IndianRupee size={12} />

            <span>Stipend</span>
          </div>

          <p className="text-sm font-medium text-gray-800 leading-5">
            {internship.stipend?.salary || "Not disclosed"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1 text-gray-400 text-[11px] mb-1">
            <Clock3 size={12} />

            <span>Duration</span>
          </div>

          <p className="text-sm font-medium text-gray-800">
            {internship.duration}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1 text-gray-400 text-[11px] mb-1">
            <BriefcaseBusiness size={12} />

            <span>Type</span>
          </div>

          <p className="text-sm font-medium text-gray-800">Internship</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
          Internship
        </span>

        {internship.work_from_home && (
          <span className="text-[10px] font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
            Work From Home
          </span>
        )}

        {internship.part_time && (
          <span className="text-[10px] font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
            Part Time
          </span>
        )}

        {internship.start_date && (
          <span className="text-[10px] font-medium bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full">
            {internship.start_date}
          </span>
        )}

        {internship.ppo_label_value && (
          <span className="text-[10px] font-medium bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-full">
            {internship.ppo_label_value}
          </span>
        )}
      </div>

      {internship.job_description && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 leading-6 line-clamp-3">
            {internship.job_description}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <BriefcaseBusiness size={13} />

          <span>
            {internship.application_status_message?.message || "Apply now"}
          </span>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
          View Details
          <ArrowUpRight size={15} />
        </button>

        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default InternshipCard;
