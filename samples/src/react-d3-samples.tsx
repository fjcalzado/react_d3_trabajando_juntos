import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from './countries/hello';
import { CollisionComponent } from './collision/collision';

ReactDOM.render(
  <HelloComponent/>,
  document.getElementById('sample-countries')
);

ReactDOM.render(
  <CollisionComponent/>,
  document.getElementById('sample-collision')
);
