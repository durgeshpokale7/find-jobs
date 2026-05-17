export const fetchInternships = async () => {
  try {
    const response = await fetch("https://internshala.com/hiring/search");

    if (!response.ok) {
      throw new Error("Failed to fetch internships");
    }

    const data = await response.json();

    return Object.values(data.internships_meta);
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};
