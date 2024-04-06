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
- [x] Revise the Schema
- [x] Manage Breeds
  - [x] Seed db with Breeds data
  - [x] FindAll Breed Route
  - [x] Create Breed Route
  - [x] Update Breed Route
  - [x] Delete Breed Route
  - [x] Add Optional Search Params called type to FindAll Breed Route

## Available endpoints

| ENDPOINT NAME           |      Route      | Method | Protected | Admin Only |                                       Note |
| :---------------------- | :-------------: | :----: | :-------: | :--------: | -----------------------------------------: |
| **HOME**                |        /        |  GET   |    NO     |     NO     |                       Still in DEVELOPMENT |
| **LOGIN**               |   /auth/login   |  POST  |    NO     |     NO     |                                            |
| **REGISTER**            | /auth/register  |  POST  |    NO     |     NO     |                                            |
| **REFRESH ACCESS**      |  /auth/refresh  |  POST  |    NO     |     NO     |                                            |
| **LOGOUT**              |  /auth/logout   |  POST  |    NO     |     NO     |                                            |
| **READ ALL PET BREEDS** | /breed?type=DOG |  GET   |    NO     |     NO     | type value should be either `DOG` or `CAT` |
| **Create PET BREED**    |     /breed      |  POST  |    YES    |    YES     |                                            |
| **Update PET BREED**    |  /breed/:slug   |  PUT   |    YES    |    YES     |                                            |
| **DELETE PET BREED**    |  /breed/:slug   | DELETE |    YES    |    YES     |                                            |
| **Create PET**          |  /rehome-a-pet  |  POST  |    YES    |     NO     |                 this is for rehoming a pet |

---

> `HOME` route will be where we will fetch about available pets to adopt.
