var cheerio = require('cheerio');
var fs = require('fs');

////////////////////////////////////

var selector = 'span.title.fsl.fwb.fcb';

///////////////////////////////////

function compress(ls){                 //convert from [a,a,b,b] => [a,b]
  var temp = [];
  for(i = 0; i < ls.length; i += 2){
    temp.push(ls[i]);
  }
  return temp;
}

////////////////////////////////////

function get_requests(data){
  $ = cheerio.load(data);

  var friend_requests = [];

  $(selector).each(function(index, element){
    friend_requests.push($(this).text());
  });

  friend_requests = compress(friend_requests);

  return friend_requests
}

////////////////////////////////////

module.exports = {
  get_requests : get_requests
};
