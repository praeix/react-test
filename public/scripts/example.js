var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="3">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.desc}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table className="table table-bordered table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked,
      this.refs.sortInput.value
    );
  },
  render: function() {
    return (
      <form className="margin-bottom-2em">
        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              ref="filterTextInput"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              id="stock"
              type="checkbox"
              checked={this.props.inStockOnly}
              ref="inStockOnlyInput"
              onChange={this.handleChange}
            />
            <label className="text-normal" htmlFor="stock">Only show products in stock</label>
          </div>
          <div className="col-md-6">
            <input
              className="btn btn-primary"
              id="sort"
              type="button"
              ref="sortInput"
              onChange={this.handleChange}
              value="Sort"
            />
          </div>
        </div>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});

var MainApp = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Pizza App with ReactJS</h1>
        </div>
        <FilterableProductTable products={PRODUCTS} />
      </div>
    );
  }
});

var PRODUCTS = [
  {"id": 1, "category": "Pizza", "name": "Cheese", "desc": "Classic marinara sauce topped with whole milk mozzarella cheese.", "price": 9.99, "stocked": true},
  {"id": 2, "category": "Pizza", "name": "Pepperoni", "desc": "Classic marinara sauce with authentic old-world style pepperoni.", "price": 10.99, "stocked": true},
  {"id": 3, "category": "Pizza", "name": "Sausage", "desc": "Classic marinara sauce with all-natural Italian sausage.", "price": 10.99, "stocked": false},
  {"id": 4, "category": "Pizza", "name": "Meat Lovers", "desc": "Classic marinara sauce, authentic old-world pepperoni, all-natural Italian sausage, slow-roasted ham, hardwood smoked bacon, seasoned pork and beef.", "price": 13.99, "stocked": true},
  {"id": 5, "category": "Pizza", "name": "Supreme", "desc": "Classic marinara sauce, authentic old-world pepperoni, seasoned pork, beef, fresh mushrooms, fresh green bell peppers and fresh red onions.", "price": 14.99, "stocked": false}
];

ReactDOM.render(
  <MainApp/>,
  document.getElementById('content')
);
