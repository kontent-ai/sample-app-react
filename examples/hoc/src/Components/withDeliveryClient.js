import React, { Component } from 'react';
import { DeliveryClient } from 'kentico-cloud-delivery';

export default function withDeliveryClient(config) {
  return ChildComponent => {
    class WrapperComponent extends Component {
      render() {
        const client = new DeliveryClient(config);
        return <ChildComponent {...this.props} client={client} />;
      }
    }
    return WrapperComponent;
  };
}
