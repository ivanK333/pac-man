export const ROUTES = {
  auth: {
    root: 'auth',
    register: 'register',
    login: 'login',
  },
  main: {
    root: '/game',
    profile: 'profile',
    game: 'game',
    gameOver: 'game-over',
    forum: {
      root: '/forum/',
      tech: 'tech',
      about: 'about',
      topic: 'topic/:id',
    },
    lead: 'lead',
  },
  error: {
    notFound: '404',
    internalError: '500',
  },
};
