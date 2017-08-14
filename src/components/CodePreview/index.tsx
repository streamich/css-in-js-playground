import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import evalCode from '../../utils/eval';
import transform from '../../utils/transpile';
import getStylingLibrary from '../../utils/libraries';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media only screen and (min-width: 768px) {
    height: auto;
  }
`;

const CodeContainer = styled.div`
  display: block;
  height: auto;
  width: auto;
`;

const LivePreview = ({ code }) => {
  return <pre>{code}</pre>
};

export default class Preview extends React.Component<any, any> {
  state = {
    loaded: false,
    scope: {}
  };

  componentWillReceiveProps({ code }) {
    this.setState({ loaded: false, scope: {} });

    getStylingLibrary(code)
      .then(library => {
        this.setState({
          loaded: true,
          scope: library
        });
      });
  }

  render() {
    const { code } = this.props;
    if (!this.state.loaded) {
      return null;
    }
    const Component = evalCode(transform(code || ''), this.state.scope);
    return (
      <Container>
        <CodeContainer>
          <Component />
        </CodeContainer>
      </Container>
    );
  }
}
