import kaplay from "kaplay";
import { format } from "path";
import iwanthue from "iwanthue";

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    width: 480,
    height: 480,
    root: document.getElementById("container") as HTMLElement,
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

k.loadShader('crt', null,
`uniform float u_flatness;
uniform float u_scanline_height;
uniform float u_screen_height;

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	vec2 center = vec2(0.5, 0.5);
	vec2 off_center = uv - center;
	off_center *= 1.0 + pow(abs(off_center.yx), vec2(u_flatness));
	vec2 uv2 = center + off_center;
	if (uv2.x > 1.0 || uv2.x < 0.0 || uv2.y > 1.0 || uv2.y < 0.0) {
		return vec4(0.0, 0.0, 0.0, 1.0);
	} else {
		vec4 c = vec4(texture2D(tex, uv2).rgb, 1.0);
		float fv = fract(uv2.y * 120.0);
		fv = min(1.0, 0.8 + 0.5 * min(fv, 1.0 - fv));
		c.rgb *= fv;
		return c;
	}
}`)

k.loadFont('shrikhand', 'fonts/Shrikhand-Regular.ttf');

let flatness = 0;
k.usePostEffect("crt", () => ({
    u_flatness: flatness,
}));

const INVERSE = -1;
const FLAT = 0;
const EXPAND = 1.25;
const CONTRACT = 0;

const caption = document.getElementById("caption") as HTMLElement;

(async () => {
    // const bg = k.add([
    //     k.rect(k.width(), k.height()),
    //     k.pos(0, 0),
    //     k.anchor("topleft"),
    //     k.color(255, 255, 255),
    // ])

    // const text = k.add([
    //     k.text("..."),
    //     k.pos(20, 20),
    //     k.anchor("topleft"),
    //     k.color(0, 0, 0),
    // ]);

    // let textbuffer = []

    // function typeEffect(newtext, newline = true, delay = 0) {
    //     const oldtext = textbuffer.join("\n") + (newline ? "\n" : "");

    //     if (textbuffer.length > 7) {
    //         textbuffer.shift();
    //     }

    //     if (newline) {
    //         textbuffer.push(newtext);
    //     } else {
    //         textbuffer[textbuffer.length - 1] += newtext;
    //     }

    //     return k.tween(
    //         0,
    //         newtext.length,
    //         newtext.length * delay,
    //         (v) => {
    //             const visibleText = newtext.slice(0, Math.floor(v));
    //             text.text = oldtext + visibleText;
    //         },
    //         k.easings.linear
    //     );
    // }

    const quarter = k.vec2(k.width() / 2, k.height() / 2);

    const rectBR = k.add([
        k.rect(quarter.x, quarter.y),
        k.pos(quarter),
        k.anchor("botright"),
        k.color(255, 255, 0),
    ]);

    const rectBL = k.add([
        k.rect(quarter.x, quarter.y),
        k.pos(quarter),
        k.anchor("botleft"),
        k.color(0, 0, 255),
    ]);

    const rectTR = k.add([
        k.rect(quarter.x, quarter.y),
        k.pos(quarter),
        k.anchor("topright"),
        k.color(255, 0, 0),
    ]);

    const rectTL = k.add([
        k.rect(quarter.x, quarter.y),
        k.pos(quarter),
        k.anchor("topleft"),
        k.color(0, 255, 0),
    ]);

    function updateColor() {
        const palette = iwanthue(4, {
            clustering: "force-vector"
        });

        rectTL.color = k.Color.fromHex(palette[0]);
        rectTR.color = k.Color.fromHex(palette[1]);
        rectBL.color = k.Color.fromHex(palette[2]);
        rectBR.color = k.Color.fromHex(palette[3]);
    }

    // updateColor();
    rectBR.color = k.Color.fromHex('#b28f3b');
    rectBL.color = k.Color.fromHex('#966fbb');
    rectTR.color = k.Color.fromHex('#62a966');
    rectTL.color = k.Color.fromHex('#c7535e')

    await k.tween(
        INVERSE,
        FLAT,
        4,
        (v) => {
            flatness = v;
        },
        k.easings.easeInOutCubic
    )

    // await k.wait(0.2);
    // await typeEffect("one sec");
    // await typeEffect(".......", false, 0.1);
    // await k.wait(0.2);

    // textbuffer = [];

    await k.tween(
        FLAT,
        EXPAND,
        4,
        (v) => {
            flatness = v;
        },
        k.easings.easeInOutCubic
    )

    const textTL = k.add([
        k.text("you're", {
            font: "shrikhand",
        }),
        k.pos(quarter.x - quarter.x * 0.5, quarter.y - quarter.y * 0.5),
        k.scale(1.5),
        k.anchor("center"),
        k.color(0, 0, 0)
    ]);

    await k.wait(0.5);

    const textTR = k.add([
        k.text("on", {
            font: "shrikhand",
        }),
        k.pos(quarter.x + quarter.x * 0.5, quarter.y - quarter.y * 0.5),
        k.scale(1.5),
        k.anchor("center"),
        k.color(0, 0, 0)
    ]);

    await k.wait(0.5);

    const textBL = k.add([
        k.text("manitej", {
            font: "shrikhand",
        }),
        k.pos(quarter.x - quarter.x * 0.5, quarter.y + quarter.y * 0.5),
        k.scale(1.5),
        k.anchor("center"),
        k.color(0, 0, 0)
    ]);

    await k.wait(0.5);

    const textBR = k.add([
        k.text(".com", {
            font: "shrikhand",
        }),
        k.pos(quarter.x + quarter.x * 0.5, quarter.y + quarter.y * 0.5),
        k.scale(1.5),
        k.anchor("center"),
        k.color(0, 0, 0)
    ]);

    k.wait(0.25).then(() => {
        k.tween(
            0,
            1,
            3,
            (v) => {
                caption.style.opacity = v.toString();
            },
            k.easings.easeOutCubic
        )
    });

    let lock = false;
    
    const clickFn = async () => {
        if (lock) return;
        lock = true;

        await k.tween(
            EXPAND,
            CONTRACT,
            0.25,
            (v) => {
                flatness = v;
            },
            k.easings.easeInSine
        )

        updateColor();

        await k.tween(
            CONTRACT,
            EXPAND,
            0.5,
            (v) => {
                flatness = v;
            },
            k.easings.easeOutSine
        )

        lock = false;
    };

    k.onClick(clickFn);
    k.onKeyPressRepeat('space', clickFn);
})();