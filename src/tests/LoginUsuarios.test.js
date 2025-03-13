// tests/LoginUsuarios.test.js
import { render, screen } from '@testing-library/react';
import LoginUsuarios from '../src/views/registro/LoginUsuarios';

test('renders login form', () => {
  render(<LoginUsuarios />);
  expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
});