import React, { useRef } from "react"
import p5 from "p5";

export const Me = () => {
    const p5canvas = useRef<HTMLDivElement>(null);

    new p5((p5) => {
        let img: p5.Image;

        p5.preload = () => {
            img = p5.loadImage("https://cloud-64lrucnlg-hack-club-bot.vercel.app/0image.png");
        }

        p5.setup = () => {
            p5.createCanvas(500, 500);
            p5.background(0, 0, 0);
        };

        p5.draw = () => {
            if (p5.mouseX === 0 && p5.mouseY === 0) {
                return;
            }
            p5.image(img, p5.mouseX - img.width / 2, p5.mouseY - img.height / 2);
        };
    }, p5canvas.current as HTMLElement);

    return <div ref={p5canvas}></div>;

    // return <img src="https://cloud-64lrucnlg-hack-club-bot.vercel.app/0image.png" alt="me" draggable="false" />
}