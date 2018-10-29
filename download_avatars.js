var request = require('request');
var {GITHUB_TOKEN} = require('./secrets');

console.log('welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'token': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    cb(err,obj);
 });
}



getRepoContributors("nodejs", "node", function(err, result){
  console.log("Errors:", err);
  for(obj of result){
    console.log("Result:", obj['avatar_url']);
  }
});

