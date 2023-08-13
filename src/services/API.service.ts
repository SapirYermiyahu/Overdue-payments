import { KeyValue, ApiMethod } from "../common/types";
import { APIMethod } from "../common/enums/api-method.enum";

/****
  Description: this class is for handling api requests
****/

export class APIService {
	private _authToken: string; // in our case token passed throught query params, so we don't use it inside the class
	private _headers: [string, string][] = [];
	private _method: ApiMethod = "GET";

	constructor (authToken?: string) {
		this._authToken = authToken || ''
	}

	/****
  		Description: this function is for setting headers
		@returns APIService class
	****/
	public setHeaders (headers: KeyValue<string, string>[]): APIService {
		for (const i in headers) {
		  if (headers[i].hasOwnProperty('key')
			&& headers[i].hasOwnProperty('value')) {
			 this._headers.push([
			   headers[i].key, 
			   headers[i].value
			 ]);
		  }
		}
		return this;
	}
	  
	/****
  		Description: this function is for getting the existing headers
		@returns headers (string[][])
	****/
	get headers (): string[][] {
		return this._headers;
	}
	
	/****
  		Description: this function is for reset headers
		@returns void
	****/
	public resetHeaders (): void {
		this._headers = [];
	}

	/****
  		Description: this function is for setting method (GET/POST)
		@returns APIService class
	****/
	public setMethod (newMethod: ApiMethod): APIService {
		this._method = newMethod;
		return this;
	}

	/****
  		Description: this function is for creating an API request
		@returns object
	****/
	public request<T> (body?: T): RequestInit {
		return this._method === APIMethod.GET ? 
  	  	{
      		headers: this._headers,
      		method: this._method,
   	 	} :
		{
			headers: this._headers,
			method: this._method,
			body: JSON.stringify(body),
		}
	}
	
 }