import React from 'react';
import { rest } from 'msw'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import Contacts from "../pages/Contacts";
import {server} from "../serverTestSetup";
import userEvent from '@testing-library/user-event';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close());
describe('contacts data', ()=>{

    test('loading',()=>{
        render(<Contacts/>);
        const loader=screen.getByTestId('contacts-loader');
        expect(loader).toBeInTheDocument();
    });

    test('success',async()=>{
        render(<Contacts/>);

        const loader=screen.getByTestId('contacts-loader');

        await waitForElementToBeRemoved(loader);

        expect(loader).not.toBeInTheDocument();

        expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();

        // eslint-disable-next-line testing-library/no-debugging-utils
        //screen.debug();
    });

    test('error',async()=>{
        server.use(
            rest.get('https://randomuser.me/api/?results=10',(req,res,ctx)=>{
                return res(
                    ctx.status(500),
                    ctx.json({
                        error:'Internal Server Error',
                    }),
                )
            })
        )
        render(<Contacts/>);

        const loader=screen.getByTestId('contacts-loader');

        await waitForElementToBeRemoved(loader);

        expect(screen.getByTestId('contacts-error')).toBeInTheDocument();
    });
})
describe('contacts data view mode', ()=>{
    test('should equal table',async()=>{
        render(<Contacts/>);

        const loader=screen.getByTestId('contacts-loader');

        await waitForElementToBeRemoved(loader);

        expect(loader).not.toBeInTheDocument();

        expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
        expect(screen.queryByTestId('contacts-grid-container')).not.toBeInTheDocument();

        expect(screen.getByTestId('toggle-data-viewmode-table')).toHaveStyle(
            {
                color: "rgba(0, 0, 0, 0.87)",
                "background-color": "rgba(0, 0, 0, 0.08)"
            })
        expect(screen.getByTestId('toggle-data-viewmode-table')).toHaveClass("Mui-selected");
        expect(screen.getByTestId('toggle-data-viewmode-grid')).not.toHaveClass("Mui-selected");
    });

    test('should equal grid',async()=>{
        render(<Contacts/>);

        const loader=screen.getByTestId('contacts-loader');

        await waitForElementToBeRemoved(loader);
        const toggleGridButton=screen.getByTestId('toggle-data-viewmode-grid');
        userEvent.click(toggleGridButton);

        expect(loader).not.toBeInTheDocument();

        expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument();
        expect(screen.queryByTestId('contacts-table-container')).not.toBeInTheDocument();

        expect(screen.getByTestId('toggle-data-viewmode-grid')).toHaveStyle(
            {
                color: "rgba(0, 0, 0, 0.87)",
                "background-color": "rgba(0, 0, 0, 0.08)"
            })
        expect(screen.getByTestId('toggle-data-viewmode-grid')).toHaveClass("Mui-selected");
        expect(screen.getByTestId('toggle-data-viewmode-table')).not.toHaveClass("Mui-selected");

        expect(window.localStorage.getItem('dataViewMode')).toEqual('grid');
    });

    test('should equal grid with reload page',async()=>{
        window.localStorage.setItem('dataViewMode','grid');
        render(<Contacts/>);

        const loader=screen.getByTestId('contacts-loader');

        await waitForElementToBeRemoved(loader);

        expect(screen.getByTestId('contacts-grid-container')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-data-viewmode-grid')).toHaveClass("Mui-selected");
        expect(screen.getByTestId('toggle-data-viewmode-table')).not.toHaveClass("Mui-selected");

        window.localStorage.clear();
    });

})

//npm run test -- --coverage --watchAll=false
