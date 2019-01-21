import { LunchResponseDto, MeetingsResponse } from "../lunchesService/lunchesService";
import { MapperFn } from './utils';
import { MembersMap } from '../../state/members/types';

export type MembersMapFn<T> = MapperFn<LunchResponseDto[], T>;

export const mapAndExtendGuests = (
    lunches: LunchResponseDto[],
    flattenGuestFn: MembersMapFn<MeetingsResponse[]> 
): MembersMap => {
    return lunches && flattenGuestFn(lunches)
        .map(guestInformation => guestInformation.user)
        .reduce((guestMappedObject, guest) => (
            guestMappedObject[guest.id] = guest, guestMappedObject
        ), {});   
}

// mappers
export const flattenGuestFn = (lunches: LunchResponseDto[]): MeetingsResponse[] => {
    return lunches && lunches
        .map(lunch => lunch.guests)
        .reduce((flattenArray, guestArray) => flattenArray.concat(guestArray), []); 
}