# FinAPI v1 🏦🏧💰

FinAPI is a simple API with the four basic CRUD operations and it is about banking operation simulation, where you can create an account, make deposits and withdrawals and see the client's statement and balance. 
The API was built during Ignit Node.JS course from Rocketseat. For more information, [click here](https://www.rocketseat.com.br/ignite). 
After some point, I updated it to use a MongoDB database and implemented the MVC (Model-View-Controller) architecture.

The Model–view–controller (MVC) is a software design pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user.

The main goal of this project was to learn about Node.JS completing the following checklist below. 

## 📝 Checklist

For completing this project, the following requirements and business rules must be completed.

### Requirements 

- [x] It must be possible to create an account.
- [x] It must be possible to fetch the customer's bank statement.
- [x] It must be possible to make a deposit.
- [x] It must be possible to make a withdrawal.
- [x] It must be possible to search the customer's bank statement by date.**
- [x] It must be possible to update customer account data.
- [x] It must be possible to obtain customer account data.
- [x] It must be possible to delete an account.
- [x] It must be possible to return the balance.

### Business rules

- [x] It must not be possible to register an account with an existing CPF.
- [x] It must not be possible to fetch a statement from a non-existing account.
- [x] It must not be possible to make a deposit to a non-existing account.
- [x] It must not be possible to withdraw from a non-existing account.
- [x] It must not be possible to withdraw when the balance is insufficient.
- [x] It must not be possible to delete a non-existing account.
