import { screen, render } from "@testing-library/react";
import SignOut from "./SignOut";
import React from "react";
import { MemoryRouter } from "react-router-dom";


describe('Tests related to the Signout component', () => {

    it('should renders correctly', () => {
        render(
            <MemoryRouter>
                <SignOut closeModal={function (arg0: boolean): void {
                    throw new Error("Function not implemented.");
                } } open={false} />
            </MemoryRouter>
        )
        const title = screen.getByText(/ARE YOU SURE WANT TO SIGN OUT ?/i);
        const cancelButton = screen.getByText(/cancel/i);
        const signoutButton = screen.getByText(/sign out/i);

        expect(title).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(signoutButton).toBeInTheDocument();
    });
    
});