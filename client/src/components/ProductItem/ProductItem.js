import React from "react";
import "./ProductItem.css";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";


function ProductItem({
  _id,
  images,
  name,
  processor,
  memory,
  video,
  storage,
  price,
}) {
  const dispatch = useDispatch();

  const addToCartHandle = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product__item">
      <Link to={`/product/${_id}`}>
        <img src={images[0]} alt={images[0]} />
      </Link>

      <div className="product__item__body">
        <Link to={`/product/${_id}`}>
          <p>{name}</p>
        </Link>

        <ul>
          <li>
            <CheckSharpIcon className="icon" /> <span>{processor}</span>
          </li>
          <li>
            <CheckSharpIcon className="icon" /> <span>{memory} GB</span>
          </li>
          <li>
            <CheckSharpIcon className="icon" /> <span>{video}</span>
          </li>
          <li>
            <CheckSharpIcon className="icon" /> <span>{storage}</span>
          </li>
        </ul>
      </div>
      <div className="product__item__bottom">
        <div className="product__item__bottom__price">{price}</div>
        <div
          className="product__item__bottom__buy"
          onClick={() =>
            addToCartHandle({
              _id: _id,
              image: images[0],
              name: name,
              processor: processor,
              memory: memory,
              video: video,
              storage: storage,
              price: price,
              quantity: 1,
              product: _id,
            })
          }
        >
          <AddShoppingCartIcon />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
