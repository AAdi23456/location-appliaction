# location-appliaction
   1--signup--https://red-worrisome-pangolin.cyclic.app/reg
      When a GET request is made to the "https://red-worrisome-pangolin.cyclic.app/reg" endpoint,
      it extracts the email, name, and password from the request body. It then uses the bcrypt library to
      hash the password and store the hashed password along with the email and name in the database using
      the model schema. Finally, it sends a response indicating that the registration was successful.

   2--login -- https://red-worrisome-pangolin.cyclic.app/login
       It expects a POST request with an email
       and password in the request body. It then checks if the email exists in the database using the
      `regmodel` model. If the email exists, it uses bcrypt to compare the provided password with the
       hashed password stored in the database. If the passwords match, it generates a JSON Web Token (JWT)
       using the user's ID and a secret key, and sends it back to the client along with a success message.
       If the email or password is incorrect, it sends an error message back to the client. 

   3--logout--https://red-worrisome-pangolin.cyclic.app/logout
      this route is used for logging out a user. It expects a token to be passed in the headers of
      the request. It then verifies the token using the `jwt.verify()` method and sets the token in Redis
      cache using the `client.set()` method. Finally, it sends a response indicating that the logout was
      successful.    

   4--location--https://red-worrisome-pangolin.cyclic.app/mycity/:ip
     A route for getting the city location of an IP address. It takes in the IP address
     as a parameter in the URL and uses a middleware function called `validip` to validate the IP
     address. It then checks if the city location for the IP address is already stored in Redis cache,
     and if so, returns the cached data. If not, it makes an API call to `ipapi.co` to get the city
     location and stores it in Redis cache for future use. It also saves the IP address and the
     corresponding city location in a MongoDB database using a model called `searchesmodel`. Finally, it
     returns the city location in the response. If there is an error, it returns a message saying
     "something went wrong".   

   

