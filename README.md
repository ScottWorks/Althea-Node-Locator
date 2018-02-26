# Althea Node Locator

The Node Locator utilizes Google Maps API + Firebase Realtime Database to provide a visual representation of the approximate location of potential nodes in the althea network. This application can be integrated into website or platform that requires the collection of user data that can be displayed on a map. 

### Generic Node-Locator
![Alt Text](http://res.cloudinary.com/dcgnyswpg/image/upload/v1519434259/demo2-screenshot_ck37tv.png)

### [Althea Mesh Node-Locator](https://altheamesh.com/)
![Alt Text](http://res.cloudinary.com/dcgnyswpg/image/upload/v1519432417/demo-screenshot_epd4jg.png)


# Getting Started

To begin you will need to install and configure Firebase CLI if you do not already have it. This must be done for code to be deployed to the Firebase Cloud Function server.

To install the Firebase CLI, you first need to [sign up for a Firebase account](https://firebase.google.com/).

Then you need to install [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/). **Note that installing Node.js should install npm as well.**

Once npm is installed, get the Firebase CLI by running the following command:

> npm install -g firebase-tools

This will provide you with the globally accessible firebase command.

In the terminal change the current directory to the functions directory, enter the following command to download all of the necessary packages in the functions directory.

> npm install

## Firebase Setup

Change the back to the top level of the project, in the terminal enter

> firebase setup:web

Firebase will provide an output that must be copied and pasted into the app.js file. 

```
firebase.initializeApp({
  "apiKey": "<YOUR API KEY>",
  "databaseURL": "https://<YOUR PROJECT ID>.firebaseio.com",
  "storageBucket": "<YOUR PROJECT ID>.appspot.com",
  "authDomain": "<YOUR PROJECT ID>.firebaseapp.com",
  "messagingSenderId": "<MESSAGING SENDER ID>",
  "projectId": "<YOUR PROJECT ID>"
});
```

In the .firebaserc file replace deafult vaue to your the project ID provided previously.

```
{
  "projects": {
    "default": "<YOUR PROJECT ID>"
  }
}
``` 

## RECAPTCHA Setup

Next you will need to get an API key from [RECAPTCHA](https://www.google.com/recaptcha/admin#list). Under the 'register a new site' section select reCAPTCHA V2, then proceed to add the appropiate domain(s) that will be required for your web application.

Under 'Keys' copy the 'Site Key' then paste it in the data-sitekey field of index.html. 

```
  <div class="g-recaptcha" 
  data-sitekey="<YOUR API KEY HERE>">
  </div>
```

Then copy the 'Secret Key' and paste it in the secret field of index.js. 

```
var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "<YOUR API KEY HERE>",
  formatter: null
};
```

## Google Maps Setup

For the [Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key) API keys, select 'Get A Key', create a new Project, then copy-paste the API key into the following files:

index.html
```
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR API KEY>"></script>
``` 

index.js
```
var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "<YOUR API KEY>",
  formatter: null
};
```

## Firebase Database Setup

Before you are able to read or write to the firebase database you must change the default permissions. In the firebase [console](https://firebase.google.com/) navigate to the real time database section, select 'Get Started'. Under the 'Rules' tab copy and paste the following:

```
{
  "rules": {
    "Country":{
    ".read": false,
    ".write": "auth != null"      
    },
    "Markers":{
    ".read": true,
    ".write": "auth != null"      
    }
  }
}
```

These rules are set such that only the Markers can be read by the client, and firebase's cloud functions can write to the database (or anyone with sufficent credentials). 

## Firebase Cloud Functions Setup

For correct routing of POST requets, the URL in the code below should be changed. This URL will either be the URL of the website that will contain the node-locator (recommended) or the default authorized domain (https://<YOUR PROJECT ID>.firebaseapp.com). If you choose to use your website's URL, go to the firebase console, then under 'Hosting' select 'Connect Domain' and follow the required steps. 

index.html
```
<form action="https://<YOUR URL>/submit" method="POST" target="votar">
```

## Deploying to Firebase

Once you have the API Keys and Firebase CLI ready you can deploy the app from the working directory using:

> firebase deploy

When the deployment completes successfully you will copy/ paste the **Hosting URL** into your web browser before interacting with the node-locator client.

* Notes:
  * Ensure you have setup RECAPTCHA such that it will function on the your [websites domain](https://developers.google.com/recaptcha/docs/domain_validation). If you are running this application locally set the domain in RECAPTCHA to 127.0.0.1 and use 127.0.0.1:3000 in the browser.


 ## Site Integration

 For this application to be pulled into a site or standalone-app the developer will need the following front-end code:

- index.html
- app.js
- markerclusterer.js
- style.css 
