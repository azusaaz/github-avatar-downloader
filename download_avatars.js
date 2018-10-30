var args = process.argv.slice(2);

var request = require('request');
var { GITHUB_TOKEN } = require('./secrets');
var fs = require('fs');

console.log('\n========================================');
console.log('\nwelcome to the GitHub Avatar Downloader!');

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

getRepoContributors(args[0], args[1], function (err, result) {

  console.log('\nDownloading images...\n');

  for (obj of result) {
    downloadImageByURL(obj['avatar_url'], `./avatars/${obj['login']}.jpg`);
  }
  console.log('\nDownload complete!\n');
});

function downloadImageByURL(url, filePath) {

  console.log("filePath", filePath);
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
}