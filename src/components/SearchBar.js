import '../static/SearchBar.css';
import React, { useState, useEffect } from 'react';
import Logo from './Logo.js';

// import { authenticate, loadClient, execute } from './YouTubeDataAPIV3';
// import YouTubeVideoList from './YoutubeVideoList';

// function performSearch(q,eventType,order,publishedAfter,publishedBefore,videoDefinition,videoDuration){
//     setResponse(execute(q,eventType,order,publishedAfter,publishedBefore,videoDefinition,videoDuration));
// }



export default function SearchBar() {
    const [videoData, setVideoData] = useState(null);

    function handleSearch() {
        // () => {execute(query, eventType, order, publishedAfter, publishedBefore, videoDefinition, videoDuration, setResponse) }

        // const response = execute({query, eventType, order, publishedAfter, publishedBefore, videoDefinition, videoDuration});
        // setResponse(response);

        // useEffect(() => {
        // Simulate fetching data from an API (replace with actual API call)
        const fetchData = async () => {
            try {
                var newpublishedAfter = '';
                var newpublishedBefore = '';
                if (publishedAfter === "None") {
                    newpublishedAfter = new Date('1970-10-10');
                } else {
                    newpublishedAfter = new Date(publishedAfter);
                }

                if (publishedBefore === "None") {
                    newpublishedBefore = new Date();
                } else {
                    newpublishedBefore = new Date(publishedBefore);
                }

                const isoAfter = newpublishedAfter.toISOString();
                const isoBefore = newpublishedBefore.toISOString();
                // const url = "https://content-youtube.googleapis.com/youtube/v3/search?publishedAfter=2018-12-12T00%3A00%3A00.000Z&part=snippet&publishedBefore=2018-12-14T00%3A00%3A00.000Z&q=rajini&maxResults=5&order=title&key=AIzaSyB70-KwROYPjYYmmATAPR1SFtRdnLouirQ&videoDefinition=any"
                const url = "https://content-youtube.googleapis.com/youtube/v3/search?publishedAfter=" + isoAfter + "&part=snippet&publishedBefore=" + isoBefore + "&q=" + query + "&maxResults=5&order=" + order + "&key=AIzaSyB70-KwROYPjYYmmATAPR1SFtRdnLouirQ&videoDefinition=" + videoDefinition + "&videoDuration=" + videoDuration;

                const response = await fetch(url);
                const data = await response.json();
                setVideoData(data.items); // Assuming 'items' is the array of video data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        //   }, []);

    }
    var today = new Date();
    today = String(today);

    const [query, setQuery] = useState('');
    const [eventType, setEventType] = useState('completed');
    const [order, setOrder] = useState('date');
    const [publishedAfter, setPublishedAfter] = useState('None');
    const [publishedBefore, setPublishedBefore] = useState('None');
    const [videoDefinition, setVideoDefinition] = useState('any');
    const [videoDuration, setVideoDuration] = useState('any');

    const [response, setResponse] = useState('sad');

    return (
        <>
            <div className='search-bar'>
                <div className='search-filter'>
                    <h1><Logo /></h1>
                    {/* Forms */}
                    <input type="text" id="query" name="query" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} required />
                    <br />

                    <div className='subtitle'>~ Filter by Date Range ~</div>

                    <div className='date-container'>
                        <label htmlFor="publishedAfter">From</label>
                        <input type="date" id="publishedAfter" name="publishedAfter" value={publishedAfter} onChange={(e) => setPublishedAfter(e.target.value)}></input>
                        <span style={{ width: '20px' }}></span>
                        <label htmlFor="publishedBefore">To</label>
                        <input type="date" id="publishedBefore" name="publishedBefore" value={publishedBefore} onChange={(e) => setPublishedBefore(e.target.value)}></input>
                    </div>

                    <div className='subtitle'>~ Filter by Properties ~</div>

                    <div className='videoDefinition'>
                        <span className='radio-label'>Video Definition</span>
                        <span style={{width:'16px'}}></span>
                        <span className='radio'>
                            <input type="radio" id="any" checked={videoDefinition === "any"} name="videoDefinition" value="any" onChange={(e) => setVideoDefinition(e.target.value)} />
                            <label className='radio-label' htmlFor="any">Any</label>
                        </span>
                        <span className='radio'>
                            <input type="radio" id="standard" checked={videoDefinition === "standard"} name="videoDefinition" value="standard" onChange={(e) => setVideoDefinition(e.target.value)} />
                            <label className='radio-label' htmlFor="standard">Standard</label>
                        </span>
                        <span className='radio'>
                            <input type="radio" id="high" checked={videoDefinition === "high"} name="videoDefinition" value="high" onChange={(e) => setVideoDefinition(e.target.value)} />
                            <label className='radio-label' htmlFor="high">Very High</label>
                        </span>
                    </div>
                    <br />

                    <div className='videoDefinition'>
                    <label htmlFor="videoDuration" className='radio-label'>Video Duration</label>
                    <span style={{width:'16px'}}></span>
                    <select name="videoDuration" id="videoDuration" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)}>
                        <option value="any">Any</option>
                        <option value="long">Long (Greater than 20 mins)</option>
                        <option value="medium">Medium (4 mins - 20 mins)</option>
                        <option value="short">Short (Less than 4 mins)</option>
                    </select>
                    </div>
                    <br />
                    
                    <div className='videoDefinition'>
                    <label htmlFor="order" className='radio-label'>Order by</label>
                    <span style={{width:'69px'}}></span>
                    <select name="order" id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="relevance">Relevance</option>
                        <option value="rating">Rating</option>
                        <option value="title">Alphabetical</option>
                        <option value="viewcount">Views</option>
                        <option value="videocount">Number of Video Uploads</option>
                    </select>
                    </div>
                    <div onClick={handleSearch} className='violet-btn'>Hunt it!</div>

                    {/* <div>What Kind of Event are u looking for?</div>
            <input type="radio" id="completed" checked={eventType === "completed"} name="eventType" value="completed" onChange={(e) => setEventType(e.target.value)} />
            <label htmlFor="completed">Completed</label>
            <input type="radio" id="live" checked={eventType === "live"} name="eventType" value="live" onChange={(e) => setEventType(e.target.value)} />
            <label htmlFor="live">Live</label>
            <input type="radio" id="upcoming" checked={eventType === "upcoming"} name="eventType" value="upcoming" onChange={(e) => setEventType(e.target.value)} />
            <label htmlFor="upcoming">Upcoming</label>
            <br /> */}
                    {/* <button onClick={() => { authenticate().then(loadClient) }}>Configure</button> */}
                    <br />
                </div>
                {/* Forms */}

                {/* Videos */}
                <div className="video-list">
                    {videoData ? (
                        <div className="video-cards">
                            <h2>Results</h2>
                            {videoData.map((video) => (
                                <a href={'https://www.youtube.com/watch?v='+video.id.videoId} target="_blank">
                                <div className="video-card" key={video.etag}>
                                    <img
                                        src={video.snippet.thumbnails.medium.url}
                                        alt={video.snippet.title}
                                    />
                                    <div className="video-details">
                                        <h3>{video.snippet.title}</h3>
                                        <p>{video.snippet.description}</p>
                                        <p>Published on: {new Date(video.snippet.publishedAt).toDateString()}</p>
                                        <p>From: {video.snippet.channelTitle}</p>
                                    </div>
                                </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className='subtitle' style={{fontFamily:'Raleway',textAlign:'center'}}>Fill the details and Hit the 'Hunt It!' Tip: Try altering the filters if no results are not obtained even after searching</p>
                    )}
                </div>
                {/* Videos */}
            </div>
        </>
    );
}
