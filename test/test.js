import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import PouchDBChanges from '../src/pouchdb-changes';

describe('PouchDBChanges', () => {

  describe('props', () => {

    it('renders children', () => {
      let shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <PouchDBChanges dbUrl='http://localhost:5984/test'>
          <div>Hello Pouch!</div>
        </PouchDBChanges>
      );
      let result = shallowRenderer.getRenderOutput();
      assert.equal(result.type, 'div');
      assert.equal(result.props.children, 'Hello Pouch!');
    });

  });

});
