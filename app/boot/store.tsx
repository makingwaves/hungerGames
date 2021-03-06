import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import sagas from '@app/sagas/sagas';
import rootReducer from '@app/state/state';

type Middlewares = SagaMiddleware<{}>;

function configureStore(middlewares: Middlewares[]) {
    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore([
    sagaMiddleware
]);

sagaMiddleware.run(sagas);

export default store;
