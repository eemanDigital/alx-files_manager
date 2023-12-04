const crypto = require('crypto');
const dbClient = require('../utils/db');

class UsersController {
  /**
   * Handles the creation of a new user.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} - Returns a Promise indicating the completion of the operation.
   */
  static async postNew(req, res) {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
      });
    }
    if (!password) {
      return res.status(400).json({
        error: 'Missing password',
      });
    }

    // Check if user with the provided email already exists
    const existingUser = await dbClient.usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Already exists',
      });
    }
    // hash password
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Create the user object with hashed password
    const newUser = {
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    const result = await dbClient.usersCollection.insertOne(newUser);

    // Respond with the new user details (only email and auto-generated id)
    return res.status(201).json({
      id: result.ops[0]._id,
      email: result.ops[0].email,
    });
  }
}

module.exports = UsersController;
