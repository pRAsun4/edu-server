export const getUserProfile = (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};

export const updateUserProfile = (req, res) => {
  const { username } = req.body;
  res.json({ message: "User profile updated successfully", username });
};

// export default { getUserProfile, updateUserProfile };
