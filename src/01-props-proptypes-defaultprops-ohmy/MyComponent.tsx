/**
 * Error when using defaultProps, type Props, and propTypes together
 * 
 * Fixed by https://github.com/DefinitelyTyped/DefinitelyTyped/pull/28179
 * 
 * typescript@3.1.1
 * @types/react@16.4.14
 * @types/prop-types@15.5.6
 */
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  someProp: boolean;
};

class MyComponent extends React.Component<Props> {
  static propTypes = {
    someProp: PropTypes.bool,
  };

  static defaultProps = {
    someProp: false,
  };

  render() {
    return <div />;
  }
}

// (JSX attribute) someProp?: boolean | undefined
<MyComponent />;

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
//       Type '{ someProp: Requireable<boolean>; }' is not assignable to type 'ValidationMap<Props>'.
//         Types of property 'someProp' are incompatible.
//           Type 'Requireable<boolean>' is not assignable to type 'Validator<boolean>'.
//             Types of property '[nominalTypeHack]' are incompatible.
//               Type 'boolean | null | undefined' is not assignable to type 'boolean | undefined'.
//                 Type 'null' is not assignable to type 'boolean | undefined'.
const MyComponentWithHoc = withHoc(MyComponent);
