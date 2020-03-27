import React from 'react';
import './ProductTableHeader.css';

class ProductTableHeader extends React.Component {
  render() {
    
    return(
      <th scope="col-3">
        {console.log(this.props.column)}
        {this.props.column}
        <button className="ProductTableHeader-current">&#x25B2;</button>
        <button>&#x25BC;</button>
      </th>
    );
  }
}

export default ProductTableHeader;