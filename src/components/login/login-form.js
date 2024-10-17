import { Link, useNavigate } from 'react-router-dom';
import style from './login-form.module.css';
import { useContext, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import UserContext from '../../context/userContext';
import {jwtDecode} from "jwt-decode"

const LoginForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const {user, setUser} = useContext(UserContext)

    const [loginInfo, setLoginInfo] = useState({
        memberId : "",
        memberPw : ""
    });

    const handleUserInput = (e) => {
        setLoginInfo((prev) => {
            const {value, name} = e.target;
            return {
                ...prev, 
                [name] : value
            }
        })
    }

    const handlePasswordToggle = ()=>{
        setShowPassword(!showPassword)
    }

    const login = async (e) => {
        e.preventDefault()

        if (loginInfo.memberId.trim() === '' || loginInfo.memberPw.trim() === ''){
            alert("로그인 정보를 입력해주세요")
        }
        try{
            const response = await axiosInstance.post("/login", loginInfo)
            localStorage.setItem("jwt", response)
            const jwtValue = jwtDecode(response)
            setUser(jwtValue)
            navigate("/")
        
        }catch(error){
            alert("로그인 정보가 잘못되었습니다.")
        }
    }

    return (
        <section className={`${style['login-form-section']}`}>
            <p className={`${style['header-text']}`}> 로그인 </p>
            <form name="loginForm" className={`${style['login-form']} base__lblue br-15 box-shadow`}>
                <div className={`${style['login-essential']} mt-20`}>
                    <div>
                        <input className={`box-shadow`} type="text" name="memberId" placeholder="아이디를 입력해주세요" onChange={(e)=>{handleUserInput(e)}}/>
                    </div>
                    <div>
                        <input className={`box-shadow`} type={showPassword ? "text" : "password"} name="memberPw"  onChange={(e)=>{handleUserInput(e)}} placeholder="패스워드를 입력해주세요"/>
                        {showPassword ? 
                            <img className={`${style['password-eye']}`} src={`/icons/eye.png`} onClick={handlePasswordToggle} alt="password-eye" />
                            :                  
                            <img className={`${style['password-eye']}`} src={`/icons/eye-closed.png`} onClick={handlePasswordToggle} alt="password-eye" />
                        }
                    </div>
                </div>
                <button className={`btn-big__blue`}  onClick={login}>
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