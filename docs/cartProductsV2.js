/** public_html */
// @ts-ignore
var app = angular.module ('UI.example.app', ['ui.bootstrap']);
app.controller ('cartProductsCtrl', $scope => {
  $scope.cartProductsResult = {};
  $scope.showResult = false;
  $scope.showError = false;
  $scope.cartProducts = {
    names: '',
    address: '',
    items: [
      {product: 'Lechuga', quantity: 0, price: 10, total: 0},
      {product: 'Tomates', quantity: 0, price: 20, total: 0},
    ],
    quantity: 0,
    total: 0,
  };

  $scope.changeCart = change => {
    change.total = change.price * change.quantity;
  };

  $scope.getQuantity = () => {
    var quantity = 0;
    for (var i = 0; i < $scope.cartProducts.items.length; i++) {
      var product = $scope.cartProducts.items[i];
      quantity += product.quantity;
    }
    $scope.cartProducts.quantity = quantity;
    return quantity;
  };

  $scope.getTotal = () => {
    var total = 0;
    for (var i = 0; i < $scope.cartProducts.items.length; i++) {
      var product = $scope.cartProducts.items[i];
      total += product.total;
    }
    $scope.cartProducts.total = total;
    return total;
  };

  $scope.resultProducts = () => {
    if (
      $scope.cartProducts.names != '' &&
      $scope.cartProducts.address != '' &&
      $scope.cartProducts.total != 0
    ) {
      $scope.showError = false;
      $scope.cartProductsResult = {...$scope.cartProducts};
      $scope.showResult = true;
      $scope.cartProducts = {
        names: '',
        address: '',
        items: [
          {product: 'Lechuga', quantity: 0, price: 10, total: 0},
          {product: 'Tomates', quantity: 0, price: 20, total: 0},
        ],
        quantity: 0,
        total: 0,
      };
    } else {
      $scope.showError = true;
    }
  };
});
