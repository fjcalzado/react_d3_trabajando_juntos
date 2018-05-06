import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from './countries/hello';
import { CollisionComponent } from './collision/collision.component';
import { D3RenderComponent } from './d3-render/d3render.component';

if (document.getElementById('sample-countries')) {
  ReactDOM.render(
    <HelloComponent/>,
    document.getElementById('sample-countries')
  );
}

if (document.getElementById('sample-collision')) {
  ReactDOM.render(
    <CollisionComponent/>,
    document.getElementById('sample-collision')
  );
}

if (document.getElementById('sample-d3-render-static')) {
  ReactDOM.render(
    <D3RenderComponent dynamic={false} numBars={10} />,
    document.getElementById('sample-d3-render-static')
  );
}

if (document.getElementById('sample-d3-render-dynamic')) {
  ReactDOM.render(
    <D3RenderComponent dynamic={true} numBars={30} />,
    document.getElementById('sample-d3-render-dynamic')
  );
}
