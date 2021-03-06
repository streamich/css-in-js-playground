import * as React from 'react';
import { shallow } from 'enzyme';

import { CodeEditorBase as CodeEditor } from '../';

test.skip('it matches snapshot', () => {
  expect(
    shallow(
      <CodeEditor
        activeModule="index"
        code={{
          index: ``,
          form: ``,
          login: ``,
          header: ``
        }}
        onUpdate={() => {}}
      />
    )
  ).toMatchSnapshot();
});
