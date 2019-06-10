import { fork, all } from "redux-saga/effects";

import { chatSaga } from "./chatSaga/chatSaga";
import { loginSaga } from "./loginSaga/loginSaga";
import { logoutSaga } from "./logoutSaga/logoutSaga";
import { lunchesSaga } from "./lunchesSaga/lunchesSaga";
import { userAccountSaga } from "./userAccountSaga/userAccountSaga";
import { networkStateSaga } from "./networkStateSaga/networkStateSaga";

const sagas = [
    loginSaga, userAccountSaga, logoutSaga, lunchesSaga, chatSaga, networkStateSaga
].map(s => fork(s));

export default function* () {
    yield all(sagas);
}