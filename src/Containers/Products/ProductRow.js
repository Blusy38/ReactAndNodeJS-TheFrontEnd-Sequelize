import React from 'react';

class ProductRow extends React.Component {

  
  render() {
    return (
      <tr>
        <td>{this.props.product.firstName}</td>
        <td>{this.props.product.lastName}</td>
        <td>{this.props.product.email}</td>
        <td>{this.props.product.phoneNumber}</td>
      </tr>
    );
  }
}

export default ProductRow;