module.exports = function(router) {
  // A POST request to /api/students will 
  // create a student based on request body
  router.post('/saveSms', function (req, res) {
    res.send(req.body);
    console.log(req.body);
  });
};