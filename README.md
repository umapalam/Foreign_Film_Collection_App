# Foreign_Film_Collection_App
An application that uses mongoose, mongodb, express, node.js, and ejs.  

Unit 2 Project: Application for Foreign Film Database Collection

The general idea of this project is for a user to be able to keep an ongoing list of foreign language films to watch. Users can update, edit and delete films from their collection as they choose. Films must be made in a foreign country and another language or languages besides English must be spoken in the film. No American films. 

Forthcoming Features: A User/Password Session Authentication. Adding another model with trailers for films. 
______________________________________________________________________

Basic Model Schema 

filmTitle: String
director: String
starring: String
country: String
plotDescription: String
filmGenre: String
setting: String
runTime: Number
languages: String
seenTheMovie?: Boolean
filmPoster: String
______________________________________________________________________

Routes 

get --> /films --> Index --> list of all foreign films
get --> /films/:id --> Show --> each film show page
get --> /films/new --> New --> form to add films to the database
post --> /films --> Create --> add new film to database
delete --> /films/:id --> Destroy --> deletes a film from the database
get --> /films/:id/edit --> Edit --> form to edit an existing film in database
put --> /films/:id --> Update --> update information on a film and then redirect

_______________________________________________________________________

User Stories: 

As an app user, I want to be able to see a list of foreign language films on the index page, so that I can track them.
As an app user, I want to be able to add new films, so that my collection can grow
As an app user, I want to be able to edit existing films, so that I can add information or change it if it is incorrect
As an app user, I want to be able to delete films, so that I can prioritize the films I want to see versus the ones I do not

MVP Goals -
- App uses Node.js, Mongoose, Express, and EJS
- App follows MVC structure (Models, View, Controllers)
- Create an app with all seven RESTful routes
    - Index
    - Show
    - New
    - Create
    - Destroy
    - Edit
    - Update
- Add README.md file.
- App deployed with Heroku
- Add CSS styling

Stretch Goals -
- Add username/password authentication
- Group films by language
- Add preview clip of film (i.e trailer to each film show page)
- Partials in View Folder (Header/Footer)

----------------------------------------------------------------------