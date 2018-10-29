var request = require('request');

console.log('welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  
}

getRepoContributors("nodejs", "node", function(err, result){
  console.log("Errors:", err);
  console.log("Result:", result);
});