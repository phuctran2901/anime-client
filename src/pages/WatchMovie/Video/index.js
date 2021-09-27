import React, { useEffect, useState, useRef } from 'react';
import Hls from "hls.js";
import PlyrJS from "plyr";
import styles from 'plyr/dist/plyr.css';
import "./index.css";


function Video(props) {
    const videoSource = props.source?.sources[0].src;
    const [player, setPlayer] = useState();
    const { source } = props;
    const innerRef = useRef();
    const hls = useRef(new Hls());

    const videoOptions = PlyrJS.options = {
        ...PlyrJS.options,
        quality: {
            default: 720,
            options: [720],
        },
        controls: [
            "play-large",
            "play",
            "rewind",
            "fast-forward",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
        ],
    };

    const createVideo = () => {
        const plyrPlayer = new PlyrJS(".plyr-react", videoOptions);

        if (!videoSource.includes("m3u8")) {
            plyrPlayer.source = source;
        }

        plyrPlayer.on("ready", (event) => {
            setPlayer(plyrPlayer);
        });

    };

    hls.current.on(Hls.Events.MANIFEST_LOADED, () => {
        videoOptions.quality = {
            default: hls.current.levels[hls.current.levels.length - 1].height,
            options: hls.current.levels.map((level) => level.height),
            forced: true,
            // change hd
            onChange: (quality) => {
                hls.current.levels.forEach((level, levelIndex) => {
                    if (level.height === quality) {
                        hls.current.currentLevel = levelIndex;
                    }
                });
            },
        };

        createVideo();
    });

    useEffect(() => {
        if (!innerRef.current) return;

        if (videoSource.includes("m3u8") && Hls.isSupported()) {
            hls.current.loadSource(videoSource);
            hls.current.attachMedia(innerRef.current);

            player?.on("play", () => hls.current.startLoad());

            player?.on("qualitychange", () => {
                if (innerRef.current?.plyr?.currentTime !== 0) {
                    hls.current.startLoad();
                }
            });
        } else {
            createVideo();
        }

        return () => player?.destroy();
    }, [videoSource]);

    return (
        <div>
            <video
                ref={innerRef}
                className="plyr-react plyr"
                {...PlyrJS.rest}
                autoPlay={true}
            />
        </div>
    );
}



export default React.memo(
    Video,
    (prevProps, nextProps) => {
        return (
            prevProps.source?.sources[0].src === nextProps.source?.sources[0].src
        );
    }
);