"use client";
import React, { useEffect, useRef, useState } from "react";
import Alert from '@mui/material/Alert';

// TypeScript: declare YT on window
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
// useStateだとコンポーネントの再レンダリングが発生するので、useRefを使う方が良い？
export default function YouTubeLooper() {
  const playerRef = useRef<any>(null); // YouTube Playerの参照を保持
  const [videoId, setVideoId] = useState(""); 
  //配列の二つ目の変数は状態を更新するための関数が戻される useStateには初期値にセットしたい値を入れる
  const [startSec, setStartSec] = useState(0);
  const [endSec, setEndSec] = useState(2);
  const [inputUrl, setInputUrl] = useState("");
  const [playerKey, setPlayerKey] = useState(0); // 🔑 プレイヤー強制再生成用
  const [loopCount,setLoopCount] = useState(10); // ループ回数の設定

  const [errorMessage, setErrorMessage] = useState("");

  const extractVideoId = (url: string) => {
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
  if (!id) {
    setErrorMessage("有効なYouTube URLを入力してください。");
    return;
  }
  if (endSec <= startSec) {
    setErrorMessage("終了秒は開始秒より大きい値を入力してください。");
    return;
  }
  // time の値が不正な場合のチェック
  // if (!startSec || !endSec){
  //   setErrorMessage("開始秒と終了秒の値が取得できません");
  //   return;
  // }
  setErrorMessage(""); // 前回のエラーをクリア
  setVideoId(id);
  setPlayerKey((prev) => prev + 1);
};

const handleReload = (id: string) => {
  if (!id) {
    setErrorMessage("YouTube URLが入力されていません。");
    return;
  }
  setVideoId(id);
  setPlayerKey((prev) => prev + 1); // プレイヤーを再生成
};

  useEffect(() => { 
    console.log("useEffect called", videoId, playerKey);
    // 第二引数に何も指定しないとレンダリングの度に実行される
    // 第二引数に空の配列を指定すると、コンポーネントの初回レンダリング時にのみ実行される
    // 第二引数を指定することによって、指定した変数videoID, playerKeyが変わった時に実行される
    // フラグなど状態を入れることも可能
    if (!videoId) return;

    // 既存のプレイヤーを破棄
    if (playerRef.current) {
      playerRef.current.destroy(); // これいる？
      playerRef.current = null;
    }

    // YouTube API スクリプトを一度だけ読み込む
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      console.log("YouTube API script loaded");
    }

    // YouTube API が読み込まれた後にプレイヤーを生成
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(`player-${playerKey}`, {
        height: "360",
        width: "640",
        videoId,
        playerVars: {
          start: startSec,
          end: endSec,
        },
        events: {
          onReady: (event: { target: { playVideo: () => any; }; }) => event.target.playVideo(),
          onStateChange: (event: { data: any; }) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const interval = setInterval(() => {
                if (playerRef.current) {
                  const current = playerRef.current.getCurrentTime();
                  if (current >= endSec) {
                    playerRef.current.seekTo(startSec);
                  }
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
        playerRef.current = null;
      }
    };
  },[videoId,playerKey]);

  return (
    <div style={{ padding: "16px", maxWidth: "640px", margin: "0 auto" }}>
      <h2>YouTube部分ループツール</h2>
      <h2>https://www.youtube.com/watch?v=rm3nkawKqW8</h2>
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

        {/* 🔴 エラー表示 */}
        {errorMessage && (
          <Alert severity="error" style={{ margin: "8px 0" }}>
            {errorMessage}
          </Alert>
        )}
        
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
        <button
          onClick={() => handleReload(inputUrl)}
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
          設定し直す
          {/* 入力されたURLを引き継いで秒数を設定し直すボタン */}
        </button>
      </div>
      <div id={`player-${playerKey}`} /> 
      {/* jsvascriptが実行されてapiが読み込まれた後に、idがplayer-0のdivが生成される */}
    </div>
  );
}
