import React from "react";
import ImageSliderLarge from "../../components/ImageSlider/ImageSlider-L/ImageSliderLarge";
import ImageSliderSmall from "../../components/ImageSlider/ImageSlider-S/ImageSliderSmall";
import "./Home.css";

function Home() {
  const hpBanners_L = [
    "https://www.digitaldreamsjaipur.com/wp-content/uploads/2020/05/HP-Business-Laptop__Section-Banner.jpg",
  ];
  const asusBanners_L = [
    "https://www.digitaldreamsjaipur.com/wp-content/uploads/2020/05/ASUS-Gamimg-Laptop__Section-Banner.jpg",
    "https://i.pinimg.com/originals/76/2b/a2/762ba2bf06f1b06afe05db59024a6990.jpg",
  ];

  // Container S-mall
  const acerBanners_S = [
    "https://laptop.bg/system/landing_pages/laptop/acer_aspire_5/aspire_5_newBanner2.png",
    "https://i0.wp.com/prebiu.com/wp-content/uploads/2020/05/The-New-Acer-Swift-3-Lands-in-Malaysia_Visual-1.jpg?fit=1281%2C721&ssl=1",
    "https://acerthailand.com/wp-content/uploads/2019/05/Homepage-Banner-Full.jpg",
  ];

  const msiBanners_S = [
    "https://www.techtipsmedia.com/wp-content/uploads/2019/01/Banner_1200x600-1.jpg",
    "https://www.slashgear.com/wp-content/uploads/2015/10/Banner_bg_gs40-800x420.jpg",
  ];

  return (
    <div className="home">
      <div className="home__product__banners__container">
        <div className="left__side">
          <ImageSliderLarge array={hpBanners_L} brand={"Hp"} />
          <ImageSliderSmall array={acerBanners_S} brand={"Acer"} />
          <ImageSliderLarge array={hpBanners_L} brand={"Hp"} />
        </div>
        <div className="center__side">
          <ImageSliderLarge array={asusBanners_L} brand={"Asus"} />
          <ImageSliderSmall array={msiBanners_S} brand={"MSI"} />
          <ImageSliderLarge array={asusBanners_L} brand={"Asus"} />
        </div>
        <div className="right__side">
          <ImageSliderLarge array={hpBanners_L} brand={"Hp"} />
          <ImageSliderSmall array={acerBanners_S} brand={"Acer"} />
          <ImageSliderLarge array={hpBanners_L} brand={"Hp"} />
        </div>
      </div>
    </div>
  );
}

export default Home;
