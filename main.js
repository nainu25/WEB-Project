document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/homes')
      .then(response => response.json())
      .then(data => {
        const homesList = document.getElementById('homes-list');
        data.forEach(home => {
          const homeItem = document.createElement('div');
          homeItem.classList.add('home-item');
          homeItem.innerHTML = `
            <h3>${home.address}</h3>
            <p>Rooms: ${home.rooms}</p>
            <p>Kitchen: ${home.kitchen}</p>
            <p>Bathrooms: ${home.bathrooms}</p>
            <p>Price: ${home.price}</p>
            <p>For Rent: ${home.forRent}</p>
          `;
          homesList.appendChild(homeItem);
        });
      });
  });
  