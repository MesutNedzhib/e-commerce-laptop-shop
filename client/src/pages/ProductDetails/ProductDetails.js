import React, { useEffect } from "react";
import "./ProductDetails.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, Zoom } from "swiper";

import { useLocation } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/zoom/zoom.scss";
import "swiper/components/scrollbar/scrollbar.min.css";
import LocationBar from "../../components/LocationBar/LocationBar";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import { addToCart } from "../../actions/cartActions";

SwiperCore.use([Navigation, Pagination, Scrollbar, Zoom]);

function ProductDetails() {
  const { loading, error, productById } = useSelector(
    (state) => state.productList
  );

  const location = useLocation();
  const dispatch = useDispatch();

  const productId = location.pathname.split("/")[2];

  const addToCartHandle = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const arr = ["PRODUCTS", `${productById?.name}`];
  const path = ["/products"];

  return (
    <div className="product__details__container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox message={error} variant="error"></MessageBox>
      ) : (
        <>
          <LocationBar arr={arr} path={path} />
          <div className="product__details">
            <div className="product__details__header">
              <h2>{productById?.name.toUpperCase()}</h2>
            </div>
            <div className="product__details__body">
              <div className="product__details__body__left__side">
                <div className="swiper__loop__roll">
                  {productById ? (
                    <Carousel
                      showStatus={false}
                      showArrows={false}
                      showIndicators={false}
                      // emulateTouch
                      // infiniteLoop
                      autoPlay={false}
                    >
                      {productById?.images.map((item, index) => (
                        <img
                          key={index}
                          className={`product__image__small`}
                          src={item}
                          alt={item}
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="product__details__body__right__side">
                <div className="product__cpu">
                  {/* <img
                    id="cpu"
                    src="https://www.flaticon.com/svg/vstatic/svg/1242/1242910.svg?token=exp=1614601909~hmac=7c6105aedea3409db0408f91d7feab7c"
                    alt=""
                    className="product__specification__image"
                  /> */}
                  <h4>{productById?.processor}</h4>
                </div>
                <div className="product__memory">
                  {/* <img
                    id="memory"
                    src="https://www.flaticon.com/svg/vstatic/svg/18/18033.svg?token=exp=1614601259~hmac=d1dc839218cd0fa27e130717bbfbaa04"
                    alt=""
                    className="product__specification__image"
                  /> */}
                  <h4>{productById?.memory}GB</h4>
                </div>
                <div className="product__video">
                  {/* <img
                    src="https://www.flaticon.com/svg/vstatic/svg/22/22864.svg?token=exp=1614604208~hmac=1c9de5bc746b6b258a3646a8bf6df01d"
                    alt=""
                    className="product__specification__image"
                  /> */}
                  <h4>Nvidia Gefroce 4 GB</h4>
                </div>
                <div className="product__storage">
                  {/* <img
                    src="https://www.flaticon.com/svg/vstatic/svg/2533/2533243.svg?token=exp=1614609839~hmac=6f472a375fc220f5f60b6b2ec9301930"
                    alt=""
                    className="product__specification__image"
                  /> */}
                  <h4>512 GB</h4>
                </div>
                <div className="product__buy">
                  <span>{productById?.price}</span>
                  <button
                    onClick={() =>
                      addToCartHandle({
                        _id: productById._id,
                        image: productById.images[0],
                        name: productById.name,
                        processor: productById.processor,
                        memory: productById.memory,
                        video: productById.video,
                        storage: productById.storage,
                        price: productById.price,
                        quantity: 1,
                        product: productById._id,
                      })
                    }
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
