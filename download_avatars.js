var args = process.argv.slice(2);

var fs = require('fs');
var request = require('request');
var { GITHUB_TOKEN } = require('./secrets');

console.log('\n========================================');
console.log('\nwelcome to the GitHub Avatar Downloader!');
console.log('\n========================================');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'token': GITHUB_TOKEN
    }
  };

  request(options, function (err, res, body) {
    var obj = JSON.parse(body);
    cb(err, obj);
  });
}

// accept two arguments "repo-owner" and "repo-name" of github
getRepoContributors(args[0], args[1], function (err, result) {
  if (!args[0]) {
    console.log("\nplease specify repo-owner and repo-name and please try again\n");
    return;
    // throw "error";  <- also fine
  }

  console.log('\nDownloading images...\n');

  //loop downloading
  for (obj of result) {
    downloadImageByURL(obj['avatar_url'], `./avatars/${obj['login']}.jpg`);
  }
  console.log('\nDownload complete!\n');
})

//download one file 
function downloadImageByURL(url, filePath) {

  console.log("filePath", filePath);

  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}