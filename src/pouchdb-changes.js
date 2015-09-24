import React from 'react';
import PouchDB from 'pouchdb';

let { func, object, string } = React.PropTypes;

export default class PouchDBChanges extends React.Component {
  componentDidMount() {
    this.subscribeToChanges();
  }

  componentWillUnmount() {
    this.unsubscribeFromChanges();
  }

  subscribeToChanges() {
    let { changesOpts, dbOpts, dbUrl, onChange, onComplete, onError, onPaused } = this.props;
    let db = new PouchDB(dbUrl, dbOpts);
    this.changes = db.changes(changesOpts)
      .on('change', change => {
        if (onChange) {
          onChange(change);
        }
      }).on('complete', info => {
        if (onComplete) {
          onComplete(info);
        }
      }).on('paused', () => {
        if (onPaused) {
          onPaused();
        }
      }).on('error', err => {
        if (onError) {
          onError(err);
        }
      });
  }

  unsubscribeFromChanges() {
    this.changes.cancel();
  }

  render() {
    return this.props.children;
  }
}

PouchDBChanges.propTypes = {
  changesOpts: object,
  dbOpts: object,
  dbUrl: string.isRequired,
  onChange: func,
  onComplete: func,
  onError: func,
  onPaused: func
};

PouchDBChanges.defaultProps = {
  changesOpts: {},
  dbOpts: {}
};
