import { screen, render } from "@testing-library/react";
import HomePage from "./HomePage";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe('tests related to the Homepage', () => {

    const renderHomePage = () => {
        return render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        )
    }

    test('should render Homepage correctly', () => {
        renderHomePage();
        
        expect(screen.getByText(/Hello/i)).toBeInTheDocument();
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });
})