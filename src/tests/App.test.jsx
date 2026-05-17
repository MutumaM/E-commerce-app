import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

describe('App', () => {
  it('shows the Home link on the navbar', () => {
    render(
      <MemoryRouter>
        <Navbar darkMode={false} onToggleDarkMode={function () {}} />
      </MemoryRouter>
    )
    expect(screen.getByText('Home')).toBeTruthy()
  })
})
