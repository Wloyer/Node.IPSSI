<template>
    <div>
      <user-form @submit="fetchUsers" />
      <h2>Liste des Utilisateurs</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.nom }} - {{ user.email }}
          <button @click="editUser(user)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
      <user-form v-if="editingUser" :isEditMode="true" :userData="editingUser" @submit="fetchUsers" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import UserForm from './UserForm.vue';
  
  export default {
    components: {
      UserForm
    },
    data() {
      return {
        users: [],
        editingUser: null
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
    try {
      const response = await axios.get('http://localhost:3000/users');
      this.users = response.data;
    } catch (error) {
      if (error.response) {
        alert('Error: ' + error.response.data.message);
      } else if (error.request) {
        alert('Error: No response received');
      } else {
        alert('Error: ' + error.message);
      }
      console.error('There was an error!', error);
    }
  },
      editUser(user) {
        this.editingUser = { ...user };
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:8000/users/${userId}`);
          this.fetchUsers();
        } catch (error) {
          alert('Error: ' + error.response.data.message);
        }
      }
    }
  };
  </script>
  