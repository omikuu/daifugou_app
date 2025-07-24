"use client";import Image from "next/image";
import TextScrambler from "./TextScrambler";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-foreground font-bold text-2xl sm:text-3xl leading-relaxed">
          <TextScrambler text="コードを書いていると、" />
          <br />
          <TextScrambler text="食べることも忘れて" delay={0.3} />
          <br />
          <TextScrambler text="ついつい熱中してしまう。" delay={0.6} />
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <img src="/watashi.PNG" width="300" height="230" alt="watashi" />
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
