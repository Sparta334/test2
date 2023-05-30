import { useDispatch, useSelector} from "react-redux";
import { addCartItems, selectCartItems ,removeCartItems } from "../../../redux/CartSlice";
import { Modal , Button, Select } from "antd";
import { Link } from "react-router-dom";
import { CartIcon } from "../CartSummary/Icons";
import styles from "./basketmodal.module.css"
const { Option } = Select;




export default function BasketModel( {isOpen , toggleModal} ){

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems );

    const handleCancel = () => toggleModal(!isOpen);
    const getTotalPrice = () =>{
    
        return (cartItems.length > 0) ? cartItems.reduce((sum , item)  => sum +  item.price * item.qty , 0 ): 0 ;
    
    
    }


    console.log(cartItems);

    return (
        
        
        <Modal
            title="Shopping Basket"
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {cartItems.length === 0 ? (
            
                <div> Cart is empty </div>
            ) :(
                
                cartItems.map((item , index) => (

                    <li key={index}>
                        <Link to={`/pages/${item.name}`}>
                            <div onClick={handleCancel}>
                                <img src={item.image} alt={item.name} />
                            </div>
                        </Link>


                    

                    <div >
                         <div > {item.ProductName} </div>
                         <div > Qty :{"  "}
                            <Select
                                defaultValue={item.qty}
                                onChange={(qty) => dispatch(addCartItems({
                                    
                                    imageUrl: item.image,
                                    name : item.name,
                                    price : item.price,
                                    countInStock: item.countInStock,
                                    qty,

                                
                                
                                })) }
                                >

                                        {[...Array(item.countInStock).keys()].map((x) => (
                                    <Option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </Option>
                                ))}
                                </Select>
                         
                         </div>

                    </div>
                    <div>
                     <div className={styles.price}>
                        ${item.price * item.qty}
                     </div>
                     <div className={styles.delete} onClick={() => dispatch(removeCartItems(item.name))}>
                       刪除
                     </div>
                  </div>

                    </li>
                ))
                
            )}

        <div className={styles.wrap}>
            Total
            <div className={styles.totalPrice}>${getTotalPrice()}</div>
         </div>
            <Button  type="primary">
            <CartIcon size={20} color={"#ffffff"}/>
               <span style={{marginLeft : 12 }}>  Start Checkout </span>
                

            </Button>



        </Modal>    
        
        
    );



}