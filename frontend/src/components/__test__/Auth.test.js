import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserAuthentication from "../authentication/UserAuthentication";

describe('About', () => {
    it('renders the component without errors', () => {
        render(<UserAuthentication />);
    });
});
