<template>
    <div class="users">
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            {{ error }}
            <button @click.prevent="fetchData">
                Try Again
            </button>
        </div>

        <ul v-if="users">
            <li v-for="{ name, email } in users">
                <strong>Name:</strong> {{ name }},
                <strong>Email:</strong> {{ email }}
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      users: null,
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.users = null;
      this.loading = true;
      axios
        .get('/api/users')
        .then(response => {
          this.loading = false;
          this.users = response.data;
          console.log(response);
        }).catch(error => {
          this.loading = false;
          this.error = error.response.data.message || error.message;
        });
    },
  },
};
</script>
