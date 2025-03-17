
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
// import { fireEvent } from '@testing-library/dom/types';

test('Checking for component loaded', () => {
    render(<Login />);
    expect(screen.queryByText(/Login/)).toBeInTheDocument();
});

test('Checking email & password inputs are empty', () => {
    render(<Login />)
    expect(screen.queryByPlaceholderText('Email')).toHaveValue('')
    expect(screen.queryByPlaceholderText('Password')).toHaveValue('')
})

test('Updating the email & password input fields', () => {
    render(<Login />)
    const emailInput = screen.queryByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'sariha@gmail.com' } })
    expect(emailInput.value).toBe('sariha@gmail.com')

    const passwordInput = screen.queryByPlaceholderText('Password')
    fireEvent.change(passwordInput, { target: { value: 'test@123' } })
    expect(passwordInput.value).toBe('test@123')
})

test('Successful signup', () => {
    render(<Login />)
    fireEvent.change(screen.queryByPlaceholderText('Email'), { target: { value: 'sariha@gmail.com' } })
    fireEvent.change(screen.queryByPlaceholderText('Password'), { target: { value: 'test@123' } })

    fireEvent.click(screen.getByText('Signup'))

    setTimeout(() => {
        expect(screen.queryByText('Successfully logged in')).toBeInTheDocument()
    }, 3000)
})

test('Unsuccessful signup', () => {
    render(<Login />)
    fireEvent.change(screen.queryByPlaceholderText('Email'), { target: { value: 'sari@gmail.com' } })
    fireEvent.change(screen.queryByPlaceholderText('Password'), { target: { value: 'test' } })

    fireEvent.click(screen.getByText('Signup'))

    setTimeout(() => {
        expect(screen.queryByText('Invalid credentials')).toBeInTheDocument()
    }, 3000)
})

test('Checking loading', () => {
    render(<Login />)
    fireEvent.change(screen.queryByPlaceholderText('Email'), { target: { value: '' } })
    fireEvent.change(screen.queryByPlaceholderText('Password'), { target: { value: '' } })

    fireEvent.click(screen.getByText('Signup'))

    expect(screen.queryByText('Loading...'))

})

test('Message should not appear when the inputs are empty and button not clicked', () => {
    render(<Login />)
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    expect(screen.queryByText('Successfully logged in')).not.toBeInTheDocument()
    expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()
})