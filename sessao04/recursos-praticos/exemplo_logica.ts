async function login(user: { name: string; password: string }) {
  const users = await loadUsers();

  const foundUser = users.find(
    (u: { name: string; password: string }) =>
      u.name === user.name && u.password === user.password
  );

  if (foundUser) {
    console.log("User válido");
  } else {
    console.log("User inválido");
  }
}

// OU


interface User {
  name: string;
  password: string
}

async function login(user: User) {
  const users = await loadUsers();

  const foundUser = users.find(
    (u: User) =>
      u.name === user.name && u.password === user.password
  );

  if (foundUser) {
    console.log("User válido");
  } else {
    console.log("User inválido");
  }
}