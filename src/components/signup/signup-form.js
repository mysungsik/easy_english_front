import { useEffect, useState } from 'react';
import style from './signup-form.module.css';
import axiosInstance from '../../config/axiosConfig';
import {useNavigate} from "react-router-dom"
import {idValidation, emailValidation, passwordValidation, nicknameValidation} from "../../util/validation"

const SignupForm = () =>{
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [dupCheck, setDupCheck] = useState({
        idDup : false,
        emailDup : false
    })
    const [validation, setValidation] = useState({
        idValidate : false,
        pwValidate : false,
        emailValidate : false,
        nicknameValidate : false
    })
    const [signupInfo, setSignupInfo] = useState({
        memberId :"",
        memberPw :"",
        memberEmail :"",
        memberNickname :"",
    })

    const handlePasswordToggle = ()=>{
        setShowPassword(!showPassword)
    }

    const handleUserInput = (e) =>{
        const {value, name} = e.target;
        // 스프레드연산자 + dict사용 => 기존값유지 + 새값 받기
        setSignupInfo({...signupInfo, [name] : value})
    }

    // useState 의 첫번째 인자는 반드시 이전값
    const handleValidation = () =>{
        setValidation(prevValidation => ({
                ...prevValidation,
                idValidate: idValidation(signupInfo.memberId) && !dupCheck['idDup'],
                pwValidate: passwordValidation(signupInfo.memberPw),
                emailValidate: emailValidation(signupInfo.memberEmail) && !dupCheck['emailDup'],
                nicknameValidate: nicknameValidation(signupInfo.memberNickname)
            })
        )
    }

    const handleIdDupCheck = async () =>{
        try {
            const response = await axiosInstance.get(`/signup/idDupCheck?memberId=${signupInfo['memberId']}`)
            
            if (response.data){
                setDupCheck((prev)=>({...prev, ['idDup'] : true}))
            }else{
                setDupCheck((prev)=>({...prev, ['idDup'] : false}))
            }
        } catch (error) {
            alert("아이디 중복체크에 실패하였습니다.")
        }
    }

    const handleEmailDupCheck = async() =>{
        try {
            const response = await axiosInstance.get(`/signup/emailDupCheck?memberEmail=${signupInfo['memberEmail']}`)

            if (response.data){
                setDupCheck((prev)=>({...prev, ['emailDup'] : true}))
            }else{
                setDupCheck((prev)=>({...prev, ['emailDup'] : false}))
            }
        } catch (error) {
            alert("이메일 중복체크에 실패하였습니다.")
        }
    }
    
    useEffect(() => {
        handleIdDupCheck();
        handleEmailDupCheck();
    }, [signupInfo.memberId, signupInfo.memberEmail]);

    useEffect(() => {
        handleValidation();
    }, [dupCheck, signupInfo.memberPw, signupInfo.memberNickname]);

    const signup = async (e) =>{
        e.preventDefault()

        try {
            const response = await axiosInstance.post("/signup", signupInfo)
            console.log(response)
            if(response > 0){
                navigate("/login")
            }
        } catch (error) {
            alert("회원가입에 실패하였습니다. 정보를 확인해주세요")
        }
    }

    return (
        <section className={`${style['signup-form-section']} `}>
        <p className={`${style['header-text']} mt-20`}> 회원가입 </p>
            <form name="signupForm" className={`${style['signup-form']} bg__llblue br-15 bs__gray`}>
                <p className={`fs__l fw__b`}> 회원 정보</p>
                <div className={`${style['signup-essential']}`}>
                    <div>
                        <p className={`${style['signup-subtitle']}`}> 회원 아이디 </p>
                        <input className={`bs__gray fs__m`} 
                            type="text" 
                            name="memberId" 
                            onChange={(e)=>handleUserInput(e)} 
                            placeholder="ID : *소문자를 포함 3~10 글자" />
                        { dupCheck['idDup'] ? <p className={`${style['validate-fail']}`}>*아이디가 중복되었습니다.</p> 
                            : validation.idValidate === false && signupInfo.memberId !== ''  
                                ? <p className={`${style['validate-fail']}`}>*아이디 형식이 올바르지 않습니다.</p> 
                                : ''
                        }
                    </div>
                    <div>
                        <p className={`${style['signup-subtitle']}`}> 패스워드 </p>
                        <input className={`bs__gray fs__m`}  
                            type={showPassword ? "text" : "password"} 
                            name="memberPw" 
                            onChange={(e)=>handleUserInput(e)} 
                            placeholder="PW : *최소 한개의 소문자, 대문자, 숫자를 포함 5~20 글자" />
                        {showPassword ? 
                            <img className={`${style['password-eye']}`} src={`/icons/eye.png`} onClick={handlePasswordToggle} alt="password-eye" />
                            :                  
                            <img className={`${style['password-eye']}`} src={`/icons/eye-closed.png`} onClick={handlePasswordToggle} alt="password-eye" />
                        }
                        {validation.pwValidate === false && signupInfo.memberPw !== '' ?  <p className={`${style['validate-fail']}`}> *비밀번호 형식이 올바르지 않습니다.</p> : ''}
                    </div>
                    <div>
                        <p className={`${style['signup-subtitle']}`}>이메일</p>
                        <input className={`bs__gray`} type="text" name="memberEmail" onChange={(e)=>handleUserInput(e)}  placeholder="EMAIL : 이메일 형식" />
                        { dupCheck['emailDup'] ? <p className={`${style['validate-fail']}`}>*이메일이 중복되었습니다.</p> 
                            : validation.emailValidate === false && signupInfo.memberEmail !== ''  
                                ? <p className={`${style['validate-fail']}`}>*이메일 형식이 올바르지 않습니다.</p> 
                                : ''}
                    </div>
                    <div>
                        <p className={`${style['signup-subtitle']}`}>닉네임</p>
                        <input className={`bs__gray`} type="text" name="memberNickname" onChange={(e)=>handleUserInput(e)}  placeholder="NICKNAME : 20자 이내의 영어,한글" />
                        {validation.nicknameValidate === false && signupInfo.memberNickname !== ''  ? <p className={`${style['validate-fail']}`}>*닉네임 형식이 올바르지 않습니다.</p> : ''}
                    </div>
                </div>
	            <button className={`btn-big btn__blue `} type='button' onClick={signup}>    
	                회원가입
	            </button>
            </form>
        </section>
    )
}

export default SignupForm