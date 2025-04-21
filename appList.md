# Dev Tinder APIs

## Auth Router
 POST /signup
 POST /login
 POST /logout


## Profile Router
 GET  /profile/view
 PATCH  /profile/edit
 PATCH   /profile/password

## ConnectionRequest Router
 <!-- POST /request/send/interested/:userId
 POST /request/send/ignored/:userId -->
 POST /request/send/:status/:userId

 <!-- POST /request/review/accepted/:requestId
 POST /request/review/rejected/:requestId -->
 POST /request/review/status/:requestId


## User Router
 GET user/connections

 GET user/requests/recieved

 GET  user/feed   >> it will show all the users which are in the platform


### Different Statuses
 Interested, Ignored, Accepted, Rejected

