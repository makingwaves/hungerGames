
import { takeLatest, put, call } from 'redux-saga/effects';

import { LunchSagaActions, CreateLunchPayload } from '../../state/lunches/types';
import { lunchesActionsCreators } from '../../state/lunches/actions';
import lunchesService, { MeetingRequest } from '../../api/lunchesService/lunchesService';
import { membersActionsCreators } from '../../state/members/actions';

export function* getLunchesFlow() {
    try {
        yield put(lunchesActionsCreators.startRequest());
        const [lunches, members] = yield call(
            [lunchesService, lunchesService.getLunchesAndMembers]
        );

        yield put(membersActionsCreators.batchSetMembers(members));
        yield put(lunchesActionsCreators.setLunches(lunches));
        yield put(lunchesActionsCreators.requestSuccess());
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail('Error when trying to fetch lunches.'));
    }
}

export function* postLunchFlow({ payload }: { type: string, payload: MeetingRequest }) {
    try {
        const lunch: CreateLunchPayload = yield call(
            [lunchesService, lunchesService.postLunch],
            payload
        );
        yield put(lunchesActionsCreators.createLunch(lunch));
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail('Error when trying to search for lunch.'));
    }
}

export function* lunchesSaga() {
    yield takeLatest(LunchSagaActions.GET_LUNCHES, getLunchesFlow);
    yield takeLatest(LunchSagaActions.POST_LUNCH, postLunchFlow);
}