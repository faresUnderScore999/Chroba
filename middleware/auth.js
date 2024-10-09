export default function ({ route, store, redirect }) {
    // Si l'utilisateur n'est pas authentifié
    const validRoutes = ['/game', '/about', '/']; // Add your existing routes

    // Check if the current route is valid
    if (!validRoutes.includes(route.path)) {
      // If not valid, redirect to home
      return redirect('/');
    }
    if (!store.state.auth.loggedIn) {
      return redirect('/')
    }
  }