import React, {Component, useState } from 'react'
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import * as action from '../store/actions/index';
import * as actionTypes from '../store/actions/actionType';
import ProductList from '../components/Product/ProductList';
import jQuery from 'jquery';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
class SearchProduct extends Component {
    render(){
    const [data, setData] = useState([])

    const openLoginModal = () => {
        jQuery('#Login-model').modal('show')
    }



    const addToWishlist = (userid, productid) => {
        this.props.load();
        this.props.addToWishlist(userid, productid)
    }

    const inWishlist = (wishlist, productId) => {
        if (wishlist) {
            let wishlistProductIds = [];
            this.props.wishlist.map(wishlist => {
                wishlistProductIds.push(
                    wishlist.product.id
                )
                return wishlistProductIds;
            })
            if (wishlistProductIds.indexOf(productId) !== -1) {
                return true;
            }
        }
        return false;
    }


    const isInCart = (productID) => {
        if (this.props.cartItems.length) {
            let cartProductsIds = []
            this.props.cartItems.map(item => {
                return cartProductsIds.push(item.product.id);

            })

            if (cartProductsIds.indexOf(productID) !== -1) {
                return true
            }
        }
        return false
    }

    async function search(search_item) {
        let result = await fetch("http://localhost:8000/api/search/" + search_item);
        result = await result.json();
        setData(result)
    }
    return (
        <div className="col-sm-6 offset-sm-3">
            <div className='product-list'>

                <div className='product-image'>
                    {/* <figure> */}

                        {/* <img src={'http://localhost:8000' + (this.props.product.product_image[0])} alt="" /> */}
                        {/* <figcaption> */}

                            {/* <div className='product-cart' title='Add to cart' onClick={this.props.authenticated ? */}
                                {/* isInCart(this.props.product.id) ? */}
                                    {/* () => { */}
                                        {/* Toast.fire({ */}
                                            {/* icon: 'error', */}
                                            {/* title: 'Item is already in your Cart' */}
                                        {/* }) */}
                                    {/* } */}
                                    {/* : */}
                                    {/* () => { */}
                                        {/* this.props.addToCart(this.props.product) */}
                                    {/* } */}
{/*  */}
                                {/* : openLoginModal */}
                            {/* }> */}
                                {/* <i className='fas fa-shopping-cart'></i> */}
                            {/* </div> */}
{/*  */}

                            {/* {this.props.loading ? "" : */}
                                {/* <div className='product-wishlist' title='Add to wishlist' */}
                                    {/* onClick={this.props.authenticated ? inWishlist(this.props.wishlist, this.props.product.id) ? */}
                                        {/* () => { */}
                                            {/* Toast.fire({ */}
                                                {/* icon: 'error', */}
                                                {/* title: 'Item is already in your Wishlist' */}
                                            {/* }) */}
                                        {/* } */}
                                        {/* : () => { */}
                                            {/* addToWishlist(this.props.user.id, this.props.product.id) */}
                                        {/* } */}
                                        {/* : openLoginModal}> */}
                                    {/* <i className='fas fa-heart'></i> */}
                                {/* </div> */}
                            {/* } */}


                            {/* <div className='product-wishlist' title='view details'> */}
                                {/* <i className='far fa-eye'></i> */}
                            {/* </div> */}

                        {/* </figcaption> */}
                        {/* <Link className='store' to={'/store/' + this.props.product.product_store[0].id} title="store"> */}
                            {/* <i className='fas fa-store-alt mr-1'></i> {this.props.product.product_store[0].name} */}
                        {/* </Link> */}
{/*  */}
                        {/* <div className='category'> */}
                            {/* <ul> */}
                                {/* { */}
                                    {/* this.props.product.product_category.map(cat => { */}
                                        {/* return ( */}
                                            {/* <li key={cat.id}><Link to={'/category/' + cat.id}  >{cat.name}</Link></li> */}
                                        {/* ) */}
                                    {/* }) */}
                                {/* } */}
                            {/* </ul> */}
                        {/* </div> */}
                    {/* </figure> */}
                </div>
                <div className="product-details">
                    {/* <h5 className="text-center" >{this.props.product.title}</h5> */}
                    {/* <p className="price"><span>Price : </span>Rs {this.props.product.price}</p> */}
                </div>
            </div>
        </div>
    )
}
}
const mapStateToProps = state => {
    return {
        wishlist: state.wishlist.wishlist,
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        loading: state.wishlist.loading,
        cartItems: state.cart.cartItems,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToWishlist: (userId, productId) => dispatch(action.ADD_TO_WISHLIST(userId, productId)),
        load: () => dispatch({ type: actionTypes.WISHLIST_FETCH_START }),
        addToCart: (product) => dispatch(action.addToCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
