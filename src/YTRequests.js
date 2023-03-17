const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;

const ytRequest = {
    fetchVideo: `?part=snippet&maxResults=1&key=${YT_API_KEY}&q=`
}

export default ytRequest