const User = require('./models');
exports.createUser = async (email) => {
  const user = new User({ email });
  await user.save();
  return user;
};
exports.updateUser = async (email) => {
  const user = await User.findOneAndUpdate({ email },  { new: true });
  return user;
};
exports.deleteUser = async (email) => {
  await User.findOneAndDelete({ email });
};
