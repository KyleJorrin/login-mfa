import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import Auth from '../Auth.jsx';

afterEach(() => {
    cleanup();
});

test('(Auth) Invalid numeric value 1', () => {
    
    const mockContextValue = {
        userData: [
            {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
            {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
            {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
            {email: "boy@boy.com", pass: "boy", permissions: "user"}
        ],
        setUserData: () => {},
        curUser: {email: "boy@boy.com", pass: "boy", permissions: "user"},
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Auth />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const codeInput = screen.getByPlaceholderText('Enter Code');

    fireEvent.change(codeInput, { target: { value: 'Hannah' } });

    const submitButton = screen.getByDisplayValue('Continue');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please enter a valid numeric value');
    expect(errorMessage).toBeDefined();
});

test('(Auth) Invalid numeric value 2', () => {
    
    const mockContextValue = {
        userData: [
            {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
            {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
            {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
            {email: "boy@boy.com", pass: "boy", permissions: "user"}
        ],
        setUserData: () => {},
        curUser: {email: "boy@boy.com", pass: "boy", permissions: "user"},
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Auth />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const codeInput = screen.getByPlaceholderText('Enter Code');

    fireEvent.change(codeInput, { target: { value: '84492a' } });

    const submitButton = screen.getByDisplayValue('Continue');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please enter a valid numeric value');
    expect(errorMessage).toBeDefined();
});

test('(Auth) Invalid numeric value 3', () => {
    
    const mockContextValue = {
        userData: [
            {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
            {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
            {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
            {email: "boy@boy.com", pass: "boy", permissions: "user"}
        ],
        setUserData: () => {},
        curUser: {email: "boy@boy.com", pass: "boy", permissions: "user"},
        setCurUser: () => {},
        otp: 0,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Auth />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const codeInput = screen.getByPlaceholderText('Enter Code');

    fireEvent.change(codeInput, { target: { value: '-93245' } });

    const submitButton = screen.getByDisplayValue('Continue');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please enter a valid numeric value');
    expect(errorMessage).toBeDefined();
});

test('(Auth) Incorrect code entered', () => {
    
    const mockContextValue = {
        userData: [
            {email: "jenniT123@gmail.com", pass: "adminadmin", permissions: "admin"},
            {email: "rob24@hotmail.com", pass: "other42world", permissions: "admin"},
            {email: "johndoe578@stuff.net", pass: "password", permissions: "user"},
            {email: "boy@boy.com", pass: "boy", permissions: "user"}
        ],
        setUserData: () => {},
        curUser: {email: "boy@boy.com", pass: "boy", permissions: "user"},
        setCurUser: () => {},
        otp: 888888,
        setOTP: () => {}
    };

    render(
        <MemoryRouter>
            <UserContext.Provider value={mockContextValue}>
                <Auth />
            </UserContext.Provider>
        </MemoryRouter>
    );

    const codeInput = screen.getByPlaceholderText('Enter Code');

    fireEvent.change(codeInput, { target: { value: '888887' } });

    const submitButton = screen.getByDisplayValue('Continue');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('The value you entered was incorrect');
    expect(errorMessage).toBeDefined();
});

