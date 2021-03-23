# Poker

The front end for a Poker app. Written using React.

The back end for the same app can be found [here](https://github.com/dan-holmes/poker-backend).

A live version off the app can be found [here](https://dh-poker.vercel.app/).

![Screenshot](https://i.imgur.com/m6rb1ms.png)

# Installation

To install a local copy of this program please follow the following steps to run the software on your machine.


Backend:
```
git clone https://github.com/dan-holmes/poker-backend.git
cd poker-backend
bundle install
rackup
```

Frontend:
```
git clone https://github.com/dan-holmes/poker-frontend.git
cd poker-frontend
npm install
npm start
```

Then visit ``http://localhost:3000``

# Testing

This app is unit tested on the back end. To run the tests run ``rspec`` in the backend folder.

# Missing features

Future features to make this a more complete Poker app include

- Splitting the pot between multiple winners.
- Creating a seperate pot to continue betting when one player runs out of money.
- Implementing the correct rules for minimum raises.
