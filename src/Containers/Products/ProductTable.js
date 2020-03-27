import React from 'react';
import ProductRow from './ProductRow.js';
import SortableColumnHeader from './SortableColumnHeader.js';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.sortByKeyAndOrder = this.sortByKeyAndOrder.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      sort: {
        column: 'firstName',
        direction: 'desc'
      }
    };
  }
  sortByKeyAndOrder(objectA, objectB) {
    let isDesc = this.state.sort.direction === 'desc' ? 1 : -1;
    let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
    if (a > b) {
      return 1 * isDesc;
    }
    if (a < b) {
      return -1 * isDesc;
    }
    return 0;
  }
  sortProducts() {
    let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
    return productsAsArray.sort(this.sortByKeyAndOrder);
  }

  handleSort(column, direction) {
    this.setState({
      sort: {
        column: column,
        direction: direction
      }
    });
  }
  render() {
    //console.log('productstable state : ', this.state)
    var rows = [];
    this.sortProducts().forEach((product) => {
      if (typeof (product.firstName) !== 'undefined') {
        if (product.firstName.toLowerCase().indexOf(this.props.filterFirst.toLowerCase()) === -1
          || product.lastName.toLowerCase().indexOf(this.props.filterLast.toLowerCase()) === -1
          || product.email.toLowerCase().indexOf(this.props.filterEmail.toLowerCase()) === -1
          || product.phoneNumber.toLowerCase().indexOf(this.props.filterPhone.toLowerCase()) === -1) {
          return;
        }

        rows.push(<ProductRow product={product} key={product.id}></ProductRow>);
      }
    });

    return (
      <div>
        <table className="table table-striped table-hover  table-sm">
          <colgroup>
            <col span="4" width="26%"></col>
          </colgroup>
          <thead>
            <tr>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="firstName"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="lastName"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="email"
              ></SortableColumnHeader>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="phoneNumber"
              ></SortableColumnHeader>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductTable;