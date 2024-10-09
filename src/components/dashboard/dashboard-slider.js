import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import style from "./dashboard-slider.module.css"

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const DashboardMainSlider = () =>{

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };


    return (
        <div className={`${style['dashboard-slider']}`}>
            <Swiper
                slidesPerView={'auto'}
                pagination={pagination}
                autoplay={{ delay: 2000, disableOnInteraction: false }} // Autoplay 설정
                modules={[Pagination, Autoplay]} // Autoplay 모듈 추가
                className={`${style['ads-slide']}`}
            >
                <SwiperSlide>
                    <div className={`${style['ad-div']} base__mblue`}>
                        <div className={`${style['ad-info-div']}`}>
                            <div className={`${style['ad-title']} fs-28__b`}>
                                <p className={`fs-28__b mb-4`}> 오늘의 학습</p>
                                <p>AI 를 이용하여 단계별 단어를 학습해보세요!</p>
                                <p>매일 새로운 단어를 학습!</p>   
                            </div>
                            <Link to={"/learn/today"} className={`${style['ad-go']} btn-big__blue base_mblue`}> 학습하러가기 </Link>
                        </div>
                        <div className={`${style['ad-img-div']}`}>
                            <img src='ads/study_large2.png' alt='image2'/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${style['ad-div']} base__lorange`}>
                        <div className={`${style['ad-info-div']}`}>
                            <div className={`${style['ad-title']} fs-28__b`}>
                                <p className={`fs-28__b mb-4`}> 놀면서 영어공부</p>
                                <p>여러가지 게임을 통해 단어를 복습해보세요!</p>
                                <p>행맨에서 최고점수를 기록하세요!!</p>   
                            </div>
                            <Link to={"/game/hangman"} className={`${style['ad-go']} btn-big__dorange`}> 학습하러가기 </Link>
                        </div>
                        <div className={`${style['ad-img-div']}`}>
                            <img src='ads/hangman.png' alt='image2'/>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default DashboardMainSlider