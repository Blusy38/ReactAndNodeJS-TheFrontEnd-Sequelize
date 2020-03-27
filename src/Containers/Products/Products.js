import React from 'react';
import Filters from './Filters.js';
import ProductTable from './ProductTable.js';
//import ProductForm from './ProductForm';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFirst: '',
      filterLast: '',
      filterEmail:'',
      filterPhone: '',
      isLoaded: false
    };

    this.handleFilter = this.handleFilter.bind(this);
  }
  //Called immediately after a component is mounted.
  componentDidMount() {
    console.log("Call componentDidMount")
    this.getAllUsers()
  }

  //Get All Users in allUsers[]
  getAllUsers() {
    console.log("Call getAllUsers")
    fetch('/users')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            mode: 'edit',
            products: result
          });
        }, (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleFilter(filterInput) {
    this.setState(filterInput);
  }
  
  render() {
    if (!this.state.isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
          <Filters
            filterFirst={this.state.filterFirst}
            filterLast={this.state.filterLast}
            filterEmail={this.state.filterEmail}
            filterPhone={this.state.filterPhone}
            onFilter={this.handleFilter}
          ></Filters>
          <ProductTable
            products={this.state.products}
            filterFirst={this.state.filterFirst}
            filterLast={this.state.filterLast}
            filterEmail={this.state.filterEmail}
            filterPhone={this.state.filterPhone}
          ></ProductTable>
        </div>
      );
    }
  }
}

export default Products;