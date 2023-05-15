const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role.js');
process.env.JWT_SECRET = 'mysecretkey';


// Login function
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    let user = await Role.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}




// Define the addRole function
async function addRole(req,res) {
  const { name, username, password } = req.body;
  try {
   

    // Create a new Role document
    const newRole = new Role({ name, username, password });
 
    // Save the new Role document to the database
    await newRole.save();
res.status(200).json({"Messgae":"added"})
    console.log(`Role ${name} added successfully!`);
  } catch (err) {
    console.error('Failed to add role:', err);
  }
}


async function editUserInfo( req,res) {
  const { roleId } = req.params;

  const { name, username, password } = req.body;
  try {
    // Find the Role document by ID
  //  const  role = await Role.findById(roleId);


   const updatedUser = await Role.findByIdAndUpdate(roleId,
    { username,name ,password},
    // Assuming the role ID is stored in _id field
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Role and user info updated successfully" });
} catch (err) {
  console.error('Failed to add role:', err);
  res.status(500).json({ message: "Internal server error" });






}
}





async function removeUser(req,res) {
  try {
    const { roleId } = req.params;
    // console.log({roleId})

    const deleteduser = await Role.findByIdAndRemove(roleId);

    if (!deleteduser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};






async function getUsers() {
        User.find().lean().exec((err, users) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            res.status(200).json(users);
          }
        });
      
}



module.exports = {
  login,
  addRole,
  getUsers,
  editUserInfo,
  removeUser
};
