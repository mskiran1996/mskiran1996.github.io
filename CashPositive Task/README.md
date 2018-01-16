#### CashPositive-API-lender-borrower
# API for lender and borrower Schema
### Problem Statement:  
Create a small NodeJS application for a borrower-lender scenario.
### APIs required for Borrower
* POST : Create a new credit request,
* GET : Get List of All Credit Requests.

### APIs required for Lender
* PUT : Mark a specific credit request as completed,
* GET : Get all credit requests in the system,
* GET : Get List of All Borrowers.

## API endpoints:
* Signup for borrower/lender : (POST) 
  * URL : http://localhost:3000/signup,
  * Body Parametres: {name,email,password,roles(lender/borrower)}.
* Login as borrower/lender : (POST)
  * URL : http://localhost:3000/login,
  * Body Parametres: {email,password}.
### APIs required for Borrower Requests:
* Create a new credit request:(POST)
  * URL : http://localhost:3000/borrower/:INPUT_EMAIL_HERE
  * Body Parametres : {amount<100000 initially}.
* Get List of All Credit Requests of the Borrower : (GET)
  * URL : http://localhost:3000/borrower/:INPUT_EMAIL_HERE
### APIs required for Lender Requests:
* Get List of All Borrowers and All Credit Requests in the System : (GET)
  * URL : http://localhost:3000/lender/
* Mark a specific credit request as completed : (PUT)
  * URL : http://localhost:3000/lender/:INPUT_EMAIL_HERE/:INPUT_CREDIT-REQUEST-ID_HERE


## To run the applcation,inside the project folder run the commands :
```
npm install
```
```
npm run start
``` 
### For running the Mongo Server,go to path---C:/MongoDB/Server/3.4/bin/--- and run the command :
```
mongod
```

and then  navigate to POSTMAN to check the API's.
