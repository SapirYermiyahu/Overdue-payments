import { Endpoints } from '../common/enums/endpoints.enum';
import { requestHeaders, baseUrl, AUTH_COOKIE } from '../constant';
import { APIService } from '../services/API.service';
import { ApiResponse, CreatePayemntError, CreatePaymentBody, PaymentResponse } from '../common/types'
import { APIMethod } from '../common/enums/api-method.enum'
import { getCookie } from '../common/utils/cookies'

const api = new APIService().setHeaders(requestHeaders).setMethod(APIMethod.POST)

export const createPayment = (createPaymentBody: CreatePaymentBody): Promise<ApiResponse<PaymentResponse | CreatePayemntError>> => {
	const authToken = getCookie(AUTH_COOKIE)
	return fetch(baseUrl + Endpoints.post_payment + '?authToken=' + authToken , api.request(createPaymentBody))
		.then(res =>  res.json().then(data => ({status: res.status, body: data.result})))
		.then(data => {			
		  const response: ApiResponse<PaymentResponse | CreatePayemntError> = data;
		  return response;
		})
}