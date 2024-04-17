# Pets Manager (Backend API)

> Sample password used during development P@ssme1n

## Available endpoints

| ENDPOINT NAME                    |              Route              | Method | Protected | Admin Only |                                       Note |
| :------------------------------- | :-----------------------------: | :----: | :-------: | :--------: | -----------------------------------------: |
| **HOME**                         |                /                |  GET   |    NO     |     NO     |                  get all approved pet data |
| **LOGIN**                        |           /auth/login           |  POST  |    NO     |     NO     |                                            |
| **REGISTER**                     |         /auth/register          |  POST  |    NO     |     NO     |                                            |
| **REFRESH ACCESS**               |          /auth/refresh          |  POST  |    NO     |     NO     |                                            |
| **LOGOUT**                       |          /auth/logout           |  POST  |    NO     |     NO     |                                            |
| **READ ALL PET BREEDS**          |         /breed?type=DOG         |  GET   |    NO     |     NO     | type value should be either `DOG` or `CAT` |
| **Create PET BREED**             |             /breed              |  POST  |    YES    |    YES     |                                            |
| **Update PET BREED**             |          /breed/:slug           |  PUT   |    YES    |    YES     |                                            |
| **DELETE PET BREED**             |          /breed/:slug           | DELETE |    YES    |    YES     |                                            |
| **Create PET**                   |          /rehome-a-pet          |  POST  |    YES    |     NO     |                 this is for rehoming a pet |
| **GET MY REHOME REQUESTED PETS** |          /rehome-a-pet          |  GET   |    YES    |     NO     |                                            |
| **Update PET**                   |      /rehome-a-pet/:petId       |  PUT   |    YES    |     NO     |                                            |
| **DELETE PET**                   |      /rehome-a-pet/:petId       | DELETE |    YES    |     NO     |  Admin also allowed to del user's pet data |
| **GET ALL (Both Approved) PETS** |        /pets-management         |  GET   |    YES    |    YES     |  USE it for listing out in admin dashboard |
| Approve a pet (for Admin only)   | /pets-management/approve/:petId |  PUT   |    YES    |    YES     |                                            |
| View pet info (approved only)    |        /pet/view/:petId         |  GET   |    NO     |     NO     |                                            |
| View pet info (Both Approved)    |    /pet-private-view/:petId     |  GET   |    YES    |    YES     |                                            |

---

> Stage 1 is done.
> What about testing??
