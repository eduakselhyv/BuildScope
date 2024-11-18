# Instructions
## Client
- Requirements:
    Node installed

- Steps:
    - Navigate to Client with 'cd Client'
    - Install packages with 'npm i'
    - Run application with 'npm start'

## Server
- Requirements:
    - Composer
    - php installed (for example via xampp)

- Steps:
    - Download [the latest mongodb extension for php](https://pecl.php.net/package/mongodb).
        - Press the DLL download if on windows.
        - Download the thread safe version. Make sure to download the one with the same php version as yours!
        - Drop the extension into php\ext.
        - Include the extension in your php.ini found in php folder. To include it, type 
        'extension=' followed by the name of the file. for example, 'extension=php_mongodb.dll'
    - Navigate to Server with 'cd Server'
    - Install dependencies with 'composer install'
    - Run server with 'php -S localhost:8000'

# Notes
- For some reason registering is not functional. Not sure why. Works fine on postman, but not on react.
