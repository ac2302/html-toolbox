# HTML Toolbox

## Description

This is a simple React Native application that allows you to create, edit, and view HTML snippets. It uses `AsyncStorage` to store the tools locally on the device.

## Installation

1.  Install the dependencies:

    ```bash
    npm install
    ```
2.  Start the application:

    ```bash
    npm start
    ```

## Usage

The application has four main screens:

*   **Tools List:** This screen displays a list of all the tools. You can tap on a tool to view its HTML code, or you can tap on the "Edit" or "Delete" buttons to edit or delete the tool.
*   **Create Tool:** This screen allows you to create a new tool. You can enter a name and HTML code for the tool.
*   **Edit Tool:** This screen allows you to edit an existing tool. You can change the name or HTML code of the tool.
*   **Tool View:** This screen displays the HTML code of a tool using `react-native-webview`.

## Components

The application has the following main components:

*   **App:** This is the main component that sets up the navigation.
*   **ToolsList:** This component displays a list of tools.
*   **CreateTool:** This component allows you to create a new tool.
*   **EditTool:** This component allows you to edit an existing tool.
*   **ToolView:** This component displays the HTML code of a tool.

## Technical Details

*   The application uses `react-navigation` for navigation.
*   The application uses `AsyncStorage` to store the tools locally on the device.
*   The application uses `react-native-webview` to display the HTML code of a tool.
*   Tools are sorted by last used timestamp, with most recent first.