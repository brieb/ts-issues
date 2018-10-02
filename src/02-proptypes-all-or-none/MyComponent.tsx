/**
 * When propTypes and type Props are used together all props need to be defined.
 * Desired behavior would be to be able to define a subset.
 * This way we could use runtime checks to fill in gaps in type-checking, such as `range(-1, 2)`.
 * https://github.com/airbnb/prop-types
 *
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/29198
 *
 * typescript@3.1.1
 * @types/react@16.4.14
 * @types/prop-types@15.5.6
 */
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  someProp: boolean;
  someOtherProp: string;
};

class MyComponent extends React.Component<Props> {
  static propTypes = {
    someProp: PropTypes.bool.isRequired,
  };

  render() {
    return <div />;
  }
}

<MyComponent someProp someOtherProp="" />;

// ---

function withHoc<P>(Component: React.ComponentType<P>) {
  class WithHoc extends React.Component<P> {
    render() {
      return <Component {...this.props} />;
    }
  }
  return WithHoc;
}

// error TS2345: Argument of type 'typeof MyComponent' is not assignable to parameter of type 'ComponentType<Props>'.
//   Type 'typeof MyComponent' is not assignable to type 'ComponentClass<Props, any>'.
//     Types of property 'propTypes' are incompatible.
//       Type '{ someProp: Validator<boolean>; }' is not assignable to type 'ValidationMap<Props>'.
//         Property 'someOtherProp' is missing in type '{ someProp: Validator<boolean>; }'.
const MyComponentWithHoc = withHoc(MyComponent);
