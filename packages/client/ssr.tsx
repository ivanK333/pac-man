import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore } from './src/store';
import App from './src/App';
import { UserService } from './src/api/auth/UserService';

async function render(uri, repository) {
  const [pathname] = uri.split('?');
  const store = createStore(new UserService(repository));
  const currentRoute = routes.find((route) => matchPath(pathname, route));

  const { loader } = currentRoute;
  if (loader) {
    await loader(store.dispatch);
  }

  const initialState = store.getState();

  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  );
  return [initialState, renderResult];
}

export { render };
