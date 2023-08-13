import { Endpoints } from '../common/enums/endpoints.enum';
import { requestHeaders, baseUrl, AUTH_COOKIE } from '../constant';
import { APIService } from '../services/API.service';
import { ApiResponse, GetPaymentsResponse } from '../common/types'
import { APIMethod } from '../common/enums/api-method.enum'
import { getCookie } from '../common/utils/cookies'

const api = new APIService().setHeaders(requestHeaders).setMethod(APIMethod.GET)

export const getPayments = (paymentId: string = ''): Promise<ApiResponse<GetPaymentsResponse[]>> => {
	if(paymentId){
		paymentId = '/' + paymentId
	}
	const authToken = getCookie(AUTH_COOKIE)
	return fetch(baseUrl + Endpoints.get_payments + paymentId + '?authToken=' + authToken , api.request())
		.then(res =>  res.json().then(data => ({status: res.status, body: data.result})))
		.then(data => {			
		  const response: ApiResponse<GetPaymentsResponse[]> = data;
		  return response;
		})
}