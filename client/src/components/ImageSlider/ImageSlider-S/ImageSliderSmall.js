import React, { useEffect, useState } from "react";
import "./ImageSliderSmall.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsByName } from "../../../actions/productActions";

function ImageSlider_S({ array, brand }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inidicator, setIndicator] = useState(false);

  const offerBrandHandle = () => {
    dispatch(getProductsByName(brand));
    history.push("/products");
  };

  useEffect(() => {
    if (array.length > 1) {
      setIndicator(true);
    }
  }, [setIndicator, array.length]);
  return (
    <div className="image__slider__s">
      <Carousel
        onClickItem={() => offerBrandHandle()}
        showIndicators={inidicator}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        emulateTouch
      >
        {array?.map((item, index) => (
          <img key={index} className="image" src={item} alt="" />
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider_S;
