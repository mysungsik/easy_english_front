import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import style from "./dashboard-slider.module.css"

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const DashboardMainSlider = () =>{
    return (
        <div className={`${style['dashboard-slider']}`}>
            <Swiper
                pagination={{
                dynamicBullets: true,
                }}
                modules={[Pagination]}
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
                            <img src='ads/study_large2.png'/>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    )
}

export default DashboardMainSlider