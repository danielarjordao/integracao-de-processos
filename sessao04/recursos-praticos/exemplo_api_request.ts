import { environment } from '../environments/environment.development';

async function loadUsers() {
  const response = await fetch(environment.apiUrl + '/users');
  const users = await response.json();

  console.log(users);
}

loadUsers();
