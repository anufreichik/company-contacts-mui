import React from 'react';
import { rest } from 'msw'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import Contacts from "../pages/Contacts";
import {server} from "../serverTestSetup";

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


