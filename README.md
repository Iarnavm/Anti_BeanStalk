---
title: "Phishing Detection Chrome Extension"
output: 
  html_document:
    theme: spacelab
---

# Phishing Detection Chrome Extension

![Phishing Detection](https://your-image-url.com/phishing_detection_logo.png)

## Overview

Phishing Detection Chrome Extension is a browser extension built to enhance your online security by detecting potential phishing websites using neural networks. The extension leverages a neural network model deployed on AWS Elastic Beanstalk, accessible via a secure API. Given a URL, the API provides a boolean value indicating whether the website is predicted to be a phishing site or not.

## Features

- **Real-time Phishing Detection:** Quickly assess the potential threat level of a website as you browse.
- **Neural Network Model:** Utilizes an ONNX instance of a neural network model for accurate and efficient phishing detection.
- **Secure AWS Deployment:** The extension communicates with an AWS Elastic Beanstalk deployment, ensuring a reliable and scalable backend for phishing predictions.
- **User-Friendly Interface:** Seamlessly integrated into your Chrome browser with a user-friendly interface for easy interaction.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/phishing-detection-extension.git
    ```

2. Navigate to the extension folder:

    ```bash
    cd phishing-detection-extension
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Load the extension in Chrome:

    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" in the top right.
    - Click "Load unpacked" and select the extension folder.

## Usage

1. Browse the internet as usual.
2. Click on the extension icon in the toolbar to analyze the current website.
3. The extension will send a request to the AWS API, and the result will be displayed.

## Configuration

In the `config.js` file, you can customize the API endpoint and other settings as needed.

```javascript
module.exports = {
  apiEndpoint: 'https://your-aws-api-endpoint.com',
  // Add other configuration options here
};
