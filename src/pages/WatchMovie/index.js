import React, { useEffect, useRef, useState } from 'react';
import Video from './Video';
function WatchMovie(props) {
    // const [source, setSource] = useState("https://netime.glitch.me/api/v1/cors/https://s100.imacdn.com/vg/2015/03/3613_94324.mp4?hash=2Rb97j4jaOL6zFrNP-jtGA&expire=1631383684&title=Haiyore! Nyaruko-san Tập 2 - Tạm biệt! Nyaruka-san. (480p)");
    const { source } = props;
    return (
        <div>
            <Video
                source={{
                    type: "video",
                    sources: [
                        {
                            src: source,
                        },
                    ],
                }}
            />
        </div>
    );
}

export default WatchMovie;