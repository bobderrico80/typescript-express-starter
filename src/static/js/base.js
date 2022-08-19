document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/hello');
  const json = await response.json();
  document.getElementById('api-message').innerText = json.message;
});
