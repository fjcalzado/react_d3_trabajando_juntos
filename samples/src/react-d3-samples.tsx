import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from './00/hello';
import { CollisionComponent } from './01-collision/collision';

ReactDOM.render(
  <HelloComponent/>,
  document.getElementById('react-d3-sample00')
);

ReactDOM.render(
  <CollisionComponent/>,
  document.getElementById('react-d3-sample01')
);
