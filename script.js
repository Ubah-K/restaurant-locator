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
    const restaurants = data.restaurants || data.Restaurants;
    
    if (!restaurants || restaurants.length === 0) {
      return [];
    }
    return restaurants.slice(0, 10).map((r) => ({
      name: r.name || r.Brand?.Name,
      cuisines: r.cuisines?.map((c) => c.name || c.Name).join(", ") || "",
      rating: r.rating?.starRating || r.Rating?.Average || "N/A",
      address: r.address?.formattedAddress ||
        (r.address?.firstLine && r.address?.postalCode ? `${r.address.firstLine}, ${r.address.postalCode}` : null) ||
        (Array.isArray(r.Address?.DisplayAddress) ? r.Address.DisplayAddress.join(", ") : null) || "Address unavailable",
    }));
  } catch (error) {
    console.error("Error fetching the data:", error);
    return [];
  }
};

const updateDisplay = async () => {
  const postcodeInput = document.getElementById("postcodeInput");
  const postcode = postcodeInput.value.replace(/\s+/g, "") || "";
  const loading = document.getElementById("loading");
  const restaurantsDiv = document.getElementById("restaurants");

  loading.style.display = 'block';
  restaurantsDiv.innerHTML = ''; 
  const restaurants = await fetchRestaurants(postcode);
  
  loading.style.display = 'none'; 

  if (restaurants.length === 0) {
    restaurantsDiv.innerHTML = `<p>Sorry! No restaurants found</p>`;
    return;
  }

  restaurants.forEach(({ name, cuisines, rating, address }) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Cuisine:</strong> ${cuisines}</p>
      <p><strong>Rating:</strong> ${rating}</p>
      <p><strong>Address:</strong> ${address}</p>
      <hr/>
    `;
    restaurantsDiv.appendChild(element);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").onclick = updateDisplay; 
});
