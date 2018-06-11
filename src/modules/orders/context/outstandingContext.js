import React from 'react';

const OutstandingContext = React.createContext();

const mockOrders = [
  { id: 0, label: 'Purchase Order 1' },
  { id: 1, label: 'Purchase Order 2' },
  { id: 2, label: 'Purchase Order 3' },
  { id: 3, label: 'Purchase Order 4' },
];

const mockFetchOrders = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1000);
  });

export const outstandingProviderHoC = Component => props => {
  class OutstandingOrders extends React.Component {
    state = {};

    componentDidMount() {
      this.fetchPurchaseOrders();
    }

    fetchPurchaseOrders = async () => {
      // api call.
      const orders = await mockFetchOrders();
      const uncheckedOrders = orders.map(order => ({
        ...order,
        checked: false,
      }));
      this.setState({
        orders: uncheckedOrders,
      });
    };

    handleSelectOrder = order => {
      const orders = this.state.orders.reduce((acc, o) => {
        if (order.id !== o.id) return [...acc, o];

        return [
          ...acc,
          {
            ...o,
            checked: !o.checked,
          },
        ];
      }, []);

      this.setState({
        orders,
      });
    };

    render() {
      return (
        <OutstandingContext.Provider
          value={{
            state: this.state,
            actions: {
              onSelectOrder: this.handleSelectOrder,
            },
          }}
        >
          <Component {...props} />
        </OutstandingContext.Provider>
      );
    }
  }

  return <OutstandingOrders />;
};

export const outstandingConsumerHoC = Component => props => (
  <OutstandingContext.Consumer>
    {({ state, actions }) => <Component {...props} {...state} {...actions} />}
  </OutstandingContext.Consumer>
);

export default OutstandingContext;
