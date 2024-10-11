/* ID 체크 
    - 3글자 이상 10글자 이하
    - 반드시 소문자 포함
    - 추가적으로 대문자, 숫자 가능
*/
export const idValidation = (id) =>{
	const idRegex = /^(?=.*[a-z])[a-zA-Z\d]{3,10}$/
    return idRegex.test(id)
}


/* email 체크 
    - 이메일 형식
*/
export const emailValidation = (email) =>{
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return emailRegex.test(email)
}
	

/* nickname 체크 
    - 최소 2글자, 최대 8글자
    - 한글,영어,숫자 사용가능
*/
export const nicknameValidation = (nickname) =>{
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/
    return nicknameRegex.test(nickname)
}

/* password 체크 
    - 최소 5글자, 최대 20글자
    - 최소 하나의 소문자, 대문자, 숫자를 반드시 포함
    - 특수문자 사용 가능
*/
export const passwordValidation = (pw) =>{

	const pwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,20}$/
	return pwRegex.test(pw)
}