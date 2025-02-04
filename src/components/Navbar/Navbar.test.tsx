import { screen, render, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe('tests related to the Homepage', () => {

    test('should render Homepage correctly', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        const signoutButton = screen.getByText(/sign out/i);
        expect(screen.getByText(/Hello/i)).toBeInTheDocument();
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
        expect(signoutButton).toBeInTheDocument();
        fireEvent.click(signoutButton);
    });
})