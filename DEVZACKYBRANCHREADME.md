## Changes Made

### Server-Side Changes

1. **File Upload Handling**:

   - Added code to handle file uploads in `index.php`.
   - Created an `uploads` directory to store uploaded files.
   - Updated the `create-task` endpoint to handle file uploads and store the file path in the database.
2. **Serving Static Files**:

   - Added a `.htaccess` file to serve static files from the `uploads` directory.

### Client-Side Changes

1. **UploadPage Component**:

   - Updated the form to handle file uploads using `FormData`.

> NB:
> thnaks to akseli for doing most the work
