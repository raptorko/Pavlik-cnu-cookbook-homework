import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() =>
  <div className="pull-right">
    <i className="fa fa-bars" aria-hidden="true"></i>
  </div>);

export default DragHandle;
