document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/homes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Debug: Log fetched data
      const homesList = document.getElementById('homes-list');
      data.forEach(home => {
        const homeItem = document.createElement('div');
        homeItem.innerHTML = `
          <h2>${home.address}</h2>
          <p>Rooms: ${home.rooms}</p>
          <p>Kitchen: ${home.kitchen}</p>
          <p>Bathrooms: ${home.bathrooms}</p>
          <p>Price: $${home.price}</p>
          <p>For Rent: ${home.forRent}</p>
        `;
        homesList.appendChild(homeItem);
      });
    })
    .catch(error => {
      console.error('Error fetching homes:', error);
    });
});
