# Backend-Project-Module3-Pets

Project Name: Upet;


Quick Compo: 'Your Pet Digital Id';
s

Description: Pets app that has all the info about your pets in one single application.;


User Stories: 

    * 404 - Page not found(page doesn't exist).
    * Sign-up - Create an account (first step to beggin using the app).
    * Log-in - Enter the app using existing credentials and access the app's features.
    * Log-out - Exit the app, losing access to the app's features.
    * Home Page - Title, Slogan & About us.
    * Profile Page - Access your Profiles Area that displays your pets profiles and all their info.
    * Add Pets - Add your pet friends profile to the app and include all the necessary infos.
    * Edit Pets - Edit your pets information.
    * Delete pets - Delete pets info and Pet Profiles.
    * Help/Adopt page - One can check the pets for adoption and possibly apply to adopt.

    
Backlog: 

    * Apply to addopt a new pet.
    * Help other animals/pets.


Client/Frontend:

React Router Routes (react App):

    * '/login' - LoginPage - Permission: Anon - Behaviour: Login form, navigates to home page after login.

    * '/signup' - SignupPage - Permission Anon - Behaviour Signup form, navigates to home page after signup.

    * '/' - HomePage - Permission: public - Behaviour: Home Page.

    * '/profiles' - ProfilesPage - Permission: User only - Behaviour: User's Pet Profiles.

    * '/profiles/:petId' - PetPage - Permission: User only - Behaviour: Specific Pet Profile and details.

    * '/profiles/:petId/edit' - EditPetPage - Permission: User only - Behaviour: Edit Pet page and it´s details.

    * '/profiles/add' - CreatePetPage - Permission: User only - Behaviour: Create new Pet Profile.

    * '/adopt' - AdoptPage - Permission: User only - Behaviour: Check adoption page and meet pets that need a new home.

    * '/user' - UserPage - Permission: User only - Behaviour: Access User Area and details.


Components: 

Pages:

    * LoginPage
    * SignupPage
    * ProfilesPage
    * PetPage
    * EditPetPage
    * CreatePetPage
    * AdoptPage
    * UserPage

Components:

    * PetCards
    * NavBar
    * UserToggleMenu


Services:

Auth Service

authService :
  .login(user)
  .signup(user)
  .logout()
  .validate()


User Service

userService :
  .updateCurrentUser(id, userData)
  .getCurrentUser()


Pet Service

petService :
  .addPet(petData)
  .getPets()
  .getOnePet(id)
  .updatePet(id)
  .deletePet(id)


Adopt Service

adoptService :
  .addAdoptionPet(id)
  .getAdoptionPets()
  .getOneAdoptionPet(id)
  .deleteAdoptionPet(id)


Server/Backend:

Models:

    User model:

        {
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            name: { type: String, required: true, unique: true }  
        }

    Dog model:

        {
            name: { type: String, required: true },
            img: { type: String },
            age: { type: Number, required: true },
            breed: { type: String, required: true },
            hairType: { type: String },
            chipId: { type: String, required: true, unique: true },
            sex: { type: String, required: true },
            size: { type: enum, required: true },
            weight: { type: Number, required: true },
            description: { type: String, required: true },
            diet: { type: String, required: true, unique: true },
            medicalRecord: { type: String, required: true, unique: true },  
        }

    
    Cat model:

        {
            name: { type: String, required: true },
            img: { type: String },
            age: { type: Number, required: true },
            breed: { type: String, required: true },
            chipId: { type: String, required: true, unique: true },
            sex: { type: String, required: true },
            size: { type: enum, required: true },
            weight: { type: Number, required: true },
            description: { type: String, required: true },
            diet: { type: String, required: true },
            medicalRecord: { type: String, required: true },  
        }

    Other model

        {
            name: { type: String, required: true},
            img: { type: String },
            age: { type: Number, required: true},
            Breed: { type: String },
            sex: { type: String, required: true },
            weight: { type: Number },
            description: { type: String, required: true },
            diet: { type: String },
            medicalRecord: { type: String, required: true },  
        }


API Endpoints (Backend Routes);

    * 
      - HTTP Method: GET ;
      - URL: '/auth/profile' ;
      - Request Body: Saved session ;
      - Success Status: 200 ;
      - Error Status: 404 ;
      - Description: Check if user is logged in and return profile page ;

    * 
      - HTTP Method: POST ;
      - URL: '/auth/signup' ;
      - Request Body: {name, email, password} ;
      - Success Status: 201 ;
      - Error Status: 404 ;
      - Description: Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session ;

    * 
      - HTTP Method: POST ;
      - URL: '/auth/login' ;
      - Request Body: {username, password} ;
      - Success Status: 200 ;
      - Error Status: 401 ;
      - Description: Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session ;

    * 
      - HTTP Method: POST ;
      - URL: '/auth/logout' ;
      - Request Body:  ;
      - Success Status: 204 ;
      - Error Status: 400 ;
      - Description: Logs out the user ;

    * 
      - HTTP Method: GET ;
      - URL: '/api/pets' ;
      - Request Body:  ;
      - Success Status: ;
      - Error Status: 400 ;
      - Description: Shows all pets ;

    * 
      - HTTP Method: GET ;
      - URL: '/api/pets/:id' ;
      - Request Body:  ;
      - Success Status: ;
      - Error Status: ;
      - Description: Shows specific pet and its details ;

    * 
      - HTTP Method: POST ;
      - URL: '/api/pets' ;
      - Request Body: { name:, img, age, breed, hairType, chipId, sex, size, weight, description, diet,    medicalRecord } || { name:, img, age, breed, chipId, sex, size, weight, description, diet, medicalRecord } || { name:, img, age, breed, sex, weight, description, diet, medicalRecord } ;
      - Success Status: 201 ;
      - Error Status: 400 ;
      - Description: Creates a new Pet Profile ;

    * 
      - HTTP Method: PUT ;
      - URL: '/api/pets/:id' ;
      - Request Body: { name:, img, age, breed, hairType, chipId, sex, size, weight, description, diet,    medicalRecord } || { name:, img, age, breed, chipId, sex, size, weight, description, diet, medicalRecord } || { name:, img, age, breed, sex, weight, description, diet, medicalRecord } ;
      - Success Status: 200 ;
      - Error Status: 400 ;
      - Description: Edits a Pet Profile ;

    * 
      - HTTP Method: DELETE ;
      - URL: '/api/pets/:id' ;
      - Request Body: {} ;
      - Success Status: 200 ;
      - Error Status: 400 ;
      - Description: Deletes a Pet Profile ;

    * 
      - HTTP Method: POST ;
      - URL: '/api2/adopt' ;
      - Request Body: { name:, img, age, breed, hairType, chipId, sex, size, weight, description, diet,    medicalRecord } || { name:, img, age, breed, chipId, sex, size, weight, description, diet, medicalRecord } || { name:, img, age, breed, sex, weight, description, diet, medicalRecord } ;
      - Success Status: 201 ;
      - Error Status: 400 ;
      - Description: Adds a pet to the adoption area that will appear in the Adopt page.

    * 
      - HTTP Method: GET ;
      - URL: '/api2/adopt' ;
      - Request Body: ;
      - Success Status: ;
      - Error Status: 400 ;
      - Description: Shows all the pets for adoption that will appear in the Adopt page.

    * 
      - HTTP Method: GET ;
      - URL: '/api2/adopt/:id' ;
      - Request Body: ;
      - Success Status: ;
      - Error Status: 400 ;
      - Description: Shows a specific pet for adoption that will appear in the Adopt page.

API's: ;

Packages: axios, react, react-router-dom, express, mongoose, 


GIT: 

    * Frontend - https://github.com/joaosilvapedro357/Frontend-Project-Module3-Pets

    * Backend - https://github.com/joaosilvapedro357/Backend-Project-Module3-Pets

    * Deployed Link - 


Slides:


Contributors:

Filipe Dias
João Pedro Silva





    
    



