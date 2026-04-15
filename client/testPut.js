const axios = require('axios');
(async () => {
  try {
    const act = {
      id: "071db47f-ed08-4c7d-88cb-21995292fba2",
      title: "Title Edit",
      description: "Desc",
      category: "Cat",
      date: "2026-04-14",
      city: "City",
      venue: "Venue",
      latitude: 0,
      longitude: 0,
      isCancelled: false
    };
    await axios.put("https://localhost:5001/api/activities/" + act.id, act);
    console.log("Success");
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
})();
