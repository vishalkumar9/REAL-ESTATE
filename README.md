# REAL ESTATE

![Image Alt Text](https://github.com/vishalkumar9/REAL-ESTATE/raw/main/frontend/src/components/image/Website.png)

---
# How you can run on your computer?
- Clone the repo
## Frontend
---
1. go to frontend folder
2. go to the terminal and write npm install
3. create .env file and set this variable

> `REACT_APP_BACKEND_PROPERTY_URL=`
> `REACT_APP_BACKEND_USER_URL=`
> `REACT_APP_BING_MAP_API=`
* BACKEND_USER_URL - API ENDPOINT TO INTERACT WITH USER RELATED REQUEST SUCH AS LOGIN SIGNUP
* BACKEND_PROPERTY_URL - API ENDPOINT TO INTERACT WITH PROPERTY RELATED REQUEST SUCH AS UPLOADING PROPERTY, SEARCHING ETC.
4. now go to terminal and type npm start


## Backend
---
1. go to backend folder
2. go to terminal and write npm install
3. create nodemon.json and set this variable
>  `{ "env":{"MONGOUSERNAME":"","MONGOPASSWORD":"","SECRETKEY":"","CLOUDNAME":"","APIKEY":"","APISECRET":""}}`
* here the CLOUDNAME, APIKEY, APISECERET will get from cloudinary, I am using cloudinary for storing images
4. now go to terminal and type npm run dev
## Database
---
1. MongoDB used as a Database
