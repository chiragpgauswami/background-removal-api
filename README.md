# Background Removal API

This project implements an API for removing backgrounds from images. It utilizes the remove.bg API for background removal.

## Tech Stack

The API is built using the following technologies:

- Node.js
- Express.js
- Multer
- remove.bg API

## Features

- Remove backgrounds from images
- Supports JPEG and PNG image formats
- API returns the path to the output image

## Usage

To use the Background Removal API, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/chiragpgauswami/background-removal-api.git
```

2. Install dependencies:

```bash
cd background-removal-api
npm install
```

3. Create an uploads folder in the root directory of the project:

```bash
mkdir uploads
```

4. Set up environment variables:

   - `YOUR_REMOVE_BG_API_KEY`: Your remove.bg API key.

5. Start the server:

```bash
npm start
```

6. Access the API endpoint:

- POST `/remove-background`: Upload an image file to remove its background.

## Demo Response

Upon successful background removal, the API returns a JSON object with the path to the output image. Here's a sample response:

```json
{
  "success": true,
  "outputPath": "http://localhost:3000/uploads/output.png"
}
```

## Customization

You can customize the API by modifying the code in the `app.js` file. Feel free to add additional features or modify the existing functionality to suit your requirements.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

## Author

This project was created by [chiragpgauswami](https://github.com/chiragpgauswami).

## License

This project is licensed under the [MIT License](LICENSE).
