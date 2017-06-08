import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger'

export default function configureStore(initialState) {
    const logger = createLogger();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-disable no-underscore-dangle */
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(logger))
    );
    /* eslint-enable */

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}
