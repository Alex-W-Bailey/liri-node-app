# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

How To Run LIRI
---------------
**1. Clone Github Repo**
- HTTPS Link: https://github.com/xKingAlex/liri-node-app.git
- SSH Link: git@github.com:xKingAlex/liri-node-app.git

Go to terminal, gitbash, or any other command line application and enter : *git clone <repo_link>*

![clone_repo](https://user-images.githubusercontent.com/41297819/68448284-a144de00-01a8-11ea-9a7c-44437e388a05.gif)

- Navigate into the cloned repo via command line application

**2. Get API Keys**

- First you will need to get all the API keys

- You will need to navigate to : *https://developer.spotify.com/* and create a new account and register a new app named LIRI
- Go to the dashboard screen. Here you should see you api keys

![spotify-api](https://user-images.githubusercontent.com/41297819/68448984-01d51a80-01ab-11ea-8170-794905d19dee.png)

Next you will need an OMBD API

- Go to : *https://www.omdbapi.com/* and click the API Key tab at the top and get a new API key
- Click the free radio button and enter your information. It will email you your API key

**3. Create .env File**

- Now go to your command line application and type : *touch .env*

- Open your .env file to edit it with the following code

```
# Spotify API Keys

SPOTIFY_ID=your-key-here
SPOTIFY_SECRET=your-secret-here

# OMBD API

OMBD_KEY=your-key-here
```

- Replace the placeholder text with your API keys
- Save the file

**4. Insall Node Packages**
- After creating .env file you need to install all the node packages
- Enter the command *npm i* into your command line application to install everything needed

RUN THE APP
-----------

**List of commands**
- movie-this movie-name
  - this gives you movie info
- spotify-this song-name
  - this gives you song info
- concert-this artist-name
  - this gives you the next concert for an artist or band
- do-what-it-says
  - this will do whatever is in the *random.txt* file

Enter the run command

- Ex: *node liria.js spotify-this Circles* and you should get the following data back

![image](https://user-images.githubusercontent.com/41297819/68450510-ef5ddf80-01b0-11ea-84ba-a874f195f4ca.png)

