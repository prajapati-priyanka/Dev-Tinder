1. Orders of the routes matters a lot.
2. Validator check in the schema only works for the new user. so If we want it to work when we do the updation then we need to add requiredValidation: true, in our patch API.
3. 