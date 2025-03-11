# DriverSpot API

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/sunanth-developer/DriverSpot-api.git
cd DriverSpot-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Edit `.env` file with your credentials:
- Add your MongoDB URI
- Add your JWT secret
- Add your Twilio credentials

5. Start the server
```bash
npm start
```

## Environment Variables

The following environment variables are required:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `TWILIO_ACCOUNT_SID`: Your Twilio account SID
- `TWILIO_AUTH_TOKEN`: Your Twilio auth token
- `TWILIO_VERIFY_SID`: Your Twilio verify service SID

## Security Notes

- Never commit the `.env` file
- Keep your credentials secure
- Regularly rotate your secrets 