# Feedr Technical Challenge

The application is divided into two parts, frontend and backend. 

## Backend

There are two APIs in the backend.

- **/api/items** => This API returns all the items the application has.
- **/api/search/:searchKey** => This API returns items based on the searchKey

CORS support has been added to the backend to allow requests from different origins.

## Frontend

Frontend has three sections.

- Top Menu Section: It shows how many items are selected from left Menu items and number of dietary plans.
- Menu Items: It list all the items received from backend or the filtered items based on the search key given in input box.
- Right View Section: It lists all the the selected items. 

## Implemented Business Logic

- User can filter items using the input box and select items from menu items.
- One item can be selected more than once.
- Items will be filtered on the backend.

## Design Logic

- On loading of the root app, a call will be made to the backend to fetch all the items.
- Filter items will be fetched from backend based filter key, however there is a significant delay before making the fetch call as making continuous fetch on every change will led to multiple useless calls.

# Quick Start

## Install dependencies
yarn (or npm install)

## Start development server
yarn dev (or npm run dev)

## Run tests
yarn test (or npm run test)
