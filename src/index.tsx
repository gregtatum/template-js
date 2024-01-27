import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'src/store/create-store';
import * as T from 'src/@types';
import { App } from 'src/components/App';
import { ensureExists, mockGoogleAnalytics } from 'src/utils';
import { createRoot } from 'react-dom/client';

export * as A from 'src/store/actions';
export * as $ from 'src/store/selectors';
export * as T from 'src/@types';

if (process.env.NODE_ENV !== 'test') {
  init();
}

export async function init(): Promise<void> {
  mockGoogleAnalytics();

  const store = createStore();
  Object.assign(window as any, { store });
  mountReact(store);
}

export function createRootApp(store: T.Store): JSX.Element {
  return (
    <Provider store={store as any}>
      <App key={'app'} />
    </Provider>
  );
}

function mountReact(store: T.Store): void {
  const mountElement = ensureExists(
    document.querySelector('.appRoot'),
    'Could not find the app root',
  );
  const root = createRoot(mountElement);
  root.render(createRootApp(store));
}
