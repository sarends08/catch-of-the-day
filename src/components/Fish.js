import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from "../helpers";

class Fish extends React.Component {
    //For regular React components, PropTypes will go inside the component
    static propTypes = {
        details: PropTypes.shape ({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func.isRequired
    }
    render() {
        // Destructured variables
        // the same as const image = this.props.details.image (same for name)
        const {image, name, price, desc, status}  = this.props.details;
        const isAvailable = status === "available";
        return (
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)} >{isAvailable ? 'Add To Cart' : 'Sold Out'}</button>
            </li>
        )
    }
}

export default Fish;