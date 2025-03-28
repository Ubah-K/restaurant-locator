const fetchRestaurants = async (postcode) => {
  const url = `http://localhost:3005/api/restaurants/${postcode}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Accept-Tenant": "uk",
        "Accept-Language": "en-GB",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log("API response:", data);

    const restaurants = data.restaurants || data.Restaurants;

    if (!restaurants || restaurants.length === 0) {
      console.error("Sorry! No restaurants found");
      return [];
    }

    return restaurants.slice(0, 10).map((r) => {
      console.log("Full restaurant object:", r);

      return {
        name: r.name || r.Brand?.Name,
        cuisines: r.cuisines?.map((c) => c.name || c.Name).join(", ") || "",
        rating: r.rating?.starRating || r.Rating?.Average || "N/A",
        address:
          r.address?.formattedAddress ||
          (r.address?.firstLine && r.address?.postalCode
            ? `${r.address.firstLine}, ${r.address.postalCode}`
            : null) ||
          (Array.isArray(r.Address?.DisplayAddress)
            ? r.Address.DisplayAddress.join(", ")
            : null) ||
          "Address unavailable",
      };
    });
  } catch (error) {
    console.error("Error fetching the data : ", error);
    return [];
  }
};
const displayRestaurants = async () => {
  const postcode =
    document.getElementById("postcodeInput").value.replace(/\s+/g, "") ||
    "EC4M7RF";
  const restaurants = await fetchRestaurants(postcode);
  const container = document.getElementById("restaurants");
  container.innerHTML = "";

  if (restaurants.length === 0) {
    container.innerHTML = `<p>No restaurants found</p>`;
    return;
  }

  restaurants.forEach(({ name, cuisines, rating, address }) => {
    const element = document.createElement("div");
    element.innerHTML = `
                <h2>${name}</h2>
                <p><strong>Cuisines:</strong> ${cuisines}</p>
                <p><strong>Rating:</strong> ${rating}</p>
                <p><strong>Address:</strong> ${address}</p>
                <hr/>
            `;
    container.appendChild(element);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").onclick = displayRestaurants;
});
