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

function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(1478);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [bookmark, setBookmark] = useState(0);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    takeScreenshot(tweetRef.current);
  };
  const ımageConverter = () => {
    convertImgToBase64(
      'https://pbs.twimg.com/profile_images/1333840878788628481/TrCW6pSN_400x400.jpg',
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
            <label>Book Marks</label>
            <input
              className="input"
              type="number"
              value={bookmark}
              onChange={(e) => setBookmark(e.target.value)}
            />
          </li>
          <li>
            <label>Shares</label>
            <input
              className="input"
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
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
          {/* <div className="tweet-stats">
            <span>
              <b>{retweets}</b> Retweet
            </span>
            <span>
              <b>{quoteTweets}</b> Alıntı Tweetler
            </span>
            <span>
              <b>{likes}</b> Beğeni
            </span>
          </div> */}
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
              <span>{bookmark > 0 ? formatNumber(bookmark) : null}</span>
            </span>
            <span className="tweet-act-count">
              <ShareIcon />
              <span>{shares > 0 ? formatNumber(shares) : null}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
