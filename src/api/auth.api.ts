import { Endpoints } from '../common/enums/endpoints.enum';
import { requestHeaders, baseUrl } from '../constant';
import { APIService } from '../services/API.service';
import { ApiResponse, GetTokenResponse } from '../common/types'
import { APIMethod } from '../common/enums/api-method.enum'

const api = new APIService().setHeaders(requestHeaders).setMethod(APIMethod.POST)

export const getAuthToken = (): Promise<ApiResponse<GetTokenResponse>> => {
	return fetch(baseUrl + Endpoints.get_auth_token , api.request())
		.then(res =>  res.json().then(data => ({status: res.status, body: data})))
		.then(data => {			
		  const response: ApiResponse<GetTokenResponse> = data;
		  return response;
		})
}