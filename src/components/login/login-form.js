import { Link } from 'react-router-dom';
import style from './login-form.module.css';
import { useState } from 'react';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordToggle = ()=>{
        setShowPassword(!showPassword)
    }

    return (
        <section className={`${style['login-form-section']}`}>
            <p className={`${style['header-text']}`}> 로그인 </p>
            <form name="loginForm" className={`${style['login-form']} base__lblue br-15 box-shadow`} action="" method="post" >
                <div className={`${style['login-essential']} mt-20`}>
                    <div>
                        <input className={`box-shadow`} type="text" name="login_id" placeholder="아이디를 입력해주세요"/>
                    </div>
                    <div>
                        <input className={`box-shadow`} type={showPassword ? "text" : "password"} name="login_pw" placeholder="패스워드를 입력해주세요"/>
                        {showPassword ? 
                            <img className={`${style['password-eye']}`} src={`/icons/eye.png`} onClick={handlePasswordToggle} alt="password-eye" />
                            :                  
                            <img className={`${style['password-eye']}`} src={`/icons/eye-closed.png`} onClick={handlePasswordToggle} alt="password-eye" />
                        }
                    </div>
                </div>
                <button className={`btn-big__blue`}>
                    로그인
                </button>
                <div className={`${style['term-check-div']} checkbox__blue`}>
                    <input className={`${style['term-check']}`} type="checkbox" id="stay-login" name="stay_login" />
                    <label htmlFor="stay-login" className={`fs-14`}>로그인 상태유지</label>
                </div>
                <div className={`${style['login-sub']}`}>
                    <div>
                        <Link className={`fc__gray text-hover__gray`} to={`/findInfo/findId`}> 아이디 찾기 </Link>
                        |<Link className={`fc__gray text-hover__gray`} to={'/findInfo/findPw'}> 비밀번호 찾기</Link>
                        |<Link className={`fc__gray text-hover__gray`} to={`/signup`}>회원가입 </Link>
                    </div>
                    <img src={`/logo/logo_main.png`} alt="logo" />
                </div>
            </form>
        </section>
    );
};

export default LoginForm;