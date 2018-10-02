/**
 * The way defaultProps optionality is inferred makes it so the private api is expressed in the
 * `type Props`, rather than the public api.
 * 
 * typescript@3.1.1
 * @types/react@16.4.14
 * @types/prop-types@15.5.6
 */
import React from 'react';

type ComponentAProps = { aProp: string; aPropWithDefault: string };

class ComponentA extends React.Component<ComponentAProps> {
  static defaultProps = { aPropWithDefault: '' };

  render() {
    return <div />;
  }
}

// (JSX attribute) aPropWithDefault?: string | undefined
<ComponentA aProp="" />;

// ---

type ComponentBProps = { bProp: string } & ComponentAProps;

class ComponentB extends React.Component<ComponentBProps> {
  render() {
    const { bProp, ...aProps } = this.props;
    return <ComponentA {...aProps} />;
  }
}

// error TS2322: Type '{ bProp: string; aProp: string; }' is not assignable to type 'Readonly<ComponentBProps>'.
//   Property 'aPropWithDefault' is missing in type '{ bProp: string; aProp: string; }'.
<ComponentB bProp="b" aProp="a" />;
