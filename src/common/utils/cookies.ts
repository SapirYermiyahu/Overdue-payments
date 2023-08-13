export const getCookie = (cookieName: string) => {
	return document.cookie.split(";").find((row) => row.startsWith(`${cookieName}=`))?.split("=")[1];
	;
}

export const setCookie = (cookieName: string, cookieValue: string, cookieExp: Date) => {
	document.cookie = cookieName + " = " + cookieValue + "; expires = " + cookieExp;
}