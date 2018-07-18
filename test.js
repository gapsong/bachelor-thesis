var GitHubCommits = require("github-commits");
var gitHubCommits = new GitHubCommits();
 
gitHubCommits.forUser("gapsong")
            .commitsUntil("2020-12-31T23:59:59Z")
            .sumCommits(function(sum){
              console.log(sum);
            });
