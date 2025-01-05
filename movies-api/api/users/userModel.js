import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true },
  favorite_movies: {type: [Number], unique: true, required: false}
});

const pwdValidator = (password) => {
    return password = regex.test(password);
  }
  UserSchema.path("password").validate(pwdValidator);

  UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
  }

  UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
  };

  UserSchema.pre('save', async function(next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    //const user = this;
    if (this.isModified('password') || this.isNew) {
      try {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (error) {
       next(error);
    }
  
    } else {
        next();
    }
  });

  // list user's favorite movies
  UserSchema.methods.addFavorite = function (movieId) {
    if (this.favorite_movies.indexOf(movieId) === -1) {
      this.favorite_movies.push(movieId);
    }
    return this.save();
  };

  // list all favorite movies of a user
  UserSchema.methods.getFavoriteMovies = function () {
    return this.favorite_movies;
  };
  

export default mongoose.model('User', UserSchema);