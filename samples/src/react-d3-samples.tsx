import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CountriesComponent } from './countries/countries';
import { CollisionSample } from './collision';
import { D3RenderSample } from './d3-render';
import { ReactRenderSample } from "./react-render";
import { FauxDomSample } from './faux-dom';


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
  <CollisionSample/>
);

renderRoot(
  'sample-d3-render-static',
  <D3RenderSample dynamic={false} numBars={10} />
);

renderRoot(
  'sample-d3-render-dynamic',
  <D3RenderSample dynamic={true} numBars={30} />
);

renderRoot(
  'sample-react-render',
  <ReactRenderSample />
);

renderRoot(
  'sample-faux-dom',
  <FauxDomSample dynamic={false} />
);
