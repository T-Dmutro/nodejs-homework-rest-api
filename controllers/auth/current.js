async function current(req, res, next) { 
  try { 
      const { email , subscription} = req.user; 
      console.log(req.user) 
      res.status(200).json({ 
                      "email": email, 
                      "subscription": subscription}) 
  } catch (error) { 
      next(error) 
  }}

module.exports = current;
