# Pets Manager (Backend API)

> Sample password used during development P@ssme1n

## Tools Used:

- prisma

## Todos:

- [x] Create Auth Module, Service & Controller
- [x] Initial Setup conifg, jwt, bcrypt, class-validator
- [x] Register User
- [x] Login User
- [x] Logout User
- [x] Refresh
- [x] Verify Access
- [x] Protected Routes with User-Roles

## Available endpoints

| ENDPOINT NAME      |     Route      | Method | Protected | Admin Only |
| :----------------- | :------------: | :----: | :-------: | ---------: |
| **HOME**           |       /        |  GET   |    YES    |         NO |
| **LOGIN**          |  /auth/login   |  POST  |    NO     |         NO |
| **REGISTER**       | /auth/register |  POST  |    NO     |         NO |
| **REFRESH ACCESS** | /auth/refresh  |  POST  |    NO     |         NO |
| **LOGOUT**         |  /auth/logout  |  GET   |    NO     |         NO |
| **ADMIN**          |     /admin     |  GET   |    YES    |        YES |
