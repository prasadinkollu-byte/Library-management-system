const form = document.getElementById('loginForm');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  error.textContent = '';

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');

    sessionStorage.setItem('library_token', data.token);
    window.location.href = '/';
  } catch (err) {
    error.textContent = err.message;
  }
});