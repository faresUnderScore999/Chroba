<template>
    <div>
      <h1>Protected Route</h1>
      <p>You are logged in!</p>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'auth', // This ensures only authenticated users can access this page
 
  };
  </script>
  