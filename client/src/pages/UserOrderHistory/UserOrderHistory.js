import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserOrderHistory.css";
import { useHistory } from "react-router-dom";
import MessageBox from "../../components/MessageBox/MessageBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import { getMineOrderList } from "../../actions/orderActions";
import OrderItem from "../../components/OrderItem/OrderItem";

function UserOrderHistory() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userOrders = useSelector((state) => state.userOrders);
  const { loading, orders, error } = userOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMineOrderList());
    }
  }, [history, userInfo, dispatch]);

  return (
    <div className="user__order__history">
      <div className="order__history__header">User Order History</div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox message={error} variant={"error"}></MessageBox>
      ) : orders.length === 0 ? (
        <MessageBox message={"Order is empty"} variant={"info"}></MessageBox>
      ) : (
        <div className="order__history__body">
          {orders.map((item, index) => (
            <OrderItem
              key={index}
              orderItems={item.orderItems}
              date={item.createdAt.substring(0, 10)}
              totalPrice={item.totalPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrderHistory;
