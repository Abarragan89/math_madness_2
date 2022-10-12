// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from 'react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from '../styles/numberSwiper/numberSwiper.module.css';

// import required modules
import { Pagination } from "swiper";

export default function App({ finalAnswer, assessResponse, isText}) {
    // const [swiper1, setSwiper1] = useState<number>(0)
    // const [swiper2, setSwiper2] = useState<number>(0)
    // const [swiper3, setSwiper3] = useState<number>(0)
    const swiper1 = useRef<number>(0)
    const swiper2 = useRef<number>(0)
    const swiper3 = useRef<number>(0)

    // function checkAnswer() {
    //     if (isText) {
    //         assessResponse();
    //     } else {
    //         finalAnswer.current = (parseInt(swiper1.toString() + swiper2.toString() + swiper3.toString()))
    //         assessResponse();
    //     }
    // }
    function setFinalAnswer() {
        finalAnswer.current = (parseInt(swiper1.current.toString() + swiper2.current.toString() + swiper3.current.toString()))
    }
    return (
        <div className={styles.numberSwipeDiv}>
            <Swiper
                onRealIndexChange={index => {
                    swiper1.current = index.realIndex;
                    setFinalAnswer();
                }}
                direction={"vertical"}
                modules={[Pagination]}
                className={styles.swiper}
            >
                <SwiperSlide>0</SwiperSlide>
                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
                <SwiperSlide>4</SwiperSlide>
                <SwiperSlide>5</SwiperSlide>
                <SwiperSlide>6</SwiperSlide>
                <SwiperSlide>7</SwiperSlide>
                <SwiperSlide>8</SwiperSlide>
                <SwiperSlide>9</SwiperSlide>
            </Swiper>
            <Swiper
                direction={"vertical"}
                onRealIndexChange={index => {
                    swiper2.current = index.realIndex;
                    setFinalAnswer();
                }}
                modules={[Pagination]}
                className={styles.swiper}
            >
                <SwiperSlide>0</SwiperSlide>
                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
                <SwiperSlide>4</SwiperSlide>
                <SwiperSlide>5</SwiperSlide>
                <SwiperSlide>6</SwiperSlide>
                <SwiperSlide>7</SwiperSlide>
                <SwiperSlide>8</SwiperSlide>
                <SwiperSlide>9</SwiperSlide>
            </Swiper>
            <Swiper
                onRealIndexChange={index => {
                    swiper3.current = index.realIndex;
                    setFinalAnswer();
                }}
                direction={"vertical"}
                modules={[Pagination]}
                className={styles.swiper}
            >
                <SwiperSlide>0</SwiperSlide>
                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
                <SwiperSlide>4</SwiperSlide>
                <SwiperSlide>5</SwiperSlide>
                <SwiperSlide>6</SwiperSlide>
                <SwiperSlide>7</SwiperSlide>
                <SwiperSlide>8</SwiperSlide>
                <SwiperSlide>9</SwiperSlide>
            </Swiper>
        </div>
    );
}
