import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CountriesComponent } from './countries/countries';
import { CollisionComponent } from './collision/collision.component';
import { D3RenderComponent } from './d3-render/d3-render.component';
import { ReactRenderComponent } from "./react-render/react-render.component";
import { FauxDomComponent } from './faux-dom/faux-dom.component';


const renderRoot = (id: string, component: JSX.Element) => {
  const root = document.getElementById(id);
  return root ? ReactDOM.render(component, root) : null;
}

// Initialize samples in its corresponding root.
renderRoot(
  'sample-countries',
  <CountriesComponent/>
);

renderRoot(
  'sample-collision',
  <CollisionComponent/>
);

renderRoot(
  'sample-d3-render-static',
  <D3RenderComponent dynamic={false} numBars={10} />
);

renderRoot(
  'sample-d3-render-dynamic',
  <D3RenderComponent dynamic={true} numBars={30} />
);

renderRoot(
  'sample-react-render',
  <ReactRenderComponent />
);

renderRoot(
  'sample-faux-dom',
  <FauxDomComponent dynamic={false} />
);
