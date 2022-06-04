# Findme App
This is a simple find me app that allows you to send your location to your close friend circle in case of emergency situation.

## Technology Used
- Mobile App (React Native)
- API (Laravel)

## Requirements
- Node (14 to 16) (Note: 17 has some issue)
- yarn

## Installation
```
# Clone the repo
git clone https://github.com/sumnima-limbu/project.git

# make sure node is 14 to 16

# Install dependencies
yarn install 

```

## Get Started
- Make sure the api is up and running.
- In GlobalStore update the API_BASE_URL. If you are running API at localhost. you can get the ipaddress for localhost  
  if you open the web debugbar. Right above the barcode, you can see the ip address.
- Open the terminal and make sure node is 14 to 16 using "node -v"
- Create account at expo.dev and login from the terminal using "expo login". This is required to use notification and location service.
- Connect your android phone using usb cable. Make sure usb debugging is turned on and select "FileTransfer/Android auto" when asked.
- run "yarn start"
- select "a" to run app in the android. It will automatically start the app.
- select "d" to open web debugger
- Follow installation instruction for api in api repo.
