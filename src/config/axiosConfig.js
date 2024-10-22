import axios from "axios";

// 1. 기본 요청 생성
const jwt = localStorage.getItem("jwt")

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DEV_SERVER,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : jwt == null ? '' : `Bearer ${jwt}`
    },
})

// 2. 요청 인터셉터 생성
axiosInstance.interceptors.request.use(
    // 요청 전 로직 처리 (예: 인증 토큰 추가)
    (config) => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers['Authorization'] = ``;
        // }
        return config;
    },
    // 요청 오류 처리
    (error) => {
        return Promise.reject(error);
    }
)

// 3.응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    // 응답 데이터 처리
    (response) => {
        return response.data;
    },
    // 에러 처리 로직
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response);

            if (error.response.status === 401) {  // 특정 오류 처리
                alert("세션이 만료되었습니다.")
                localStorage.removeItem("jwt")
                window.location.replace("/")
            }

        } else if (error.request) { // 요청은 보내졌지만 응답이 없는 경우
            console.error('No response received:', error.request);

        } else { // 다른 종류의 에러
            console.error('Axios error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;