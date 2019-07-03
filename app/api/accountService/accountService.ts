
import httpClient from '@app/config/axios';

import { Profile } from "@app/state/profile/types";
import { ErrorResponse } from '@app/services/errorHandleService/errorHandleService';
import { ErrorHandleService } from '@app/services';

export interface UserDataRequest {
    loginProvider: 'facebook' | 'google';
    loginProviderToken: string; // token from facebook / google
    id?: string; // facebook userId
    deviceId: string;
};

export interface UserDataResponse {
    isNewUser: boolean; // first login
    token: string; // bearer token to api
};

export interface AccountDataResponseDto {
    id:	string
    name: string
    email: string
    description: string
    photo: string
    meetingsNumber:	number
}

class AccountService extends ErrorHandleService {

    public sendUserData(data: UserDataRequest): Promise<UserDataResponse | ErrorResponse> {
        return httpClient.post<UserDataResponse>('/api/Account/token', data)
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to login.'));
    }

    public getUserData(): Promise<AccountDataResponseDto | ErrorResponse> {
        return httpClient.get<AccountDataResponseDto>('/api/Account')
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to fetch User Data.'));
    }

    public updateUserData(name: string, description: string): Promise<Profile | ErrorResponse> {
        return httpClient.put<Profile>('/api/Account', {
            name,
            description
        })
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to update User Data.'));
    }
}

const accountService = new AccountService;

export default accountService;