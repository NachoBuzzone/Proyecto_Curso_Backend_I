const socket = io();

socket.on('serviceCreated', (service) => {
  const container = document.getElementById('services-container');
  if (!container) return;

  const emptyMsg = container.querySelector('p');
  if (emptyMsg && emptyMsg.textContent.includes('No services')) {
    emptyMsg.remove();
  }
  
  const article = document.createElement('article');
  article.className = 'service-card';
  article.id = `service-${service._id}`;

  article.innerHTML = `
    <h2>${service.name}</h2>
    <p>${service.description}</p>
    <p>Duración: ${service.duration} minutos</p>
    <p>Precio: $${service.price}</p>
    <p>Categoría: ${service.category}</p>
    <p>Disponible: ${service.available ? 'Sí' : 'No'}</p>`;

  container.appendChild(article);
});

socket.on('serviceDeleted', (serviceId) => {
  const card = document.getElementById(`service-${serviceId}`);
  if (card) {
    card.remove();
  }
});
