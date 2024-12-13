import { screen, render } from "@testing-library/react";
import HomePage from "./HomePage";
import React from "react";

describe('tests related to the Homepage', () => {

    test('should render Homepage correctly', () => {
        render(<HomePage />);
        expect(screen.getByText(/WElCOME HOMEPAGE/i)).toBeInTheDocument();
    });
})