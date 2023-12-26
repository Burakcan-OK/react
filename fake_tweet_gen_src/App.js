import React from 'react';
import { useState, createRef, useEffect } from 'react';
import './App.css';
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  VerifiedIcon,
  BookmarkIcon,
  ShareIcon,
} from './icon';
import { AvatarLoader } from './loader';
import { useScreenshot } from 'use-react-screenshot';

function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    callback.call(this, dataURL);
    // Clean up
    canvas = null;
  };
  img.src = url;
}

const tweetFormat = (tweet) => {
  tweet = tweet
    .replace(/@([\w]+)/g, '<span>@$1</span>')
    .replace(/#([\wşçöüğıİ]+)/gi, '<span>#$1</span>')
    .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
    .replace(" ","&nbsp;&nbsp;&nbsp;")
    .replace("/n", "<br>");
    
  return tweet;
};

const formatNumber = (number) => {
  if (!number) {
    number = 0;
  }
  if (number < 1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split('.');
  return (
    number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + 'B' : ' B')
  );
};
const formatDate=(time) =>{
  time=String(time).split("-")
  var m =time[1]
  let month=''
  if(m=="01"){month= 'JAN'}
  else if(m=="02"){month= 'FEB'}
  else if(m=="03"){month= 'MAR'}
  else if(m=="04"){month= 'APR'}
  else if(m=="05"){month= 'MAY'}
  else if(m=="06"){month= 'JUN'}
  else if(m=="07"){month= 'JUL'}
  else if(m=="08"){month= 'AUG'}
  else if(m=="09"){month= 'SEP'}
  else if(m="10"){month= 'OCT'}
  else if(m=="11"){month= 'NOV'}
  else if(m=="12"){month= 'DEC'}
  return `${month} ${time[2]}, ${time[0]}`
}

function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(1422);
  const [time, setTime] = useState('');
  const [date, setDate] = useState();
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    takeScreenshot(tweetRef.current);
  };
  const ımageConverter = () => {
    convertImgToBase64(
      "https://pbs.twimg.com/profile_images/1506317244510478349/-475uWql_400x400.jpg",
      function (base64Image) {
        setAvatar(base64Image);
      }
    );
  };
  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  const fetchTwitterInfo = () => {
    fetch(
      `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
    )
      .then((res) => res.json)
      .then((data) => {
        const twitter = data[0];
        convertImgToBase64(
          twitter.profile_image_url_https,
          function (base64Image) {
            setAvatar(base64Image);
          }
        );
        setName(twitter.name);
        setUsername(twitter.screen_name);
        setTweet(twitter.status.text);
        setRetweets(twitter.status.retweet_count);
        setLikes(twitter.status.favorite_count);
      });
  };

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Settings</h3>
        <ul>
          <li>
            <label>Name Surname</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>username</label>
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              className="text-area"
              maxLength={290}
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input className="input" type="file" onChange={avatarHandle} />
          </li>
          <li>
            <button onClick={ımageConverter}>Convert Image</button>
          </li>
          <li>
            <label>Retweet</label>
            <input
              className="input"
              type="number"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>Quote Tweets</label>
            <input
              className="input"
              type="number"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>Likes</label>
            <input
              className="input"
              type="number"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <option>
            <label>Verified Account</label>
            <select
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </option>
          <li>
            <label>Time</label>
            <input
              className="input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </li>
          <li>
            <label>Date and Time</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li>
            <label>Views</label>
            <input
              className="input"
              type="number"
              value={views}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <button onClick={getImage}>Generate</button>
          <div className="download-url">
            {image && (
              <a ref={downloadRef} href={image} download="tweet.png">
                Download Tweet
              </a>
            )}
          </div>
        </ul>
      </div>
      <div className="tweet-cotainer">
        <div className="fetch-info">
          <input
            placeholder="Twitter Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchTwitterInfo}>Fetch Info</button>
        </div>
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {avatar ? <img src={avatar} /> : <AvatarLoader />}
            <div>
              <div className="name">
                {name || 'Name-Surname'}
                {isVerified == 1 && <VerifiedIcon />}
              </div>
              <div className="username">@{username || 'account-name'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html: tweet ? tweetFormat(tweet) : 'Fake tweet space',
              }}
            ></p>
          </div>
          <div className="tweet-stats">
            <time>
              {time} AM
            </time>
            <span >·</span>
            <time>
              {formatDate(date)}
            </time>
            <span>
              <b className="view-num"><span >·</span>{views > 0 ?formatNumber(views):null}</b> Views
            </span>
          </div>
          <div className="tweet-actions">
            <span className="tweet-act-count">
              <ReplyIcon />
              <span>{retweets > 0 ? formatNumber(retweets) : null}</span>
            </span>
            <span className="tweet-act-count">
              <RetweetIcon />
              <span>{quoteTweets > 0 ? formatNumber(quoteTweets) : null}</span>
            </span>
            <span className="tweet-act-count">
              <LikeIcon />
              <span>{likes > 0 ? formatNumber(likes) : null}</span>
            </span>
            <span className="tweet-act-count">
              <BookmarkIcon />
              
            </span>
            <span className="tweet-act-count">
              <ShareIcon />
              
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
