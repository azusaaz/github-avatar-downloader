var request = require('request');

console.log('welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    cb(err,body);
 
 });
}



getRepoContributors("nodejs", "node", function(err, result){
  console.log("Errors:", err);
  console.log("Result:", result);
});

