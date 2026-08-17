import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import Login from '../Login.jsx';

afterEach(() => {
    cleanup();
});

test('(Login) Empty submission triggers the validation error alert', () => {
    const mockContextValue = {
        userData: [],
        setUserData: () => {},
        curUser: null,
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Login />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const submitButton = screen.getByDisplayValue('Log in');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeDefined();
});

test('(Login) Invalid email with no @', () => {
    
    const mockContextValue = {
        userData: [],
        setUserData: () => {},
        curUser: null,
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Login />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.change(passwordInput, { target: { value: 'superSecret123!' } });

    const submitButton = screen.getByDisplayValue('Log in');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please enter a valid email address');
    expect(errorMessage).toBeDefined();
});

test('(Login) No Email but Password', () => {
    
    const mockContextValue = {
        userData: [],
        setUserData: () => {},
        curUser: null,
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Login />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'superSecret123!' } });

    const submitButton = screen.getByDisplayValue('Log in');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeDefined();
});

test('(Login) No Password but Email', () => {
    
    const mockContextValue = {
        userData: [],
        setUserData: () => {},
        curUser: null,
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Login />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    const submitButton = screen.getByDisplayValue('Log in');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeDefined();
});

test('(Login) Email not registered', () => {
    
    const mockContextValue = {
        userData: [
            {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
            {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
            {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
            {email: "boy@boy.com", pass: "boy", permissions: "user"}
        ],
        setUserData: () => {},
        curUser: null,
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Login />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'themainman@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'superSecret123!' } });

    const submitButton = screen.getByDisplayValue('Log in');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('No account with this email exists');
    expect(errorMessage).toBeDefined();
});

test('(Login) Email registered but incorrect password', () => {
    
    const mockContextValue = {
        userData: [
            {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
            {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
            {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
            {email: "boy@boy.com", pass: "boy", permissions: "user"}
        ],
        setUserData: () => {},
        curUser: null,
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Login />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'boy@boy.com' } });
    fireEvent.change(passwordInput, { target: { value: 'boyyy' } });

    const submitButton = screen.getByDisplayValue('Log in');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('The email and passwords do not match');
    expect(errorMessage).toBeDefined();
});


