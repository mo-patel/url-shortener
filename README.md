# url-shortener

## Setup

<strong>Please note, Docker must be installed to run this repo</strong>

Once the git repo has been cloned, you must configure your environment variables. Copy the `.env.example` file to a `.env` file and fill in the settings correctly. Ensure the `.env` file is saved at the root of the project.

Once that is complete, to start building the project, run:
```
docker-compose up --build
```
Be patient as this command may take some time

## Usage

In order to generate a new shortened link, visit the following page in a browser

```
localhost:4000/shorten?link=google.com
```
'google.com' can be changed to any link you wish to store
Upon success, you will see a message on screen containing a shortcode.

You must use that shortcode for the following route to be redirected
```
localhost:4000/r/<shortcode>
```
Replace \<shortcode> with the code that was returned to you from the previous request. This should redirect you to the stored website.