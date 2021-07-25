# Persistent & Shareable ToDo List for Everyone
- You can have your own ToDo list that you can share or keep for yourself just by browsing to https://url/ (your name or anything here)
- Made with: NodeJS, Express, EJS, MongoDB Atlas, Mongoose

# Live
[You can experience the dynamic ToDo List live here](https://todolist-4-everyone.herokuapp.com)

# Screenshots
- Example A (a list at /Alex)

![screenshot1](https://raw.githubusercontent.com/BaraSec/todolist-4-everyone/main/image.png)
- Example B, (another list at /Bara, all lists are saved and editable separately)

![screenshot2](https://raw.githubusercontent.com/BaraSec/todolist-4-everyone/main/image2.png)

# Usage
1. To run the project, create a .env file with the entry `MONGO_URL` containing your Mongo Atlas URL, where new entries will be stored and retrieved from
2. Install the npm dependencies with `npm install`
3. Execute `npm start`, or `npm run dev` to use nodemon
4. Access the app at `http://localhost:3000`
