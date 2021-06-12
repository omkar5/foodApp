import { Fragment, useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isSubmitting,setisSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);
  const [isCheckOut,setCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler =() =>{
    setCheckout(true);
  }

  const submitOrderHandler = async (userData) =>{
    setisSubmitting(true);
    const itemId=[];
    for(var item=0;item < cartCtx.items.length;item++){
      itemId.push(cartCtx.items[item].id);
    }
    const response=await fetch('http://localhost:8080/api/v1/user/save',{
      method:'POST',
      body: JSON.stringify({
        "firstName":userData.firstName,
        "address":userData.address,
        "meals":itemId
      }),
      headers:{"Content-Type":"application/json"}
    });
    if(response){
      alert("saved!!!")
    }
    setisSubmitting(false);
    setDidSubmit(true);
  };
  const modalActions = (<div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>);

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModal = ( <Fragment>
          {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onConfirm = {submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckOut && modalActions}      
  </Fragment>);
  const isSubmittingContent= <p>Sending order</p>;
  const doneSubmitting= <p>Successfull!!!</p>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && doneSubmitting}
    </Modal>
  );
};

export default Cart;
