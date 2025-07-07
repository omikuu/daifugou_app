"use client";
import React, { useEffect, useRef, useState } from "react";

export default function YouTubeLooper() {
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState("");
  const [startSec, setStartSec] = useState(0);
  const [endSec, setEndSec] = useState(10);
  const [inputUrl, setInputUrl] = useState("");

  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.slice(1);
      }
      if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v");
      }
    } catch (e) {
      return "";
    }
  };

  const handleLoad = () => {
    const id = extractVideoId(inputUrl);
    if (id) setVideoId(id);
  };

  useEffect(() => {
    if (!videoId) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "360",
        width: "640",
        videoId,
        playerVars: {
          start: startSec,
          end: endSec,
        },
        events: {
          onReady: (event) => event.target.playVideo(),
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const interval = setInterval(() => {
                const current = playerRef.current.getCurrentTime();
                if (current >= endSec) {
                  playerRef.current.seekTo(startSec);
                }
              }, 500);
              playerRef.current.loopInterval = interval;
            }
            if (event.data === window.YT.PlayerState.ENDED) {
              playerRef.current.seekTo(startSec);
            }
            if (event.data === window.YT.PlayerState.PAUSED) {
              clearInterval(playerRef.current.loopInterval);
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, startSec, endSec]);

  return (
    <div style={{ padding: "16px", maxWidth: "640px", margin: "0 auto" }}>
      <h2>YouTube部分ループツール</h2>
      <div style={{ marginBottom: "8px" }}>
        <input
          type="text"
          placeholder="YouTube URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          style={{ width: "100%", marginBottom: "4px" }}
        />
        <input
          type="number"
          placeholder="開始秒"
          value={startSec}
          onChange={(e) => setStartSec(Number(e.target.value))}
          style={{ width: "49%", marginRight: "2%" }}
        />
        <input
          type="number"
          placeholder="終了秒"
          value={endSec}
          onChange={(e) => setEndSec(Number(e.target.value))}
          style={{ width: "49%" }}
        />
        <button
          onClick={handleLoad}
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          再生開始
        </button>
      </div>
      <div id="player" />
    </div>
  );
}
