# Dev Tinder APIs

 POST /signup
 POST /login
 POST /logout


 GET /profile/view
 PATCH /profile/edit
 PATCH  /profile/password

 GET /feed   >> it will show all the users which are in the platform


 POST /request/send/interested/:userId
 POST /request/send/ignored/:userId
 
 POST /request/review/accepted/:requestId
 POST /request/review/rejected/:requestId


 GET /connections
 GET /requests/recieved

 Different statuses we have are: Interested, Ignored, Accepted, Rejected

