import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import SignUp from '../SignUp.jsx';

afterEach(() => {
    cleanup();
});

test('(SignUp) Empty submission triggers the validation error alert', () => {
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
                <SignUp />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const submitButton = screen.getByDisplayValue('Create');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeDefined();
});

test('(SignUp) Invalid email with no @', () => {
    
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
                <SignUp />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.change(passwordInput, { target: { value: 'superSecret123!' } });

    const submitButton = screen.getByDisplayValue('Create');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please enter a valid email address');
    expect(errorMessage).toBeDefined();
});

test('(SignUp) No Email but Password', () => {
    
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
                <SignUp />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'superSecret123!' } });

    const submitButton = screen.getByDisplayValue('Create');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeDefined();
});

test('(SignUp) No Password but Email', () => {
    
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
                <SignUp />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    const submitButton = screen.getByDisplayValue('Create');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeDefined();
});

test('(SignUp) Email already registered', () => {
    
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
                <SignUp />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'boy@boy.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByDisplayValue('Create');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('An account with this email already exists');
    expect(errorMessage).toBeDefined();
});
