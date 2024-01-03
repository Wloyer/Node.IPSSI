<template>
    <div>
      <h2>{{ isEditMode ? 'Edit User' : 'Add User' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="user.nom" placeholder="Nom" required>
        <input type="text" v-model="user.prenom" placeholder="Prénom" required>
        <input type="email" v-model="user.email" placeholder="Email" required>
        <button type="submit">{{ isEditMode ? 'Update' : 'Add' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      userData: Object,
      isEditMode: Boolean
    },
    data() {
      return {
        user: this.userData || { nom: '', prenom: '', email: '' }
      };
    },
    methods: {
      async handleSubmit() {
        const url = `http://localhost:8000/users${this.isEditMode ? `/${this.user.id}` : ''}`;
        const method = this.isEditMode ? 'put' : 'post';
        try {
          await axios[method](url, this.user);
          this.$emit('submit');
        } catch (error) {
          alert('Error: ' + error.response.data.message);
        }
      }
    }
  };
  </script>
  