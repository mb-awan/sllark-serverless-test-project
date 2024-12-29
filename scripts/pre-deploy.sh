# Remove the existing zip file
rm -f apis.zip

# Build the project
npm run build

# Create the zip file including both 'dist' directory and '.env.production' file
zip -rq apis.zip dist .env.production node_modules

# List the size of the created zip file
ls -lh apis.zip
