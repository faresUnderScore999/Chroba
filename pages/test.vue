<template>
  <div :class="theme">
    <div class="container">
      <h1>Toggle Light/Dark Mode</h1>
      <button @click="toggleTheme">
        Switch to {{ theme === "light" ? "Dark" : "Light" }} Mode
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light", // Default theme
    };
  },
  methods: {
    toggleTheme() {
      // Toggle between light and dark theme
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
};
</script>

  
  <style scoped>
:root {
  --background-color: white;
  --text-color: black;
}

.dark {
  --background-color: #121212;
  --text-color: white;
}

.light {
  --background-color: white;
  --text-color: black;
}

.container {
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 20px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button {
  background-color: var(--text-color);
  color: var(--background-color);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  opacity: 0.8;
}
</style>
  