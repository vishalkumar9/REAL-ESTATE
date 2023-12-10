import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import About from '../about/About'

describe('About', () => {
  it('renders the component without errors', () => {
    render(<About />)
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Who We Are')).toBeInTheDocument()
    expect(screen.getByText('Meet Our Devloper')).toBeInTheDocument()
  })
})
