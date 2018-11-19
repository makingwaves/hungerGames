import {LunchActions, LunchesState, LunchStatus} from './types';
import {RequestState} from '../common/types';
import {Reducer} from 'redux';
import {ActionUnion} from '../../utils/redux';
import {lunchesActionsCreators} from './actions';
import {ObjTransformer} from '../../utils/common';

const initialState: LunchesState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: {},
};

type LunchAction = ActionUnion<typeof lunchesActionsCreators>;

export const lunchesReducer: Reducer<LunchesState> = (state: LunchesState = initialState, action: LunchAction) => {
    const transformer = new ObjTransformer();

    switch (action.type) {
        case LunchActions.CREATE_LUNCH:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        id: action.payload.lunchId,
                        status: LunchStatus.pending,
                        locations: {
                            [action.payload.creatorId]: action.payload.location,
                        },
                        times: {
                            [action.payload.creatorId]: action.payload.time,
                        },
                        members: [action.payload.creatorId],
                        chat: {},
                    },
                },
            };
        case LunchActions.UPDATE_LUNCH:
            return {
                ...state,
                data: {
                    ...transformer.set(state.data)
                        .filter((key) => (key !== action.payload.oldLunchId))
                        .get(),
                    [action.payload.newLunchId]: {
                        id: action.payload.newLunchId,
                        status: action.payload.status,
                        locations: action.payload.locations,
                        times: action.payload.times,
                        members: action.payload.members,
                        chat: {},
                    },
                },
            };
        case LunchActions.SET_LUNCH_STATUS:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        ...state.data[action.payload.lunchId],
                        status: action.payload.lunchStatus,
                    },
                },
            };
        case LunchActions.REMOVE_LUNCH:
            return {
                ...state,
                data: {
                    ...transformer.set(state.data)
                        .filter((key) => (key !== action.payload))
                        .get(),
                },
            };
        case LunchActions.ADD_LUNCH_MEMBER:
            const addMemberLunch = state.data[action.payload.lunchId];
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        ...addMemberLunch,
                        members: [...addMemberLunch.members, action.payload.memberId],
                        times: {
                            ...addMemberLunch.times,
                            [action.payload.memberId]: action.payload.time,
                        },
                        locations: {
                            ...addMemberLunch.locations,
                            [action.payload.memberId]: action.payload.location,
                        },
                    },
                },
            };
        case LunchActions.REMOVE_LUNCH_MEMBER:
            const removedMemberLunch = state.data[action.payload.lunchId];
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        ...state.data[action.payload.lunchId],
                        members: removedMemberLunch.members.filter((it) => (it !== action.payload.memberId)),
                        locations: transformer.set(removedMemberLunch.locations)
                            .filter((key) => (key !== action.payload.memberId))
                            .get(),
                        times: transformer.set(removedMemberLunch.times)
                            .filter((key) => (key !== action.payload.memberId))
                            .get(),
                    },
                },
            };
        case LunchActions.SET_LUNCH_LOCATION:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        ...state.data[action.payload.lunchId],
                        locations: {
                            ...state.data[action.payload.lunchId].locations,
                            [action.payload.memberId]: action.payload.location,
                        },
                    },
                },
            };
        case LunchActions.SET_LUNCH_TIME:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        ...state.data[action.payload.lunchId],
                        times: {
                            ...state.data[action.payload.lunchId].times,
                            [action.payload.memberId]: action.payload.time,
                        },
                    },
                },
            };
        case LunchActions.ADD_CHAT_MESSAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.lunchId]: {
                        ...state.data[action.payload.lunchId],
                        chat: {
                            ...state.data[action.payload.lunchId].chat,
                            [action.payload.message.messageId]: action.payload.message,
                        },
                    },
                },
            };
        case LunchActions.START_REQUEST:
            return {
                ...state,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: '',
                },
            };
        case LunchActions.REQUEST_SUCCESS:
            return {
                ...state,
                request: {
                    state: RequestState.succeeded,
                    errorMsg: '',
                },
            };
        case LunchActions.REQUEST_FAIL:
            return {
                ...state,
                request: {
                    state: RequestState.failed,
                    errorMsg: action.payload,
                },
            };
        default:
            return state;
    }
};
