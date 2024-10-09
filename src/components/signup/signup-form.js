import { useState } from 'react';
import style from './signup-form.module.css';

const SignupForm = () =>{
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordToggle = ()=>{
        setShowPassword(!showPassword)
    }

    return (
        <section className={`${style['signup-form-section']}`}>
        <p className={`${style['header-text']}`}> 회원가입 </p>
            <form name="signupForm" className={`${style['signup-form']} base__lblue br-15 box-shadow`}  action="post">
                <p className={`fs-20__b`}> 회원 정보</p>
                <div className={`${style['signup-essential']}`}>
                    <div>
                        <input className={`box-shadow`} type="text" name="signup_id" placeholder="ID : *소문자를 포함 5~13 글자 / 대문자 및 숫자 사용가능" />
                    </div>
                    <div>
                        <input className={`box-shadow`}  type={showPassword ? "text" : "password"} name="signup_pw" placeholder="PW : *최소 한개의 소문자, 대문자, 숫자를 포함 10~20 글자 / 특수문자 사용가능" />
                        {showPassword ? 
                            <img className={`${style['password-eye']}`} src={`/icons/eye.png`} onClick={handlePasswordToggle} alt="password-eye" />
                            :                  
                            <img className={`${style['password-eye']}`} src={`/icons/eye-closed.png`} onClick={handlePasswordToggle} alt="password-eye" />
                        }
                    </div>
                    <div>
                        <input className={`box-shadow`} type="text" name="signup_email" placeholder="EMAIL : 이메일 형식" />
                    </div>
                    <div>
                        <input className={`box-shadow`} type="text" name="signup_name" placeholder="NAME : 2~4글자의 한글" />
                    </div>
                    <div>
                        <input className={`box-shadow`} type="text" name="signup_nickname" placeholder="NICKNAME : 20자 이내의 영어,한글" />
                    </div>
                </div>
	            <button className={`btn-big__blue `}>    
	                회원가입
	            </button>
            </form>
        </section>
    )
}

export default SignupForm