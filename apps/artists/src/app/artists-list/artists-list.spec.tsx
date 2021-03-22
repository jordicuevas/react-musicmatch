import React from 'react';
import { render } from '@testing-library/react';

import ArtistsList from './artists-list';

describe('ArtistsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArtistsList />);
    expect(baseElement).toBeTruthy();
  });
});
