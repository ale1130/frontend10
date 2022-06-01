import Carousel from 'react-bootstrap/Carousel'
import React, { useState } from "react";

<>
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

    <script
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
    crossorigin></script>

    <script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossorigin></script>

    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"/>
</>

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

function ControlledCarousel(props) {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>

        {SliderData.map((image,indice)=>{
            return(
                <Carousel.Item key={indice}>
                    <img src={image.imageUrl} alt={indice}/>
                    <div className="carousel-caption d-md-block  slide-adv">
                        <div className="content-adv">
                            <div className="button-adv">
                                <a href="#" onClick={props.openForm} className="botton-adv-1">Log in</a>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            )
        })}

      </Carousel>
    </>
    );
}

export default ControlledCarousel;