import { Button, notification } from "antd"
import { useDispatch } from "react-redux";
import { addCartItems } from "../../../redux/CartSlice";
import styles from "./addtobasket.module.css"
import { CartIcon } from "../CartSummary/Icons";

export default function AddToCart({ product, qty }) {
  const dispatch = useDispatch();

  const openNotification = () => {
    notification.open({
      message: 'Shopping Notification',
      description:
        `${qty} ${qty > 1 ? "pieces" : "piece"} of ${product.ProductName} ${qty > 1 ? "have" : "has"} been added to your cart.`,
      placement: 'bottomRight'
    });
  };

  const addToCart = () => {
    openNotification();
    dispatch(addCartItems({
      name: product.ProductName,
      image: product.imageUrl,
      price: product.Price,
      countInStock: product.countInStock,
      qty,
    }))
  };

  return (
    <Button type="primary" className={styles.btn} onClick={addToCart}>
      
      <CartIcon size={35} color={"#ffffff"} />Add To Basket
    </Button>
  );
}
