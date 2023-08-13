export type KeyValue<T, U> = {
	key: T,
	value: U,
  };
  
export type ApiMethod = "POST" | "GET";

export type ApiError = {
  ErrorCode: string,
  Description: string,
};


export type ApiResponse<T> = {
  status: number,
  body: T,
};

export type GetTokenResponse = {
	token: string
}

export type CreatePaymentBody = {
	referenceId: string,
	amount: number,
	cardNumber: string,
	cardExpMonth: number,
	cardExpYear: number,
	note: string,
	processAt: string
}

export type PaymentResponse = {
	id: string,
	referenceId: string,
	amount: number,
	updatedAt: string,
	createdAt: string,
	note: string,
	status: string;
}

export type CreatePayemntError = {
	error: string,
	errorFields: string[]
}

export type DataForTable = {
	id: string,
	bookTitle: string,
	payerName: string,
	amount: number,
	datePaid: string,
	paymentStatus: string
}

export type GetPaymentsResponse = {
	amountPennies: number,
	authTokenId: number,
	createdAt: string,
	id: string,
	note: string,
	processAt: string,
	referenceId: string,
	status: string,
	updatedAt: string
}