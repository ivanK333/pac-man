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
      topic: 'topic/:id',
    },
    lead: 'lead',
    lending: '',
  },
  error: {
    notFound: '404',
    internalError: '500',
  },
};
