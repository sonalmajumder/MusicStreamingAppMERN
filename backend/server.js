const express =require('express')
const cors =require('cors')
const multer = require('multer');
require("./db/config.js")
const Admin=require('./db/admin/admin.js')
const songs =require('./db/admin/Addsongs.js')
const users=require('./db/User/user.js')
const WishlistItem =require('./db/User/Wishlist.js')
const PlaylistItem=require('./db/User/Playlist.js')

const app=express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: 'uploads', // The directory where uploaded files will be stored
    filename: function (_req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads')); 



                                                //  Admin  //

// Login
app.post('/alogin', (req, resp) => {  
    const { email, password } = req.body;   
    Admin.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
  })
  
  // Register Api
  app.post('/asignup', (req, resp) => {
    const { name, email, password } = req.body;
    Admin.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                Admin.create({ email: email, name: name, password: password })
                    .then(_result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(_err => resp.json("failed "))
  })

app.get('/users',(_req,res)=>{
    users.find()
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})
app.delete('/userdelete/:id',(req,res)=>{
    const { id }=req.params
     users.findByIdAndDelete(id)
     .then(() => {
        res.sendStatus(200);
    })
    .catch((_error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
  })
  app.delete('/userorderdelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await myorders.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (_error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.delete('/useritemdelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await items.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (_error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/sellers',(_req,res)=>{
    seller.find()
    .then((seller)=>{
        res.status(200).json(seller)
    })
    .catch(() => {
        res.sendStatus(500)
    })
})

app.delete('/sellerdelete/:id',(req,res)=>{
    const { id }=req.params
     seller.findByIdAndDelete(id)
     .then(() => {
        res.sendStatus(200);
    })
    .catch((_error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
  })
    app.get('/orders', (_req, res) => {
    myorders.find()
        .then((orders) => {
            res.status(200).json(orders)
        })
        .catch(() => {
            res.sendStatus(500)
        })
});
app.post('/addsong', upload.single('songUrl'), (req, res) => {
    const { title, genre, singer, image } = req.body;
    const songUrl = req.file ? req.file.path : undefined;

    const song = new songs({ songUrl, title, genre, singer, image });

    song.save()
        .then(savedSong => {
            res.status(201).json(savedSong);
        })
        .catch(_err => {
            res.status(400).json({ error: 'Failed to create song' });
        });
});

app.get('/mysongs',(_req,res)=>{
    songs.find()
    .then((song)=>{
        res.status(200).json(song)
    })
    .catch(_err => {
        res.status(400).json({ error: 'Failed to create song' });
    });
})

app.delete('/deletesong/:id',(req,res)=>{
    const {id} =req.params;
    songs.findByIdAndDelete(id)
    .then(() => {
        res.sendStatus(200);
    })
    .catch((_error) => {
        res.status(500).json({ error: 'Internal server error' });
    });
})
                                         // User

   // login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
        users.findOne({ email: email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        return res.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                    }
                    else {
                        res.json("Invalid Password")
                    }
                }
                else {
                    res.json("User not found")
                }
            })
    })
    
    app.post('/signup', (req, resp) => {
        const { name, email, password } = req.body;
        users.findOne({ email: email })
            .then(use => {
                if (use) {
                    resp.json("Already have an account")
                } else {
                    users.create({ email: email, name: name, password: password })
                        .then(_result => resp.json("  Account Created"))
                        .catch(err => resp.json(err))
                }
            }).catch(_err => resp.json("failed "))
    })                     
app.get('/songs',(_req,res)=>{
    songs.find()
    .then((song)=>{
        res.status(200).json(song)
    })
    .catch(_err => {
        res.status(400).json({ error: 'Failed to create song' });
    });
})
app.get('/wishlist', async (_req, res) => {
    try {
      const wishlistItems = await WishlistItem.find();
      res.json(wishlistItems);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  app.get('/wishlist/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await WishlistItem.find({ userId }).sort('position');
        res.json(tasks);
    } catch (_err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/wishlist/add', async (req, res) => {
    const { itemId, title,image,userId,userName,genre,songUrl,singer } = req.body;

    try {
        // Check if the item is already in the wishlist
    
        const existingItem = await WishlistItem.findOne({ itemId });
        if (existingItem) {
            return res.status(400).json({ msg: 'Item already in wishlist' });
        }
        // Create a new wishlist item   
        const newItem = new WishlistItem({ itemId,title,userId,userName,genre,songUrl,image,singer});
        await newItem.save();

        res.json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

  app.post('/wishlist/remove', async (req, res) => {
    const { itemId } = req.body;
  
    try {
      // Find and remove the item from the wishlist
      await WishlistItem.findOneAndDelete({ itemId });
  
      res.json({ msg: 'Item removed from wishlist' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

             //Playlist
  app.get('/playlist', async (_req, res) => {
    try {
      const playlist = await PlaylistItem.find();
      res.json(playlist);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  app.get('/playlist/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const playlist = await PlaylistItem.find({ userId }).sort('position');
        res.json(playlist);
    } catch (_err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/playlist/add', async (req, res) => {
    const { itemId, title,image,userId,userName,genre,songUrl,singer } = req.body;

    try {
        // Check if the item is already in the wishlist
    
        const existingItem = await PlaylistItem.findOne({ itemId });
        if (existingItem) {
            return res.status(400).json({ msg: 'song already in Playlist' });
        }
        // Create a new wishlist item   
        const newItem = new PlaylistItem({ itemId,title,userId,userName,genre,songUrl,image,singer});
        await newItem.save();

        res.json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

  app.post('/playlist/remove', async (req, res) => {
    const { itemId } = req.body;
  
    try {
      // Find and remove the item from the wishlist
      await PlaylistItem.findOneAndDelete({ itemId });
  
      res.json({ msg: 'Item removed from playlist' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


app.listen(7000,()=>{
    console.log(" Port is Listening on 7000")
})