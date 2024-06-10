# Code expert solution

This code reads a JSON file that represents a folder/file structure and displays it.

## Before Running the Code

Make sure to have the following installed:

* Nodejs v18
* npm v9.8.1

To install dependencies open a terminal and run:

```bash
npm install
```

## How to run the code

Open a terminal and execute:

```bash
npm run start
```

## Algorithm

The implementation of the code follows these steps:

1. Read data from the JSON file.
2. Filter all data which is `current === true`.
3. Filter all data with permissions (e.g.: all data that can be readed by "student" role).
4. Built tree folder structure using recursion.
5. Print tree.
