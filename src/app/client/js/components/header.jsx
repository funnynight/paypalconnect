import React from 'react';

import { Toggle } from './toggle';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>
          <img
            src="https://www.paypalobjects.com/ppdevdocs/logo-PayPal-Developer.svg"
            alt="PayPal"
          />
          <span>PayPal Buttons Integration</span>
        </h1>

        {/* <Toggle left="sandbox" right="production" default="left" onChange={this.props.onChangeEnv} /> */}
      </header>
    );
  }
}
