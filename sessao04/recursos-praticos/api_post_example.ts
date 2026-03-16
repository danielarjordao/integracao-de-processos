const response = await fetch(environment.apiUrl + '/users', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
});

const data = await response.json();
console.log(data);
}

createUser();