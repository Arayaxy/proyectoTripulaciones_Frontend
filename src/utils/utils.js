export const checkCookieExists = (cookieName) => document.cookie.split(";").some((item) => item.trim().startsWith(`${cookieName}=`));
