document.addEventListener('DOMContentLoaded', function() {
  const userList = document.getElementById('user-list');
  const userForm = document.getElementById('user-form');
  const saveBtn = document.getElementById('save-btn');

  let users = [];

  // Fetch users from mock API (JSON file)
  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      users = data.users;
      displayUsers();
    });

  // Display users in the UI
  function displayUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
      const userItem = document.createElement('div');
      userItem.innerHTML = `
        <p><strong>${user.name}</strong> (${user.email})
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </p>
      `;
      userList.appendChild(userItem);
    });
  }

  // Handle form submission for adding/editing users
  userForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const userId = document.getElementById('userId').value;

    if (userId) {
      // Editing existing user
      const index = users.findIndex(user => user.id == userId);
      if (index !== -1) {
        users[index].name = name;
        users[index].email = email;
      }
    } else {
      // Adding new user
      const newUser = {
        id: users.length + 1,
        name: name,
        email: email
      };
      users.push(newUser);
    }

    // Update UI and reset form
    displayUsers();
    userForm.reset();
  });

  // Function to edit user details
  window.editUser = function(id) {
    const user = users.find(user => user.id == id);
    if (user) {
      document.getElementById('userId').value = user.id;
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      saveBtn.innerText = 'Update';
    }
  };

  // Function to delete user
  window.deleteUser = function(id) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      users = users.filter(user => user.id != id);
      displayUsers();
    }
  };
});
