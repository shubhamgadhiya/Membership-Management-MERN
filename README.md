# Membership Management Application Task

A Membership Management Application Task built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

  

### Prerequisites

- Node.js installed on your machine with latest version or v22.14.0
- MongoDB Atlas account (or local MongoDB server)


### Installation

1. Clone the repo:
   ```sh
   git clone git remote add origin https://github.com/shubhamgadhiya/Membership-Management-MERN.git
   ```

2. Install NPM packages:
   ```sh
   cd Backend
   npm install
   cd..
   cd frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` in file after creating a `config folder` in the backend directory, containing the following variables:
   ```env
 PORT = 4000
MONGODB = "Enter your Mongodb Url"
SECRET_KEY = "shubham"
FRONTENDURL = "http://localhost:5173"
   ```

   Replace each value with your specific configuration details.

4. Run the application Backend:
   ```sh
   npm run dev
   ```
5. Run the application Frontend:
   ```sh
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173` to view the app.