import React, {useState} from "react";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'

const SliderData =[
    {
        imageUrl:'https://media.betzonelab.com/slideshow/img1_6239edd791841.jpeg'
    },
    {
        imageUrl:'https://media.betzonelab.com/slideshow/img2_6239ffec6c6ba.jpeg'
    },
    {
        imageUrl:'https://media.betzonelab.com/slideshow/img3_623a02ea891fd.jpeg'
    },
    {
        imageUrl:'https://media.betzonelab.com/slideshow/img4_623aa7e6a51a7.jpeg'
    },
    {
        imageUrl:'https://media.betzonelab.com/slideshow/img5_623c441b1bec9.jpeg'
    },
    {
        imageUrl:'https://media.betzonelab.com/slideshow/img6_623c487160578.jpeg'
    }
]

const ImageSlider = (slides) => {
    const [current, setCurrentImage] =useState(0);
    const length = slides.slides.length;
    
    if (!Array.isArray(slides.slides) || length <= 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentImage (current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrentImage (current === 0 ? length - 1 : current - 1);
    }

  return (
    <>
    <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
    <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {SliderData.map((slide,index)=>{
            return(
                <div className={index === current ? 'slide-active' : 'slide'} key={index}>
                    {index === current && (<img src={slide.imageUrl} alt="immagine1" className="image"/>)}
                </div>
            )
        })}
    </>
  )
}

export {ImageSlider};
export {SliderData};