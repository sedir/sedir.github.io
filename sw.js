self.addEventListener('push', (event) => {
    let data;
    try {
        // Attempt to parse JSON (expected format from Backend)
        data = event.data ? event.data.json() : null;
    } catch (e) {
        // Fallback: if plain text (e.g. manual test via simple curl)
        data = { title: 'Atualização no Now', message: event.data ? event.data.text() : 'Nova nota.' };
    }

    // Default values
    if (!data) data = { title: 'Atualização', message: 'Nova nota disponível.' };
    if (!data.title) data.title = 'Atualização Sedir.io';
    if (!data.message) data.message = 'Conteúdo atualizado.';

    const options = {
        body: data.message,
        icon: '/apple-touch-icon.png',
        badge: '/favicon-16x16.png',
        data: { url: '/now/' } // URL to open on click
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
