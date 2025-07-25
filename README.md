# Romania Endpoints

**Open-source APIs for Romania** - A collection of free, public APIs providing various Romanian data services.

## What is this?

This project offers **free and open APIs** for anyone who needs Romanian data. Whether you're building an app, doing research, or just curious about Romanian information, these APIs are here to help.

## Available APIs

### **Geographic Data**
- **Counties** - All Romanian counties with codes and information
- **Localities** - Cities, towns, and villages with population data and coordinates  
- **Postal Codes** - Complete postal code database with addresses

### **Company Data**
- **CUI Verification** - Check Romanian companies by their tax identification number (CUI)
- **ANAF Integration** - Real-time company data from the official Romanian tax authority

## Completely Free

All APIs are:
- **Free to use** - No API keys, no registration, no limits
- **Open source** - Full code available on GitHub
- **No restrictions** - Use for personal or commercial projects
- **Community driven** - Built by and for the Romanian tech community

## Getting Started

Visit the **[API Documentation](https://your-domain.com/api/docs)** to explore all available endpoints and start using the APIs immediately.

## Want to Contribute?

This project is **community-driven** and we welcome all contributions!

### Ways to help:
- **Report bugs** or issues you find
- **Suggest new APIs** or data sources for Romania
- **Submit code** improvements or new features
- **Improve documentation** 
- **Spread the word** about the project

### Ideas for new APIs:
- Weather data for Romanian cities
- Public transportation information
- Government institution data
- Educational institutions database
- Healthcare facilities
- Tourist attractions and landmarks
- Economic indicators
- Any other Romanian data that could be useful!

## Documentation

Full API documentation with examples and interactive testing is available at `/api/docs` when running the server.

## For Developers

If you want to run this locally or contribute code:

```bash
# Clone the repository
git clone https://github.com/asanducristian/romaniaendpoints.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and other settings

# Set up your database
npx prisma db push

# Start the development server
npm run start:dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/romaniaendpoints_db"

# Application
PORT=3010
NODE_ENV=development

# Base URL for the application (used in logs and Swagger)
BASE_URL=http://localhost:3010
```

For production, update `BASE_URL` to your actual domain:
```env
BASE_URL=https://your-domain.com
```

## Get in Touch

- **GitHub Issues** - For bugs, feature requests, or questions
- **GitHub Discussions** - For general conversations about the project
- **Star the repo** if you find it useful!

## Made in Romania

This project is built with love for the Romanian developer community and anyone working with Romanian data.

---

**Remember**: This is a community project. The more people contribute, the better it becomes for everyone!