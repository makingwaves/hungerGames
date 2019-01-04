import {makeAction} from '../../utils/redux';
import {
    LunchActions,
    LunchesMap,
    AddLunchMemberPayload,
    SetLunchLocationPayload,
    SetLunchTimePayload,
    UpdateLunchPayload,
    CreateLunchPayload,
    SetLunchStatusPayload,
    SetLunchChatPayload,
    RemoveLunchMemberPayload, AddChatMessagePayload,
} from './types';

export const lunchesActionsCreators = {
    setLunches: (lunchesPayload: LunchesMap) => makeAction(LunchActions.SET_LUNCHES, lunchesPayload),
    createLunch: (lunchPayload: CreateLunchPayload) => makeAction(LunchActions.CREATE_LUNCH, lunchPayload),
    setLunchStatus: (statusPayload: SetLunchStatusPayload) => makeAction(LunchActions.SET_LUNCH_STATUS, statusPayload),
    updateLunch: (lunchPayload: UpdateLunchPayload) => makeAction(LunchActions.UPDATE_LUNCH, lunchPayload),
    removeLunch: (lunchId: string) => makeAction(LunchActions.REMOVE_LUNCH, lunchId),
    addLunchMember: (payload: AddLunchMemberPayload) =>
        makeAction(LunchActions.ADD_LUNCH_MEMBER, payload),
    removeLunchMember: (payload: RemoveLunchMemberPayload) => makeAction(LunchActions.REMOVE_LUNCH_MEMBER, payload),
    setLunchLocation: (locationPayload: SetLunchLocationPayload) =>
        makeAction(LunchActions.SET_LUNCH_LOCATION, locationPayload),
    setLunchTime: (timePayload: SetLunchTimePayload) => makeAction(LunchActions.SET_LUNCH_TIME, timePayload),
    setLunchChat: (chatPayload: SetLunchChatPayload) => makeAction(LunchActions.SET_LUNCH_CHAT, chatPayload),
    addChatMessage: (messagePayload: AddChatMessagePayload) =>
        makeAction(LunchActions.ADD_CHAT_MESSAGE, messagePayload),
    startRequest: () => makeAction(LunchActions.START_REQUEST),
    requestSuccess: () => makeAction(LunchActions.REQUEST_SUCCESS),
    requestFail: (errorMsg: string) => makeAction(LunchActions.REQUEST_FAIL, errorMsg),
};
